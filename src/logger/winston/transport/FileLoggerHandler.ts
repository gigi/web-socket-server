import { format } from "logform";
import * as winston from "winston";
import { FileTransportOptions } from "winston/lib/winston/transports";

export default class FileLoggerHandler extends winston.transports.File {

    constructor(options: FileTransportOptions = {}) {
        options.format = format.combine(
            format.timestamp(),
            format.splat(),
            format.printf((info) => {
                return `[${info.timestamp}] ${info.level}: ${info.message}`;
            })
        );
        super(options);
    }

}
