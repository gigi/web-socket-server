export default interface WinstonTransportConfigInterface {
    handler: string;
    options: Array<{[option: string]: any}>;
}
