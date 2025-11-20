export type type = "image" | "video" | "audio" | "document" | "pdf";

export interface FileData {
  id?: number;
  url: string;
  type: string;
  name: string;
  size: number;
  path: string;
  file?: File;
  isFailed?: boolean;
  isPending?: boolean;
}
