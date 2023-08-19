const { execSync } = require('child_process');

const zip = (localPathUpload, nameFolderToSaveS3) => {
    execSync(`zip -r ${nameFolderToSaveS3}.zip ${localPathUpload}`)

    return;
}

module.exports = {
    zip,
}
