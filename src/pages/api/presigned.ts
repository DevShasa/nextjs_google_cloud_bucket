import { storage, bucket } from "@/lib/gcs";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== "GET"){
        res.status(400).send(`invalid method ${req.method}`)
    }

    const {filename} = req.query

    const file =  bucket.file(filename as string)

    return file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      }).then(signedUrls => {
        return res.status(200).json(signedUrls)
      });
    

}