export default interface AppServerInterface {
    run(): Promise<void>;
    shutdown(): Promise<void>;
}
