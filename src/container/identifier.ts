const identifier = {
    AppServer: Symbol.for("AppServer"),
    HttpServerInstance: Symbol.for("HttpServerInstance"),
    SocketServerInstance: Symbol.for("SocketServerInstance"),
    Transport: Symbol.for("Transport"),
    Logger: Symbol.for("Logger"),
    EventHandlersData: Symbol.for("EventHandlersData")
};

export default identifier;
