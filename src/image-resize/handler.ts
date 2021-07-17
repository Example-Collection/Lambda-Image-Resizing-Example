import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import * as parser from "lambda-multipart-parser";
import { parse } from "yargs";
import {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_S3_SECRET_ACCESS_KEY,
} from ".";

interface Response {
  message: string;
}

const parseFile = async (
  event: APIGatewayProxyEvent
): Promise<parser.MultipartFile> => {
  const parsedFile = await parser.parse(event);
  const file = parsedFile.files[0];
  return file;
};

const uploadToS3 = async (file: parser.MultipartFile): Promise<void> => {
  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.Credentials({
      accessKeyId: AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    }),
  });

  const s3 = new AWS.S3({ params: { Bucket: AWS_S3_BUCKET } });
  const request = s3.putObject({ Bucket: AWS_S3_BUCKET });
};

const upload: Handler = async (event: APIGatewayProxyEvent) => {
  const file = await parseFile(event);

  const response: Response = {
    message: "Hello, Lambda new!!",
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export { upload };
