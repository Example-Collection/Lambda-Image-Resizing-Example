import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import * as parser from "lambda-multipart-parser";
import { AWS_S3_BUCKET } from ".";
import { compress } from "./compressor.service";

interface Response {
  url: string;
}

interface RequestInfo {
  file: parser.MultipartFile;
  width?: number;
  height?: number;
}

const parseRequest = async (
  event: APIGatewayProxyEvent
): Promise<RequestInfo> => {
  const parameters = event.queryStringParameters;
  const width = parameters?.["width"];
  const height = parameters?.["height"];
  const parsedFile = await parser.parse(event);
  const file = parsedFile.files[0];
  return {
    file: file,
    width: width ? Number(width) : undefined,
    height: height ? Number(height) : undefined,
  };
};

const uploadToS3 = async (req: RequestInfo): Promise<Response> => {
  AWS.config.update({
    region: "ap-northeast-2",
  });

  const s3 = new AWS.S3({ params: { Bucket: AWS_S3_BUCKET } });

  const compressedFile = await compress(req.file.content, {
    width: req.width,
    height: req.height,
  });

  const putObjectRequest: PutObjectRequest = {
    Key: req.file.filename,
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
  const requestInfo = await parseRequest(event);
  const response = await uploadToS3(requestInfo);
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
