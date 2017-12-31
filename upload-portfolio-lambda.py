import boto3
from botocore.client import Config
import StringIO
import zipfile
import mimetypes

s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))

portafolio_bucket = s3.Bucket('i.emptycup.biz')
build_bucket = s3.Bucket('i-build.emptycup.biz')

portafolio_zip = StringIO.StringIO()
build_bucket.download_fileobj('IemptyCup-BuildPortafolio.zip', portafolio_zip)

with zipfile.ZipFile(portafolio_zip) as myzip:
    for nm in myzip.namelist():
        obj = myzip.open(nm) 
        portafolio_bucket.upload_fileobj(obj,nm,
            ExtraArgs={'ContentType':mimetypes.gu(nm)[0]})
        portafolio_bucket.Object(nm).Acl().put(ACL='public-read')