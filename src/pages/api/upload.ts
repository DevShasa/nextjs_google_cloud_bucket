import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingMessage } from "http";
import formidable from "../../lib/formidable-serverless";
import * as gcs from "../../lib/gcs";
import { PassThrough } from "stream";

const uploadStream = (file: formidable.File) => {
    const pass = new PassThrough();

    const stream = gcs.createWriteStream(
        file.originalFilename ?? file.newFilename,
        file.mimetype ?? undefined
    );
    pass.pipe(stream);

    return pass;
};

export default async function handler(req:NextApiRequest | IncomingMessage, res:NextApiResponse | Response){
    if(req.method !== "POST"){
        // @ts-ignore
        res.status(400).send(`Invalid method ${req.method}`)
        return
    }
    // @ts-ignore
    const form = formidable({ fileWriteStreamHandler: uploadStream });

        form.parse(req, (err)=>{
            if(err){
                console.log("COULD NOT UPLOAD", err)
                // @ts-ignore
                res.status(500).json(err); 
                return 
            }else{
                // @ts-ignore
                res.status(200).json("File upload complete")
            }
        });
}

export const config = {
    api: {
        bodyParser: false,
    },
};