import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from './config';

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: { 
      title: 'Hash Encryption API', 
      version: '1.0.0',
      description: 
        'An API to handle the detection, encryption and decryption of messages and files using various algorithms.',
      license: {
        name: 'Licensed under the Apache License, Version 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0',
      },
      contact: {
        name: 'Dennis Villavicencio',
        url: 'https://github.com/Dennis-Villa',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [ './src/presentation/**/routes.ts', './src/infrastructure/datasources/algorithm/algorithms.ts' ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc( options );

// Function to setup our docs
export const swaggerDocs = ( app: Express, url: string ) => {

    // Route-Handler to visit our docs
    app.use( "/api/docs", swaggerUi.serve, swaggerUi.setup( swaggerSpec ) );
    
    // Make our docs in JSON format available
    app.get("/api/docs.json", (req, res) => {

        res.setHeader("Content-Type", "application/json");
        res.send( swaggerSpec );
    });
    console.log(
        `Docs are available on ${ url }/docs`
    );
};