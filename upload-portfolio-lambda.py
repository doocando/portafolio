import boto3
from botocore.client import Config
import StringIO
import zipfile
import mimetypes

def lambda_handler(event, context):
    
    sns = boto3.resource('sns')
    topic= sns.Topic('arn:aws:sns:us-east-1:277172742138:DeployPortFolioTopic')
    
    try:
        s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))
        portafolio_bucket = s3.Bucket('i.emptycup.biz')
        build_bucket = s3.Bucket('i-build.emptycup.biz')
        
        portafolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj('IemptyCup-BuildPortafolio.zip', portafolio_zip)
        
        with zipfile.ZipFile(portafolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm) 
                portafolio_bucket.upload_fileobj(obj,nm,
                    ExtraArgs={'ContentType':mimetypes.guess_type(nm)[0]})
                portafolio_bucket.Object(nm).Acl().put(ACL='public-read')
        
        
        topic.publish(Subject='Portofolio Deployed', Message = 'Portfolio deployed susccessfully')
    
        print 'Job Done!'
    except:
         topic.publish(Subject='Portofolio Deploy Failed', Message = 'The Portfolio was not deployed susccessfully')
         raise 
    return 'Done!'
