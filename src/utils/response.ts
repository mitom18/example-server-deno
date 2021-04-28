import { Drash } from "../../deps.ts";

export default class Response extends Drash.Http.Response {
    public generateResponse(): any {
        const contentType = this.headers.get("Content-Type");

        if (
            contentType === "application/json" &&
            this.status_code >= 400 &&
            typeof this.body === "string"
        ) {
            this.body = { message: this.body };
        }

        return super.generateResponse();
    }
}
