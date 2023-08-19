# Upload S3

This action upload file or folder to a bucket on AWS S3.

# IAM

To create IAM to access this action, we recommended that you create the IAM user with this 3 access:

- s3:PutObject
- s3:PutObjectTagging
- s3:PutObjectAcl

Reference: [Link](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/PutObjectCommand/)

## Inputs

### `AWS_BUCKET_NAME`

**Required** The name of the person to greet.

### `AWS_REGION`

**Optional** The region of bucket. Default `"us-east-1"`.

### `AWS_SECRET_ACCESS_KEY`

**Required** The secret access key to authenticate on AWS.

### `AWS_ACCESS_KEY_ID`

**Required** The access key id to authenticate on AWS.

### `AWS_SECRET_ACCESS_KEY`

**Required** The secret access key to authenticate on AWS.

### `local_path_upload`

**Required** The local path to get the file or folder.

### `bucket_path_upload`

**Optional** The bucket path to upload the file or folder on AWS S3. Default: `"/"`

### `is_directory`

**Optional** Is a folder to upload on s3. Default: `false`

### `zip`

**Optional** Need to be ziped before send to S3. Default: `true`

### `name_to_save_on_s3`

**Required** The name of file or folder to save in S3.

## Outputs

Nothing

## Example usage

```yaml
    - name: Upload File to AWS S3
      uses: ramonpaolo/action-upload-s3@v0.0.13
      with:
        AWS_BUCKET_NAME: ${{ secrets.AWS_BUCKET_NAME }}
        AWS_REGION: us-east-1
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        local_path_upload: ./main.py # example local file to upload
        bucket_path_upload: / # path to upload bucket on aws s3
        is_directory: false # is directory to read and upload
        zip: true # want to zip file/folder before send to S3
        name_to_save_on_s3: "main.py.zip" # the name of key/object to store in S3
```
