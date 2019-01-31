import { format } from "logform";
import * as winston from "winston";
import { ConsoleTransportOptions } from "winston/lib/winston/transports";

export default class ConsoleLoggerHandler extends winston.transports.Console {

    constructor(options: ConsoleTransportOptions = {}) {
        options.format = format.combine(
            format.timestamp(),
            format.splat(),
            format.colorize({all: true}),
            format.printf((info) => {
                return `[${info.timestamp}] ${info.level}: ${info.message}`;
            })
        );
        super(options);
    }

}
