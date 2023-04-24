import { Storage } from "@google-cloud/storage"
export const storage = new Storage({
    keyFilename: "GCPKEY.json"
});

export const bucket = storage.bucket("wolan")

export const createWriteStream = (filename:string, contentType?:string) =>{
    const ref = bucket.file(filename)

    const stream = ref.createWriteStream({
        gzip: true,
        contentType: contentType
    })

    return stream
}