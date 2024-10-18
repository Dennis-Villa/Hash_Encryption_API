import archiver from 'archiver';
import fs from 'fs';
import { CustomError } from '../../domain';
import { Response } from './express.adapter';

export class ZipAdapter {
    
    static async zipFiles( filesPaths: string[], filesNames: string[], zipName: string ) {

        const output = fs.createWriteStream( zipName );
        const archive = archiver("zip", {
            zlib: { level: 9 }, // Sets the compression level.
        });

        archive.on("warning", function (err) {
            
            console.log( err );
        });
        archive.on("error", function ( error ) {

            throw CustomError.internalServer( error.message );
        });

        archive.pipe(output);
        for ( let i = 0; i < filesPaths.length; i++ ) {
            
            
            archive.append(fs.createReadStream( filesPaths.at( i )! ), { name: filesNames.at( i )! });            
        };

        await archive.finalize();
    };

    static async responseZip( files: string[], fileNames: string[], outputFileName: string, response: Response ) {

        const archive = archiver("zip", {
            zlib: { level: 9 }, 
        });

        archive.on("warning", function (err) {
            
            console.log( err );
        });
        archive.on("error", function ( error ) {

            throw CustomError.internalServer( error.message );
        });

        response.attachment( outputFileName );
        archive.pipe(response);

        for ( let i = 0; i < files.length; i++ ) {
            
            
            archive.append( files.at( i )! , { name: fileNames.at( i )! });            
        };

        await archive.finalize();
    };
};

