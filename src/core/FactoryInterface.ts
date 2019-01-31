export default interface FactoryInterface<T> {
    create(...args: any[]): T;
}
