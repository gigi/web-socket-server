export default interface EventHandlerInterface {
    event: string;
    handler: (senderId: string, ...args: any[]) => void;
}
