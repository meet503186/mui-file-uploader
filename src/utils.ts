import { IMedia } from "./types";

export const filterFilesByMaxSize = ({
  files,
  maxSize,
}: {
  files: FileList;
  maxSize: number;
}) => {
  const filteredFiles: any = [];
  for (const file of files) {
    if (Number((file.size / (1024 * 1024)).toFixed(2)) <= maxSize) {
      filteredFiles.push(file);
    }
  }

  return filteredFiles;
};

// export const getFileType = (file: IMedia.FileData) => {
//   if (!file) return null;

//   if (file instanceof File) {
//     if (file.type.startsWith("application")) {
//       return file.type.split("/")[1];
//     }
//     return file.type.split("/")[0];
//   }

//   if (typeof file === "string") {
//     return file;
//   }

//   if (file.fileType.startsWith("application")) {
//     return file.fileType.split("/")[1];
//   }

//   return file.fileType.split("/")[0];
// };

export function getFileType(file: IMedia.FileData): string {
  const ext = file.name?.split(".").pop()?.toLowerCase();

  if (!ext) return "unknown";

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
  if (["mp4", "webm", "ogg", "mov"].includes(ext)) return "video";
  if (["mp3", "wav", "aac", "flac"].includes(ext)) return "audio";
  if (["pdf"].includes(ext)) return "pdf";
  if (["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"].includes(ext))
    return "document";

  return "unknown";
}

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
      canvas.toBlob(resolve, file.type, 0.5)
    );

    const compressedFile = new File([blob], file.name, {
      type: file.type,
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

export function getFileExtension(filePath: string): string {
  if (!filePath) return "";
  return filePath.split(".").pop() || "jpg";
}

export function getFileMetaData(file: File, filePath?: string) {
  return {
    url: URL.createObjectURL(file),
    name: file.name,
    type: file.type,
    size: file.size,
    path: filePath || file.name,
    extension: getFileExtension(file.name),
    file,
  };
}

export function checkIsMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }

  return false;
}

export function isFile(file: unknown) {
  return !!(file instanceof File);
}

export const handleA11yKeyDown =
  (callback: () => void) => (event: React.KeyboardEvent) => {
    if (!callback) return;

    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      callback();
    }
  };
