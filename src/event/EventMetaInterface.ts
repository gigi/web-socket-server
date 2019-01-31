export default interface EventMetaInterface {
    event: string;
    class: new () => any;
    method: string;
}
