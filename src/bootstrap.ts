import * as dotenv from "dotenv";
dotenv.config();

import container from "./container/inversify";
import "./event/events-bootstrap";

export { container };
