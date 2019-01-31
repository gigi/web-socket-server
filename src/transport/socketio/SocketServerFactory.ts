import { injectable } from "inversify";
import * as SocketIO from "socket.io";
import { Server } from "socket.io";
import FactoryInterface from "../../core/FactoryInterface";

@injectable()
export default class SocketServerFactory implements FactoryInterface<Server> {
    public create(): Server {
        return SocketIO({
            path: "/socket",
            serveClient: false
        });
    }
}
