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

When file or folder is ziped, automatically the key saved in S3, will have `.zip` how the extension.

### `name_to_save_on_s3`

**Required** The name of file or folder to save in S3.

### `acl`

**Optional** The type of ACL to save the object. Default: `"public-read"`

### `storage_class`

**Optional** The type of Storage Class to save the object. Default: `"STANDARD"`

### `tags`

**Optional** The tags to put on object. Default: `"Source=github-actions&Environment=production"`

## Outputs

Nothing

## Example usage

### Basic Usage

```yaml
    - name: Upload File to AWS S3
      uses: ramonpaolo/action-upload-s3@main
      with:
        AWS_BUCKET_NAME: ${{ secrets.AWS_BUCKET_NAME }}
        AWS_REGION: us-east-1
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}

        # path of local file to upload
        local_path_upload: ./main.py

        # path to upload bucket on aws s3
        bucket_path_upload: /
        
        # the name of key/object to store in S3
        name_to_save_on_s3: "main.py"
```

### Complete Usage

```yaml
  strategy:
    matrix:
      env: ["staging", "production"]

  env:
    ENVIRONMENT: ${{ matrix.env }}

  steps:
    - name: Upload File to AWS S3
      uses: ramonpaolo/action-upload-s3@main
      with:
        AWS_BUCKET_NAME: ${{ secrets.AWS_BUCKET_NAME }}
        AWS_REGION: us-east-1
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}

        # path of local file to upload
        local_path_upload: ./main.py

        # path to upload bucket on aws s3
        bucket_path_upload: /
        
        # is directory to read and upload
        is_directory: false
        
        # want to zip file/folder before send to S3
        zip: true
        
        # the name of key/object to store in S3
        name_to_save_on_s3: "main.py"
        
        # the ACL to allow access
        acl: "public-read"
        
        # the storage class to save the object
        storage_class: "STANDARD"
                                                
        # tags to put on object
        tags: "Source=github-actions&Environment=${{ env.ENVIRONMENT }}"
```
