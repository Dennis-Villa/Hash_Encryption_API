import express from 'express';
export { Router } from 'express';

export const ExpressAdapter = {
    createServer: express,
    jsonParserMiddleware: express.json,
    urlencodedParserMiddleware: express.urlencoded,
    staticMiddleware: express.static,
};

