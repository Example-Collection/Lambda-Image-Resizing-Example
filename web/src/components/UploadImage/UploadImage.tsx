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
import axios from "axios";
import { IMAGE_UPLOAD_URL } from "variables";

const UploadImage = (): JSX.Element => {
  const [image, setImage] = useState<File | null>(null);
  const imageRef =
    useRef<HTMLImageElement>() as MutableRefObject<HTMLImageElement>;
  const [url, setUrl] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const byteToKB = (byte: number): string => {
    return (byte / 1024.0).toFixed(2);
  };

  const getImageSrc = (): string => {
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

  const uploadImage = async (): Promise<void> => {
    if (!image) {
      alert("Select an image to upload.");
      return;
    }
    let formData = new FormData();
    formData.append("file", image as Blob);
    try {
      const response = await axios.post(IMAGE_UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUrl(response.data.url);
    } catch (error) {
      alert(error);
    }

    try {
      const response = await axios.head(IMAGE_UPLOAD_URL);
      console.log({ response });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Title>Image Uploader</Title>
      <Divider />
      <Space />
      <ImageContainer
        ref={imageRef}
        src={image ? getImageSrc() : imgQuestion}
      />
      <Space />
      <ButtonContainer>
        <label>
          <SelectButton>
            Select
            <Input onChange={onImageSelect} />
          </SelectButton>
        </label>
        <UploadButton onClick={uploadImage}>Upload</UploadButton>
      </ButtonContainer>
      <Space />
      <div>Before Uploading..</div>
      <Table>
        <Tr>
          <Td flex={1}>Name</Td>
          <Td flex={2}>Size</Td>
        </Tr>
        <Tr>
          <Td flex={1}>{image ? image.name : "Not selected."}</Td>
          <Td flex={2}>
            {image ? byteToKB(image.size) + "KB" : "Not selected."}
          </Td>
        </Tr>
      </Table>
      <Space />
      <div>After Uploading!</div>
      <Table>
        <Tr>
          <Td flex={1}>URL</Td>
        </Tr>
        <Tr>
          <Td flex={1}>{url ? url : "Not uploaded"}</Td>
        </Tr>
        <Tr>
          <Td flex={1}>Size</Td>
        </Tr>
        <Tr>
          <Td flex={1}>Not uploaded.</Td>
        </Tr>
      </Table>
      <Space />
    </Container>
  );
};

export default UploadImage;
