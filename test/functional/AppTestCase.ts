import * as chai from "chai";
import "mocha";
import "reflect-metadata";
import { Server } from "socket.io";
import * as util from "util";
import { container } from "../../src/bootstrap";
import identifier from "../../src/container/identifier";
import AppConfigInterface from "../../src/server/AppConfigInterface";
import AppServerInterface from "../../src/server/AppServerInterface";

export default abstract class AppTestCase {

    public readonly scheme = "http";

    public readonly socketServer: Server;
    protected readonly appConfig: AppConfigInterface;
    protected readonly baseUrl: string;
    protected app: AppServerInterface;

    public constructor() {
        chai.should();
        this.appConfig = container.get<AppConfigInterface>("config.app");
        this.baseUrl = util.format("%s://%s:%s", this.scheme, this.appConfig.hostname, this.appConfig.port);
        this.socketServer = container.get<Server>(identifier.SocketServerInstance);
    }

    public async before() {
        container.snapshot();
        this.app = container.get<AppServerInterface>(identifier.AppServer);
        return this.app.run();
    }

    public after(): Promise<void> {
        return this.app.shutdown().then(() => {
            container.restore();
        });
    }
}
