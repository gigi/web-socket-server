import { container } from "./bootstrap";
import identifier from "./container/identifier";
import AppServerInterface from "./server/AppServerInterface";

const appServer = container.get<AppServerInterface>(identifier.AppServer);

appServer.run().then(() => {
    process.on("SIGINT", () => appServer.shutdown().then(() => process.exit(0)));
});
