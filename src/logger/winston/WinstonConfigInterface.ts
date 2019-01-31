import { LoggerOptions } from "winston";
import WinstonTransportConfigInterface from "./WinstonTransportConfigInterface";

export default interface WinstonConfigInterface {
    silent: boolean;
    level: string;
    options: LoggerOptions;
    transports: WinstonTransportConfigInterface[];
}
