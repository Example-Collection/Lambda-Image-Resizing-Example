import React, { MutableRefObject, useRef } from "react";
import { useState } from "react";
import {
  ButtonContainer,
  Container,
  Divider,
  ImageContainer,
  Input,
  SelectButton,
  Space,
  Table,
  Td,
  Title,
  Tr,
  UploadButton,
} from "./styles";
import imgQuestion from "./assets/question.png";

const UploadImage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const imageRef =
    useRef<HTMLImageElement>() as MutableRefObject<HTMLImageElement>;

  const parseFileName = (rawUrl: string): string => {
    const splitted = rawUrl.split("/");
    return splitted[splitted.length - 1];
  };

  const byteToKB = (byte: number): string => {
    return (byte / 1024.0).toFixed(2);
  };

  const getImageAsString = (): string => {
    let imageString = "";
    let reader = new FileReader();
    reader.onload = (event) => {
      if (imageRef.current && event.target) {
        imageString = event.target.result as string;
      }
    };
    reader.readAsDataURL(image!!);
    return imageString;
  };

  const onImageSelect = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.files !== null) {
      const file = event.currentTarget.files[0];
      console.log(file.name);
      setImage(file);
      let reader = new FileReader();
      reader.onload = (event) => {
        if (imageRef.current && event.target) {
          imageRef.current.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Title>Image Uploader</Title>
      <Divider />
      <Space />
      <ImageContainer
        ref={imageRef}
        src={image ? getImageAsString() : imgQuestion}
      />
      <Space />
      <ButtonContainer>
        <label>
          <SelectButton>
            Select
            <Input onChange={onImageSelect} />
          </SelectButton>
        </label>
        <UploadButton>Upload</UploadButton>
      </ButtonContainer>
      <Space />
      <div>Before Uploading..</div>
      <Table>
        <Tr>
          <Td flex={1}>Name</Td>
          <Td flex={2}>Size</Td>
        </Tr>
        <Tr>
          <Td flex={1}>{image ? image.name : ""}</Td>
          <Td flex={2}>{image ? byteToKB(image.size) + "KB" : ""}</Td>
        </Tr>
      </Table>
    </Container>
  );
};

export default UploadImage;
