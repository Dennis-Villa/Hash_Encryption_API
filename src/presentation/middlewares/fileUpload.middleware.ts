import { Request, Response, NextFunction } from '../../config';

export class FileUploadMiddleware {

    static async containFiles( request: Request, response: Response, next: NextFunction ) {

        const { files } = request;
        if( !files || Object.keys( files ).length === 0 ) {

            return response.status( 400 ).json({ error: 'No files were selected' });
        };

        if( Array.isArray( files.file ) ) {

            return response.status( 400 ).json({ error: 'Only one file can be selected' });
        };

        request.body.file = files.file;

        next();
    };
};