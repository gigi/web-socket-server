import { inject, injectable } from "inversify";
import identifier from "../../container/identifier";
import LoggerInterface from "../../logger/LoggerInterface";
import { transformMethod, transformParameter, transportEvent } from "../decorators";
import MessageType from "../type/MessageType";

@injectable()
export default class SystemEventProvider {
    private logger: LoggerInterface;

    public constructor(@inject(identifier.Logger) logger: LoggerInterface) {
        this.logger = logger;
    }

    @transportEvent()
    private connect(id: string) {
        this.logger.debug("Client %s connected!", id);
    }

    @transportEvent()
    private disconnect(id: string) {
        this.logger.debug("Client %s disconnected!", id);
    }

    @transportEvent("systemMessage")
    @transformMethod
    private systemMessage(id: string, @transformParameter(MessageType) message: MessageType) {
        this.logger.debug("Server received message System: %s (%s)!", id, message.id);
    }
}
