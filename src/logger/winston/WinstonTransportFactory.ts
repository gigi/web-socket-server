import * as util from "util";
import { ConsoleTransportOptions, FileTransportOptions, StreamTransportInstance } from "winston/lib/winston/transports";
import ConsoleLoggerHandler from "./transport/ConsoleLoggerHandler";
import FileLoggerHandler from "./transport/FileLoggerHandler";
import WinstonTransportConfigInterface from "./WinstonTransportConfigInterface";

export default class WinstonTransportFactory {
    public static create(transport: WinstonTransportConfigInterface): StreamTransportInstance {
        switch (transport.handler) {
            case "console":
                return new ConsoleLoggerHandler(transport.options as ConsoleTransportOptions);
            case "file":
                return new FileLoggerHandler(transport.options as FileTransportOptions);
            default:
                throw new Error(util.format("Logger transport %s not found!", transport.handler));
        }
    }
}
