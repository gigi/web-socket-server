import * as http from "http";
import EventHandlerInterface from "../event/EventHandlerInterface";

export default interface TransportInterface {
    listen(httpServer: http.Server): Promise<void>;
    subscribeOnEvents(eventsHandlers: EventHandlerInterface[]): Promise<void>;
    close(): Promise<void>;
}
