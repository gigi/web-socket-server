# Web Socket Server skeleton
Production-ready server skeleton based on Socket.io as socket transport and built-in node http server. Powered by TypeScript 

### Installation
```
git clone https://github.com/gigi/web-socket-server
cd web-socket-server
npm i
```
### Start
To build and run app enter
```
npm start
```
### Tests
```
npm run test
```
with coverage
```
npm run cover
```

## Technology stack
- **Http server**  
Built-in Node http server (can be replaced with [express](http://expressjs.com/) or any other server based on [Node Http](https://nodejs.org/api/http.html))

- **Dependency injection**  
[Inversify](http://inversify.io/) - great DI container

- **Config**  
[inversify-config-injection](https://github.com/cvrabie/inversify-config-injection#readme) based on [Node-config](https://github.com/lorenwest/node-config)  
[dotenv](https://github.com/motdotla/dotenv#readme)

- **Socket transport**  
[socket.io](https://socket.io/)

- **Tests**  
[Mocha](https://mochajs.org/)   
[Chai](http://www.chaijs.com/)  
[Nyc](https://github.com/istanbuljs/nyc) for coverage (run `npm run cover`)

- **Logger**   
[Winston](https://github.com/winstonjs/winston) with additional wrappers

Decorators used to bind handlers to socket events. See [DemoEventProvider](src/event/demo/DemoEventProvider.ts) and [SystemEventProvider](src/event/system/SystemEventProvider.ts)

Components are separated by interfaces, so important implementations can be easily replaced and injected with the Inversify. See [src/container/inversify.ts](src/container/inversify.ts)

## Conventions
See https://github.com/unional/typescript-guidelines
