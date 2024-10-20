import express from 'express';
export { Router, Request, Response, NextFunction, RequestHandler, Express } from 'express';


export const ExpressAdapter = {
    createServer: express,
    jsonParserMiddleware: express.json,
    urlencodedParserMiddleware: express.urlencoded,
    staticMiddleware: express.static,
};

