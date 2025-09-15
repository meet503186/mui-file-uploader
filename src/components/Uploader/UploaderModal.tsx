import { useMemo, useState, useCallback } from "react";
import CustomModal from "../CustomModal";
import RenderUploadOption from "./RenderUploadOption";
import ScrollableTabs from "../ScrollableTabs";
import RenderMedia from "../RenderMedia";
import ConfirmationModal from "../ConfirmationModal";

import { IFileUploader, IMedia } from "../../types";
import { checkIsMobile, getFileMetaData, isFile } from "../../utils";

interface IUploaderModalProps extends IFileUploader.Props {
  isOpen: boolean;
  onClose: () => void;
}

const UPLOAD_OPTIONS: {
  label: string;
  _key: IFileUploader.uploadOptionType;
}[] = [
  { _key: "gallery", label: "Gallery" },
  { _key: "camera", label: "Camera" },
];

const UploaderModal = ({
  isOpen,
  onClose,
  extraProps,
  disabled,
  files: initialFiles,
  onChange,
  multiple,
  getLocalizedText,
  ...rest
}: IUploaderModalProps) => {
  const {
    onUploadFile,
    onDeleteFile,
    onSubmit,
    uploadOptions = [],
  } = extraProps || {};

  /** State */
  const [activeTab, setActiveTab] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [confirmationModalData, setConfirmationModalData] = useState<{
    id: number;
  } | null>(null);

  const [files, setFiles] = useState<IMedia.FileData[]>(
    parseInputFiles(Array.isArray(initialFiles) ? initialFiles : [initialFiles])
  );

  const [progressMap, setProgressMap] = useState<(number | undefined)[]>(
    Array(files.length).fill(100)
  );

  /** Derived values */
  const isMobile = checkIsMobile();

  const VISIBLE_UPLOAD_OPTIONS = useMemo(() => {
    if (isMobile) return [UPLOAD_OPTIONS[0]];

    return uploadOptions.length
      ? UPLOAD_OPTIONS.filter(({ _key }) => uploadOptions.includes(_key))
      : UPLOAD_OPTIONS;
  }, [uploadOptions, isMobile]);

  const isUploadDisabled = useMemo(
    () => !files.some((file) => !file.id && !file.isFailed) || isUploading,
    [files, isUploading]
  );

  /** Handlers */
  const closeModal = useCallback(() => setConfirmationModalData(null), []);

  const handleTabChange = useCallback(
    (newTab: number) => {
      if (!isUploading) setActiveTab(newTab);
    },
    [isUploading]
  );

  const handleUploadProgress = useCallback(
    (progress: number, index: number) => {
      setProgressMap((prev) => {
        const updated = [...prev];
        updated[index] = progress;
        return updated;
      });
    },
    []
  );

  const isUploadable = useCallback(
    (file: IMedia.FileData | File, index: number, retryIndices?: number[]) => {
      if (isFile(file) || file.isPending) return true;
      return retryIndices
        ? !!file.isFailed && !!file.file && retryIndices.includes(index)
        : false;
    },
    []
  );

  const handleChange = useCallback(
    async (inputFiles: (IMedia.FileData | File)[], retryIndices?: number[]) => {
      if (!retryIndices) {
        inputFiles = [...files, ...inputFiles];
      }
      const updatedFiles = multiple
        ? inputFiles.map((file, index) =>
            isUploadable(file, index, retryIndices)
              ? isFile(file)
                ? { ...getFileMetaData(file), isPending: true }
                : { ...file, ...getFileMetaData(file.file!), isPending: true }
              : (file as IMedia.FileData)
          )
        : [
            (() => {
              const fileToUpload = inputFiles.find((file, index) =>
                isUploadable(file, index, retryIndices)
              )!;
              return isFile(fileToUpload)
                ? { ...getFileMetaData(fileToUpload), isPending: true }
                : {
                    ...fileToUpload,
                    ...getFileMetaData(fileToUpload.file!),
                    isPending: true,
                  };
            })(),
          ];

      setProgressMap(
        updatedFiles.map((file, index) =>
          isUploadable(file, index, retryIndices) ? 0 : 100
        )
      );
      setFiles(updatedFiles);

      if (!onUploadFile) {
        onChange(updatedFiles);
        return;
      }

      setIsUploading(true);

      try {
        const results = await Promise.all(
          updatedFiles.map(async (file, index) => {
            if (!isUploadable(file, index, retryIndices)) return file;

            const fileToUpload = isFile(file) ? file : file.file!;

            try {
              const filePath = await onUploadFile(fileToUpload, (progress) =>
                handleUploadProgress(progress, index)
              );
              return getFileMetaData(fileToUpload, filePath);
            } catch (error) {
              rest.onError?.(
                error instanceof Error
                  ? error.message
                  : getLocalizedText?.("uploadFailed") || "Upload failed"
              );
              handleUploadProgress(100, index);
              return { ...getFileMetaData(fileToUpload), isFailed: true };
            }
          })
        );

        setFiles(results);
        onChange(results);
      } finally {
        setIsUploading(false);
      }
    },
    [
      multiple,
      onChange,
      onUploadFile,
      handleUploadProgress,
      isUploadable,
      getLocalizedText,
      rest,
    ]
  );

  const handleRetry = useCallback(
    (index: number) => {
      handleChange(files, [index]);
    },
    [files, handleChange]
  );

  const handleRemove = useCallback(
    async (index: number) => {
      const fileToRemove = files[index];
      if (onDeleteFile && fileToRemove.id) {
        setConfirmationModalData({ id: fileToRemove.id });
        return;
      }

      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onChange(updatedFiles);
    },
    [files, onDeleteFile, onChange]
  );

  const handleCancel = useCallback(() => {
    if (onUploadFile) {
      const persistedFiles = files.filter((file) => file.id);
      setFiles(persistedFiles);
      onChange(persistedFiles);
    }
    onClose();
  }, [onUploadFile, files, onChange, onClose]);

  const handleSubmit = useCallback(async () => {
    if (onSubmit) await onSubmit();
    onClose();
  }, [onSubmit, onClose]);

  /** Render */
  return (
    <CustomModal
      title={
        getLocalizedText
          ? getLocalizedText("uploadFile", {
              label: getLocalizedText(rest.label),
            })
          : `Upload ${rest.label}`
      }
      isOpen={isOpen}
      sx={{
        width: { xs: "90%", sm: 600 },
        minWidth: { xs: 200, sm: 600 },
        height: 600,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
      className="hide-scrollbar"
      buttons={[
        {
          title: getLocalizedText?.("cancel") || "Cancel",
          variant: "outlined",
          disabled: isUploading,
          onClick: handleCancel,
          sx: { mt: 2 },
        },
        {
          title: getLocalizedText?.("submit") || "Submit",
          variant: "contained",
          disabled: isUploadDisabled,
          hidden: disabled,
          onClick: handleSubmit,
          sx: { mt: 2 },
        },
      ]}
    >
      {/* Upload options */}
      {!disabled && (
        <ScrollableTabs
          groups={VISIBLE_UPLOAD_OPTIONS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          getLocalizedText={getLocalizedText}
          renderContent={
            <RenderUploadOption
              uploadOption={VISIBLE_UPLOAD_OPTIONS[activeTab]?._key}
              extraProps={extraProps}
              onChange={handleChange}
              multiple={multiple}
              disabled={isUploading}
              getLocalizedText={getLocalizedText}
              {...rest}
            />
          }
        />
      )}

      {/* Uploaded files */}
      <RenderMedia
        media={files}
        progressMap={progressMap}
        required={!rest.isOptional}
        disabled={disabled}
        onRemove={handleRemove}
        onRetry={handleRetry}
      />

      {/* Delete confirmation */}
      {confirmationModalData && (
        <ConfirmationModal
          isOpen
          onClose={closeModal}
          description={
            getLocalizedText?.("deleteConfirmation", { item: "file" }) ||
            "Are you sure you want to delete this file?"
          }
          onYes={async () => {
            if (!onDeleteFile || !confirmationModalData.id) return;

            await onDeleteFile(confirmationModalData.id);

            const updatedFiles = files.filter(
              (file) => file.id !== confirmationModalData.id
            );
            setFiles(updatedFiles);
            onChange(updatedFiles);
            closeModal();
          }}
          title={
            getLocalizedText?.("deleteItem", { item: "file" }) || "Delete File"
          }
        />
      )}
    </CustomModal>
  );
};

export default UploaderModal;

/** Utility to standardize incoming files */
function parseInputFiles(
  files: (string | File | IMedia.FileData)[]
): IMedia.FileData[] {
  return files.map((file, index) => {
    if (typeof file === "string") {
      const fileName = `filename${index + 1}.jpg`;
      return {
        name: fileName,
        path: fileName,
        size: 0,
        type: "image/jpeg",
        url: file,
      };
    }

    return isFile(file) ? getFileMetaData(file) : file;
  });
}
