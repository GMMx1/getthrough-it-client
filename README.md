## Deployment

If you haven't configure your aws credentials:

```bash
$ yarn global add aws-cli
$ aws configure set preview.cloudfront true
$ aws configure

AWS Access Key ID [None]: <Access Key>
AWS Secret Access Key [None]: <Secret Access Key>
Default region name [None]: us-east-1
Default output format [None]: json
```

Then:
```bash
$ yarn deploy
```