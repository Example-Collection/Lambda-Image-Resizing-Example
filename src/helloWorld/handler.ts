import { Handler } from "aws-lambda";

interface Response {
  message: string;
}

const helloLambdaWorld: Handler = async () => {
  const response: Response = {
    message: "Hello, Lambda new!",
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export { helloLambdaWorld };
