import * as http from "http";
import {Container} from "inversify";
import { EagerBinder } from "inversify-config-injection";
import "reflect-metadata";
import { Server } from "socket.io";
import { Logger } from "winston";
import FactoryInterface from "../core/FactoryInterface";
import DemoEventProvider from "../event/demo/DemoEventProvider";
import EventMetadataKey from "../event/EventMetadataKey";
import EventMetaInterface from "../event/EventMetaInterface";
import SystemEventProvider from "../event/system/SystemEventProvider";
import LoggerInterface from "../logger/LoggerInterface";
import WinstonLoggerAdapter from "../logger/winston/WinstonLoggerAdapter";
import WinstonLoggerFactory from "../logger/winston/WinstonLoggerFactory";
import AppServer from "../server/AppServer";
import AppServerInterface from "../server/AppServerInterface";
import HttpServerFactory from "../server/httpServer/HttpServerFactory";
import SocketIoTransportAdapter from "../transport/socketio/SocketIoTransportAdapter";
import SocketServerFactory from "../transport/socketio/SocketServerFactory";
import TransportInterface from "../transport/TransportInterface";
import identifier from "./identifier";

const container = new Container();

container.load(new EagerBinder({prefix: "config", objects: true, log: true}).getModule());
container.bind<EventMetaInterface[]>(identifier.EventHandlersData).toDynamicValue(() => {
    return Reflect.getMetadata(EventMetadataKey.transportEvent, Reflect) || [];
});
container.bind<FactoryInterface<http.Server>>(HttpServerFactory).toSelf();
container.bind<http.Server>(identifier.HttpServerInstance).toDynamicValue(
    (context) => context.container.get<FactoryInterface<http.Server>>(HttpServerFactory).create()
).inSingletonScope();
container.bind<FactoryInterface<Server>>(SocketServerFactory).toSelf();
container.bind<Server>(identifier.SocketServerInstance).toDynamicValue(
    (context) => context.container.get<FactoryInterface<Server>>(SocketServerFactory).create()
).inSingletonScope();
container.bind<TransportInterface>(identifier.Transport).to(SocketIoTransportAdapter);
container.bind<AppServerInterface>(identifier.AppServer).to(AppServer).inSingletonScope();
container.bind<FactoryInterface<Logger>>(WinstonLoggerFactory).toSelf();
container.bind<LoggerInterface>(identifier.Logger).toDynamicValue((context) => {
    const winston = context.container.get<FactoryInterface<Logger>>(WinstonLoggerFactory).create();
    return new WinstonLoggerAdapter(winston);
}).inSingletonScope();
container.bind(SystemEventProvider).toSelf().inSingletonScope();
container.bind(DemoEventProvider).toSelf().inSingletonScope();

export default container;
