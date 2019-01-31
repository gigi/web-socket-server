import { plainToClass } from "class-transformer";
import EventMetadataKey from "./EventMetadataKey";
import EventMetaInterface from "./EventMetaInterface";

export function transportEvent(eventName?: string): (target: object, propertyKey: string, value: any) => void {
    return (target: any, key: string) => {
        const meta: EventMetaInterface[] = Reflect.getMetadata(EventMetadataKey.transportEvent, Reflect) || [];
        meta.push({
            event: eventName || key,
            class: target.constructor,
            method: key
        });
        Reflect.defineMetadata(EventMetadataKey.transportEvent, meta, Reflect);
    };
}

export function transformParameter(type: object): (target: object, propertyKey: string, index: number) => void {
    return (target: any, propertyKey: string, index: any) => {
        if (!target.__transformation) {
            target.__transformation = {};
        }
        target.__transformation[propertyKey] = {};
        target.__transformation[propertyKey][index] = type;
    };
}

export function transformMethod(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]) {
        const transformations = this.__transformation[propertyName];
        if (!transformations) {
            return;
        }
        for (let i = 0; i <= args.length; i++) {
            if ("undefined" !== typeof (transformations[i])) {
                args[i] = plainToClass(transformations[i], args[i]);
            }
        }
        method.apply(this, args);
    };
}
