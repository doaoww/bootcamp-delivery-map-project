type Method = "GET" | "POST" | "PUT" | "DELETE";

interface RequestMaker{
    request(url: string,
            body:object,
            method: Method,
            ): Promise<unknown>;
}

export class HttpRequestMaker implements RequestMaker {
    async request(url: string, body: object , method: Method,) {

        let response : Response;

        if(method !== 'GET'){
            response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        }else{
            response = await fetch(url, {
                method: method
            });
        }
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