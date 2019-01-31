import container from "../container/inversify";
import EventHandlerInterface from "./EventHandlerInterface";
import EventMetaInterface from "./EventMetaInterface";

export default class EventHandlerResolver {

    public static resolveArray(eventHandlersData: EventMetaInterface[]): EventHandlerInterface[] {
        const map: EventHandlerInterface[] = [];
        eventHandlersData.forEach((handlerMeta) => {
            const classObject = EventHandlerResolver.resolveClass(handlerMeta);
            map.push({
                event: handlerMeta.event,
                handler: classObject[handlerMeta.method].bind(classObject)
            });
        });

        return map;
    }

    private static resolveClass(handlerMeta: EventMetaInterface): any {
        return container.isBound(handlerMeta.class)
            ? container.get(handlerMeta.class)
            : new handlerMeta.class();
    }
}
