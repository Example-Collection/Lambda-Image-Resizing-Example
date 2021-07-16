import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_S3_SECRET_ACCESS_KEY,
} from ".";

interface Response {
  message: string;
}

const upload: Handler = async (event) => {
  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.Credentials({
      accessKeyId: AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    }),
  });

  console.log({ event });

  const s3 = new AWS.S3({ params: { Bucket: AWS_S3_BUCKET } });

  const response: Response = {
    message: "Hello, Lambda new!!",
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export { upload };
