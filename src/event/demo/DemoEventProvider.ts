import { inject, injectable } from "inversify";
import identifier from "../../container/identifier";
import LoggerInterface from "../../logger/LoggerInterface";
import { transportEvent } from "../decorators";

@injectable()
export default class DemoEventProvider {
    private logger: LoggerInterface;

    public constructor(@inject(identifier.Logger) logger: LoggerInterface) {
        this.logger = logger;
    }

    @transportEvent("testMessage")
    private testMessage(id: string, message: string) {
        this.logger.debug("Server received message testMessage: %s from %s!", message, id);
    }

    @transportEvent("testMessage")
    private testMessage2(id: string, message: string) {
        this.logger.debug("Server received message testMessage2: %s from %s!", message, id);
    }

    @transportEvent("connect")
    private testConnect(message: string) {
        this.logger.debug("Connect from demo provider: %s!", message);
    }
}
