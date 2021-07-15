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
  Title,
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
    </Container>
  );
};

export default UploadImage;
