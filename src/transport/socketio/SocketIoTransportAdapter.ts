import * as http from "http";
import { inject, injectable } from "inversify";
import { Server, Socket } from "socket.io";
import identifier from "../../container/identifier";
import EventHandlerInterface from "../../event/EventHandlerInterface";
import TransportInterface from "../TransportInterface";

@injectable()
export default class SocketIoTransportAdapter implements TransportInterface {
    private socketServer: Server;

    public constructor(@inject(identifier.SocketServerInstance) socketServer: Server) {
        this.socketServer = socketServer;
    }

    public subscribeOnEvents(events: EventHandlerInterface[]): Promise<any> {
        return new Promise((resolve) => {
            this.subscribe(events);
            resolve();
        });
    }

    public listen(server: http.Server): Promise<void> {
        return new Promise((resolve) => {
            this.socketServer.listen(server);
            resolve();
        });
    }

    public async close(): Promise<void> {
        return new Promise<void>((resolve) => {
            return this.socketServer.close(() => {
                resolve();
            });
        });
    }

    private subscribe(events: EventHandlerInterface[]) {
        this.socketServer.on("connection", (socket: Socket) => {
            events.forEach((handlerData) => {
                this.subscribeEventHandler(socket, handlerData);
            });
        });
    }

    private subscribeEventHandler(socket: Socket, handlerData: EventHandlerInterface) {
        const event = handlerData.event;
        const handler = handlerData.handler;
        if ("connect" === event) {
            return handler(socket.id);
        }
        if ("disconnect" === event) {
            return socket.on(event, () => {
                handler(socket.id);
            });
        }
        socket.on(event, (...args: any[]) => {
            handler(socket.id, ...args);
        });
    }
}
