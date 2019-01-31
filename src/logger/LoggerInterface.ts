export default interface LoggerInterface {
    error(message: string, ...meta: any[]): void;
    warning(message: string, ...meta: any[]): void;
    notice(message: string, ...meta: any[]): void;
    info(message: string, ...meta: any[]): void;
    debug(message: string, ...meta: any[]): void;
}
