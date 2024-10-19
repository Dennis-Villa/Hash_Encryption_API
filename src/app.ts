import { createServer } from "http";
import { envs } from "./config";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { swaggerDocs } from "./swagger";

( () => {

    main();
})();

function main() {

    const { PORT, WEB_SERVICE_URL } = envs;

    const server = new Server({
        port: PORT,
    });

    const httpServer = createServer( server.app );
    // WssService.initWss({ 
    //     server: httpServer,
    // });

    server.setRoutes( AppRoutes.routes );

    httpServer.listen( PORT, () => {

        console.log(`Server running on port ${ PORT }`);
        swaggerDocs( server.app, WEB_SERVICE_URL );
    });
};