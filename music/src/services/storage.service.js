import { S3Client, PutObjectCommand , GetObjectCommand} from '@aws-sdk/client-s3'
import config from '../config/config.js';
import { v4 as uuid } from 'uuid';
import {S3RequestPresigner,getSignedUrl} from '@aws-sdk/s3-request-presigner'

const S3 = new S3Client({
    region: config.AWS_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    }
})


export async function uploadFile(file) {
    const key = `${uudiv4()}-${file.originalname}`

    const command = new PutObjectCommand({
        Bucket: 'spotify-piper',
        Body: file.buffer,
        Key: key,
    })

    const response = await S3.send(command)

    return key
}


export async function getPresignedUrl(key) {
    const command = new GetObjectCommand({
        Bucket: 'spotify-piper',
        Key: key,
    })

    const url = await getSignedUrl(S3,command,{
        expiresIn: 60 * 60,
    })

    return url
}