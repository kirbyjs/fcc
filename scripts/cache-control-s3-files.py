
import boto3
import datetime

s3 = boto3.resource('s3')
my_bucket = s3.Bucket('fcc.kirbyjs.com')

for obj in my_bucket.objects.all():
    Object = obj.Object()

    if (Object.key.endswith('index.html')):
        Object.copy_from(
            CopySource={
                'Bucket': 'kirbyjs.com',
                'Key': Object.key,
            },
            ContentType='text/html',
            CacheControl='no-store',
            MetadataDirective='REPLACE'
        )
