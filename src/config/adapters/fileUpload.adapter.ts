import fileUpload from 'express-fileupload';
export { UploadedFile } from 'express-fileupload';

export class FileUploadAdapter {
    
    static createWithMaxSize( fileSize: number = 3 * 1024 * 1024 ) {

        return fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            limits: {
                fileSize,
            },
        });
    };
};

