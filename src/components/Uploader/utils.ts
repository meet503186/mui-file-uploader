export const filterFilesByMaxSize = ({
  files,
  maxSize,
}: {
  files: FileList;
  maxSize: number;
}) => {
  let filteredFiles: any = [];
  for (let file of files) {
    if (Number((file.size / (1024 * 1024)).toFixed(2)) <= maxSize) {
      filteredFiles.push(file);
    }
  }

  return filteredFiles;
};

export const getFileType = (file: File) => {
  if (!file) return null;

  return file.type.split("/")[0];
};

export const getFileUrl = (file: File | string) => {
  if (typeof file === "string") {
    return file;
  }

  return URL.createObjectURL(file);
};

export async function compressImage({
  file,
  ratio,
  maxImageSize,
}: {
  file: File;
  ratio?: number;
  maxImageSize?: number;
}) {
  try {
    maxImageSize = maxImageSize || 1024 * 1024;
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement("canvas");
    ratio = ratio || 1;
    canvas.width = (imageBitmap.width * ratio) / 2;
    canvas.height = (imageBitmap.height * ratio) / 2;

    const ctx = canvas.getContext("2d");

    if (!ctx) return file;

    ctx.scale(ratio, ratio);

    ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);

    // Turn into Blob
    const blob: any = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.5)
    );

    const compressedFile = new File([blob], "fileName.jpg", {
      type: "image/jpeg",
    });

    if (compressedFile.size > maxImageSize) {
      return compressImage({ file: compressedFile, ratio, maxImageSize });
    }

    return compressedFile;
  } catch (error) {
    console.log(error);
    return file;
  }
}
