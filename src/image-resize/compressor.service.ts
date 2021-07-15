import sharp, { OutputInfo } from "sharp";

export interface CompressOptions {
  width: number;
  height: number;
}

interface ImageDataAndInfo {
  data: Buffer;
  info: OutputInfo;
}

export const compress = async (
  bits: Buffer,
  options: CompressOptions
): Promise<ImageDataAndInfo> => {
  const { data, info } = await sharp(bits)
    .resize(options.width, options.height)
    .webp()
    .toBuffer({ resolveWithObject: true });

  return {
    data,
    info,
  };
};
