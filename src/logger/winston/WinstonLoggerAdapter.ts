import * as winston from "winston";
import { Logger } from "winston";
import LoggerInterface from "../LoggerInterface";

export default class WinstonLoggerAdapter implements LoggerInterface {

    private logger: winston.Logger;

    public constructor(logger: Logger) {
        this.logger = logger;
    }

    public error(message: string, ...meta: any[]): void {
        this.logger.error(message, ...meta);
    }

    public warning(message: string, ...meta: any[]): void {
        this.logger.warning(message, ...meta);
    }

    public notice(message: string, ...meta: any[]): void {
        this.logger.notice(message, ...meta);
    }

    public info(message: string, ...meta: any[]): void {
        this.logger.info(message, ...meta);
    }

    public debug(message: string, ...meta: any[]): void {
        this.logger.debug(message, ...meta);
    }

}
