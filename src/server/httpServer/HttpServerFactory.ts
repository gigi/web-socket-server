import * as http from "http";
import { injectable } from "inversify";
import FactoryInterface from "../../core/FactoryInterface";

@injectable()
export default class HttpServerFactory implements FactoryInterface<http.Server> {
    public create(): http.Server {
        return new http.Server();
    }
}
