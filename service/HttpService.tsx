interface RequestMaker{
    request(url: string,body:object): Promise<unknown>;
}

export class HttpRequestMaker implements RequestMaker {
    async request(url: string, body: object) {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        let data;
        try {
            data = await response.json();
        } catch {
            throw new Error("Что-то пошло не так");
        }
        if (!response.ok) {
            throw new Error(data?.error || "Что-то пошло не так");
        }
        return data;
    }
}