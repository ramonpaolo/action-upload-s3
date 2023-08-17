const core = require('@actions/core');
const github = require('@actions/github');
const s3 = require('@aws-sdk/client-s3');
const { execSync } = require('child_process');
const { readFileSync, statSync } = require('fs');

(async () => {
    try {
        const AWS_SECRET_ACCESS_KEY_ID = core.getInput('AWS_SECRET_ACCESS_KEY');
        const AWS_ACCESS_KEY_ID = core.getInput('AWS_ACCESS_KEY_ID');
        const AWS_REGION = core.getInput('AWS_REGION');
        const AWS_BUCKET_NAME = core.getInput('AWS_BUCKET_NAME');
    
        const localPathUpload = core.getInput('local_path_upload');
        const bucketPathUpload = core.getInput('bucket_path_upload')
    
        core.info(`connecting on AWS S3 in region '${AWS_REGION}'`)
    
        const s3Client = new s3.S3Client({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
            },
        })
    
        const stat = statSync(`${localPathUpload}`)
    
        const isDirectory = stat.isDirectory()
    
        execSync(`tar -czvf ${localPathUpload}.zip ${localPathUpload}`)
    
        const file = readFileSync(`./${localPathUpload}.zip`)
    
        const splitPath = localPathUpload.split('/')
        const name = splitPath.length === 0 ? localPathUpload : splitPath.pop()

        const bucketEndsWithSlash = bucketPathUpload.endsWith('/')
    
        const command = new s3.PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Body: file,
            Tagging: `Source=github-actions`,
            ServerSideEncryption: 'AES256',
            Key: bucketEndsWithSlash ? `${bucketEndsWithSlash}${name}` : `${bucketPathUpload}/${name}`,
            ACL: 'public-read',
            StorageClass: 'STANDARD',
        })
    
        await s3Client.send(command)
    
        const type = isDirectory ? 'file' : 'folder'
    
        core.info(`upload ${type} with success`)
    } catch (error) {
        core.setFailed(error.message);
    }
})()
