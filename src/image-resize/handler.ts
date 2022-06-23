import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import * as parser from "lambda-multipart-parser";
import { AWS_ACCESS_KEY_ID, AWS_S3_BUCKET, AWS_SECRET_ACCESS_KEY } from ".";
import { compress } from "./compressor.service";

interface Response {
  url: string;
}

const parseFile = async (
  event: APIGatewayProxyEvent
): Promise<parser.MultipartFile> => {
  const parsedFile = await parser.parse(event);
  const file = parsedFile.files[0];
  return file;
};

const uploadToS3 = async (
  beforeFile: parser.MultipartFile
): Promise<Response> => {
  AWS.config.update({
    region: "ap-northeast-2",
    account: {
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    },
  });

  const s3 = new AWS.S3({ params: { Bucket: AWS_S3_BUCKET } });

  const compressedFile = await compress(beforeFile.content);

  const putObjectRequest: PutObjectRequest = {
    Key: beforeFile.filename,
    Bucket: AWS_S3_BUCKET,
    Body: compressedFile.data,
  };

  const result = await s3.upload(putObjectRequest).promise();

  const response: Response = {
    url: result.Location,
  };

  return response;
};

const upload: Handler = async (event: APIGatewayProxyEvent) => {
  const file = await parseFile(event);
  const response = await uploadToS3(file);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "HEAD,OPTIONS,POST,GET",
    },
  };
};

export { upload };
