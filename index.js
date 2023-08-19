const core = require('@actions/core');
const github = require('@actions/github');
const s3 = require('@aws-sdk/client-s3');
const { readFileSync, } = require('fs');

const { zip } = require('./src/zip');

(async () => {
    try {
        const AWS_SECRET_ACCESS_KEY_ID = core.getInput('AWS_SECRET_ACCESS_KEY');
        const AWS_ACCESS_KEY_ID = core.getInput('AWS_ACCESS_KEY_ID');
        const AWS_REGION = core.getInput('AWS_REGION');
        const AWS_BUCKET_NAME = core.getInput('AWS_BUCKET_NAME');

        const localPathUpload = core.getInput('local_path_upload');
        const bucketPathUpload = core.getInput('bucket_path_upload')
        const nameToSaveOnS3 = core.getInput('name_to_save_on_s3');
        const isDirectory = core.getInput('is_directory');

        const aclObject = core.getInput('acl')
        const storageClassObject = core.getInput('storage_class');
        const tags = core.getInput('tags');

        const needZip = core.getBooleanInput('zip');

        if (isDirectory && !needZip) {
            throw Error('Option not valid yet. When upload a folder is necessary zip it')
        }

        core.info(`connecting on AWS S3 in region '${AWS_REGION}'`)

        const s3Client = new s3.S3Client({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
            },
        })

        core.info('login with success!')

        let file;
        let key = `${bucketPathUpload}`

        if (needZip) {
            zip(localPathUpload, nameToSaveOnS3)

            file = readFileSync(`${nameToSaveOnS3}.zip`)

            key += `${nameToSaveOnS3}.zip`
        } else {
            file = readFileSync(`${localPathUpload}`)

            key += `${nameToSaveOnS3}`
        }

        const command = new s3.PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Body: file,
            Tagging: tags,
            ServerSideEncryption: 'AES256',
            Key: key,
            ACL: aclObject,
            StorageClass: storageClassObject,
            ContentType: needZip ? 'application/zip' : undefined,
        })

        await s3Client.send(command)

        const type = isDirectory ? 'file' : 'folder'

        core.info(`upload ${type} with success!`)
    } catch (error) {
        core.setFailed(error.message);
    }
})()
