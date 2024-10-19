import fileUpload from 'express-fileupload';
export { UploadedFile } from 'express-fileupload';

export class FileUploadAdapter {
    
    static createWithMaxSize( fileSize: number = 3145728 ) {

        return fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            abortOnLimit: true,
            limits: {
                fileSize,
            },
        });
    };
};

