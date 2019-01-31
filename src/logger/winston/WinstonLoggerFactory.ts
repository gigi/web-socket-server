import { inject, injectable } from "inversify";
import * as winston from "winston";
import { Logger } from "winston";
import FactoryInterface from "../../core/FactoryInterface";
import WinstonConfigInterface from "./WinstonConfigInterface";
import WinstonTransportFactory from "./WinstonTransportFactory";

@injectable()
export default class WinstonLoggerFactory implements FactoryInterface<Logger> {

    private config: WinstonConfigInterface;

    public constructor(@inject("config.logger") config: WinstonConfigInterface) {
        this.config = config;
    }

    public create(): Logger {
        const logger = winston.createLogger(this.config.options);
        this.config.transports.forEach((transport) => {
            logger.add(WinstonTransportFactory.create(transport));
        });
        return logger;
    }

}
