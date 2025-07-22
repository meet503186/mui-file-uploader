// index.ts (or barrel file)

export { default as MuiFileUploader } from "./components/Uploader";

// Media Renderers
export {
  default as MuiAudio,
  AudioPlaceholder as MuiAudioPlaceholder,
} from "./components/RenderMedia/Audio";
export { default as MuiImage } from "./components/RenderMedia/Image";
export { default as MuiVideo } from "./components/RenderMedia/Video";
export {
  default as MuiPdf,
  PdfPlaceholder as MuiPdfPlaceholder,
} from "./components/RenderMedia/Pdf";
export {
  default as MuiDocument,
  DocumentPlaceholder as MuiDocumentPlaceholder,
} from "./components/RenderMedia/Document";
export { default as MuiPreviewModal } from "./components/RenderMedia/PreviewModal";

// Types
export * from "./types";
