import axios from "axios";

/**
 * 获取图片base64
 * @param img
 * @returns
 */
export async function getImageBase64(img: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as string));
    reader.readAsDataURL(img);
  });
}

/**
 * 获取图片宽高
 * @param img 图片
 * @returns
 */
export async function getImageSize(
  img: File
): Promise<{
  width: number;
  height: number;
}> {
  return getImageBase64(img).then((base64URL) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.setAttribute("src", base64URL);
      image.addEventListener("load", () => {
        resolve({ width: image.width, height: image.height });
      });
      image.addEventListener("error", () => {
        reject(new Error("图片加载失败"));
      });
    });
  });
}

export interface Uploaded {
  uri: string;
  md5: string;
}

// 上传文件
export const upload = (params: {
  // { file: Blob }
  formData: FormData;
  width: number;
  height: number;
}) => {
  const { formData, width, height } = params;

  return axios({
    method: "post",
    url: `/financial-api/common/file/upload/${width}/${height}`,
    data: formData,
  }).then((res) => res.data);
};
