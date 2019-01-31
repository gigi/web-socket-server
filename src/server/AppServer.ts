import * as http from "http";
import { inject, injectable } from "inversify";
import identifier from "../container/identifier";
import EventHandlerResolver from "../event/EventHandlerResolver";
import EventMetaInterface from "../event/EventMetaInterface";
import LoggerInterface from "../logger/LoggerInterface";
import TransportInterface from "../transport/TransportInterface";
import AppConfigInterface from "./AppConfigInterface";
import AppServerInterface from "./AppServerInterface";

@injectable()
export default class AppServer implements AppServerInterface {
    private readonly httpServer: http.Server;
    private readonly transport: TransportInterface;
    private readonly appConfig: AppConfigInterface;
    private readonly eventHandlersMeta: EventMetaInterface[];
    private readonly logger: LoggerInterface;

    public constructor(
        @inject("config.app") appConfig: AppConfigInterface,
        @inject(identifier.HttpServerInstance) httpServer: http.Server,
        @inject(identifier.Transport) transport: TransportInterface,
        @inject(identifier.EventHandlersData) eventHandlersMeta: EventMetaInterface[],
        @inject(identifier.Logger) logger: LoggerInterface
    ) {
        this.appConfig = appConfig;
        this.transport = transport;
        this.httpServer = httpServer;
        this.eventHandlersMeta = eventHandlersMeta;
        this.logger = logger;
    }

    public run(): Promise<void> {
        return new Promise((resolve) => {
            this.httpServer.listen(this.appConfig.port, this.appConfig.hostname, () => {
                this.bindTransportEvents().then(resolve);
            });
        });
    }

    public shutdown(): Promise<void> {
        return this.transport.close().then(() => {
            return this.closeHttpServer();
        });
    }

    private closeHttpServer(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.httpServer.close(() => {
                this.logger.info("Shutdown... Bye bye...");
                resolve();
            });
        });
    }

    private bindTransportEvents(): Promise<void> {
        const eventsHandlers = EventHandlerResolver.resolveArray(this.eventHandlersMeta);
        return this.transport.subscribeOnEvents(eventsHandlers).then(() => {
            return this.transport.listen(this.httpServer);
        }).then(() => {
            this.logger.info(
                "App running on port: %s, hostname: %s!",
                this.appConfig.port,
                this.appConfig.hostname
            );
        });
    }
}
