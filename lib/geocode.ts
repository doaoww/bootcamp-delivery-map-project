type Place = {
    lat: string;
    lon: string;
    address?: Record<string, string>;
};

type Coordinates = {
    latitude: number;
    longitude: number;
};

interface GeocodeBuilder{
    resolve(address: string): Promise<Coordinates | null>;
}

export class GeocodeBuilderV1 implements GeocodeBuilder{
    private queue = Promise.resolve();
    private nextRequest = 0;
    private blockedUntil = 0;
    private cache = new Map<string, { expires: number; results: Place[] }>();


    async resolve(address: string) {
        const text = address.split(",").map(part => part.trim()).filter(part =>
            !["алматы", "казахстан", "қазақстан", "almaty", "kazakhstan"].includes(part.toLowerCase())
        ).join(" ").trim();
        const last = text.match(/^(.+?)\s+(\d+[\p{L}\d/-]*)$/u);
        const first = text.match(/^(\d+[\p{L}\d/-]*)\s+(.+)$/u);
        const street = last?.[1] || first?.[2] || text;
        const house = (last?.[2] || first?.[1] || "").toLowerCase();
        if (!this.streetName(street)) return null;
        const language = /[a-z]/i.test(street) ? "en" : /[әғқңөұүі]/i.test(street) ? "kk" : "ru";
        const queries = house ? [`${street} ${house}`, street] : [street];
        let approximate: { latitude: number; longitude: number } | null = null;

        for (let i = 0; i < queries.length && i < 3; i++) {
            let fullStreet = "";
            for (const result of await this.search(queries[i], language)) {
                const details = result.address;
                const road = details?.road || details?.pedestrian || "";
                const city = (details?.city || details?.town || details?.municipality || "").toLowerCase();
                if (details?.country_code !== "kz" || !["алматы", "алма-ата", "almaty", "алматы қаласы"].includes(city)) continue;
                if (!road || !this.sameStreet(street, road)) continue;
                if (!result.lat?.trim() || !result.lon?.trim()) continue;
                const latitude = Number(result.lat), longitude = Number(result.lon);
                if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) continue;
                if (house && details.house_number?.toLowerCase() === house) return { latitude, longitude };
                if (!approximate) approximate = { latitude, longitude };
                if (!fullStreet) fullStreet = road;
            }
            if (i === 1 && house && fullStreet && fullStreet.toLowerCase() !== street.toLowerCase()) {
                queries.push(`${fullStreet} ${house}`);
            }
        }
        return approximate;
    }

    streetName(text: string) {
        return text.toLowerCase().replace(/[.,]/g, " ").split(/\s+/)
            .filter(word => !["улица", "ул", "проспект", "пр-т", "переулок", "пер", "көшесі", "көше", "даңғылы", "даңғыл", "street", "st", "avenue", "ave", "lane"].includes(word))
            .join(" ").trim();
    }

    sameStreet(a: string, b: string) {
        const types = [/проспект|пр-т|даңғыл|avenue|\bave\b/, /улица|ул\.|көшесі|street|\bst\b/, /переулок|пер\.|\blane\b/];
        const first = types.findIndex(type => type.test(a.toLowerCase()));
        const second = types.findIndex(type => type.test(b.toLowerCase()));
        return this.streetName(a) === this.streetName(b) && (first < 0 || second < 0 || first === second);
    }

    async search(address: string, language: string) {
        const params = new URLSearchParams({
            q: `${address}, Алматы, Казахстан`, format: "json", limit: "10",
            countrycodes: "kz", addressdetails: "1", "accept-language": language,
        });
        const endpoint = process.env.NOMINATIM_URL || "https://nominatim.openstreetmap.org/search";
        const url = `${endpoint}?${params}`;
        const job = this.queue.then(async () => {
            const saved = this.cache.get(url);
            if (saved && saved.expires > Date.now()) return saved.results;
            if (this.blockedUntil > Date.now()) throw new Error("Поиск временно недоступен. Попробуй позже");
            const wait = this.nextRequest - Date.now();
            if (wait > 0) await new Promise(resolve => setTimeout(resolve, wait));
            this.nextRequest = Date.now() + 1100;

            const response = await fetch(url, {
                headers: { "User-Agent": "DeliveryPlannerEducational/1.0 (contact: dilaravahitova215@gmail.com)" },
                cache: "no-store",
                signal: AbortSignal.timeout(15000),
            });
            if (!response.ok) {
                if (response.status === 429 || response.status === 403) {
                    const retry = response.headers.get("Retry-After") || "60";
                    const delay = /^\d+$/.test(retry) ? Number(retry) * 1000 : Date.parse(retry) - Date.now();
                    this.blockedUntil = Date.now() + Math.max(60000, Number.isFinite(delay) ? delay : 60000);
                }
                throw new Error("Не удалось получить адрес. Попробуй позже");
            }
            const results: Place[] = await response.json();
            if (!Array.isArray(results)) throw new Error("Не удалось прочитать ответ");
            if (this.cache.size >= 200) {
                const oldest = this.cache.keys().next().value;
                if (oldest) this.cache.delete(oldest);
            }
            this.cache.set(url, { results, expires: Date.now() + 3600000 });
            return results;
        });
        this.queue = job.then(() => {}, () => {});
        return job;
    }

}

