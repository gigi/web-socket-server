import "mocha";
import { suite, test } from "mocha-typescript";
import * as io from "socket.io-client";
import AppTestCase from "../AppTestCase";

@suite
class SocketTest extends AppTestCase {

    @test("client should connect and receive message from server")
    public testEmptyTokenConnect(done: () => void) {
        const client = this.connect();
        client.on("testMessage", (v: string) => {
            v.should.be.equal("Message to client!");
            client.emit("testMessage", "Message to server!");
            client.emit("systemMessage", {
                id: "id-of-message",
                text: "text-of-message",
                nonExistent: "false-value"
            });
            client.disconnect();
            setTimeout(() => {
                done();
            }, 100);
        });
        client.on("connect", () => {
            this.socketServer.emit("testMessage", "Message to client!");
        });
    }

    protected connect() {
        return io.connect(this.baseUrl, {
            transports: ["websocket"],
            reconnectionAttempts: 3,
            timeout: 6000,
            forceNew: false,
            path: "/socket"
        });
    }
}
