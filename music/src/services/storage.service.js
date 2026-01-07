import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import config from '../config/config.js';
import {v4 as uuid} from 'uuid';

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