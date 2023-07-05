from s3_modules.authentication import get_s3_client


def delete_video_from_s3(video_uuid):
    try:
        # input 버킷의 원본 동영상 삭제
        s3 = get_s3_client()
        bucket_name = 'dancify-input'
        s3_response = s3.list_objects_v2(Bucket=bucket_name)

        for obj in s3_response['Contents']:
            if video_uuid in obj['Key']:
                s3.delete_object(Bucket=bucket_name, Key=obj['Key'])

        # output 버킷의 스트리밍 파일 삭제
        bucket_name = 'dancify-output'
        s3_response = s3.list_objects_v2(Bucket=bucket_name)

        for obj in s3_response['Contents']:
            if video_uuid in obj['Key']:
                s3.delete_object(Bucket=bucket_name, Key=obj['Key'])

    except Exception as e:
        print(f's3파일(동영상) 삭제 실패: {e}')
