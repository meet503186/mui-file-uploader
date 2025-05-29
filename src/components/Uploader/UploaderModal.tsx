import CustomModal from "../CustomModal";
import { IFileUploader, IMedia } from "../../types";
import { useMemo, useState } from "react";
import RenderUploadOption from "./RenderUploadOption";
import { compressImage } from "../../utils";
import ScrollableTabs from "../ScrollableTabs";
import RenderMedia from "../RenderMedia";

interface IUploaderModalProps extends IFileUploader.Props {
  isOpen: boolean;
  onClose: () => void;
}

const UPLOAD_OPTIONS: {
  label: string;
  _key: IFileUploader.uploadOptionType;
}[] = [
  {
    _key: "gallery",
    label: "Gallery",
  },
  {
    _key: "camera",
    label: "Camera",
  },
];

const UploaderModal = ({
  isOpen,
  onClose,
  extraProps,
  disabled,
  files: _files,
  onChange,
  multiple,
  hideDoneButton,
  onUploadFile,
  onDeleteFile,
  ...rest
}: IUploaderModalProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [progressMap, setProgressMap] = useState<number[]>([
    ...Array(_files.length).fill(100),
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<IMedia.FileData[]>(_files || []);

  const { uploadOptions = [] } = extraProps || {};

  const onTabChange = (newTab: number) => {
    !isUploading && setActiveTab(newTab);
  };

  const handleUploadProgress = (progress: number, index: number, _: number) => {
    setProgressMap((_state) => {
      _state[index] = progress;
      return [..._state];
    });
  };

  const handleChange = async (files: (IMedia.FileData | File)[]) => {
    const filesToUpload = files.filter(
      (file): file is File => file instanceof File
    );

    setProgressMap([
      ...Array(filesToUpload.length),
      ...Array(_files.length).fill(100),
    ]);

    setFiles([
      ...filesToUpload.map((file) => ({
        fileUrl: URL.createObjectURL(file),
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        filePath: file.name,
      })),
      ..._files,
    ]);

    onUploadFile && setIsUploading(true);

    const uploadPromises = filesToUpload.map(async (file, index) => {
      const compressedImage = await compressImage({ file });

      if (onUploadFile) {
        try {
          const filePath = await onUploadFile(compressedImage, (progress) =>
            handleUploadProgress(progress, index, filesToUpload.length)
          );

          return {
            fileUrl: URL.createObjectURL(file),
            fileName: compressedImage.name,
            fileType: compressedImage.type,
            fileSize: compressedImage.size,
            filePath,
          };
        } catch (error) {
          rest.onError?.(
            error instanceof Error ? error.message : "Upload failed"
          );
          return null;
        }
      } else {
        return compressedImage;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(Boolean) as IMedia.FileData[];

    setIsUploading(false);

    if (multiple) {
      console.log(successfulUploads);

      onChange([..._files, ...successfulUploads]);
    } else {
      onChange(successfulUploads);
    }
  };

  const handleRemove = (index: number) => {
    onChange(files.filter((_, indx) => indx !== index));
  };

  const VISIBLE_UPLOAD_OPTIONS = useMemo(() => {
    return uploadOptions.length
      ? UPLOAD_OPTIONS.filter(({ _key }) => !!uploadOptions.includes(_key))
      : UPLOAD_OPTIONS;
  }, [uploadOptions]);

  return (
    <CustomModal
      title={"Upload Image(s)"}
      isOpen={isOpen}
      onClose={!isUploading ? onClose : () => {}}
      sx={{
        width: {
          xs: "90%",
          sm: 600,
        },
        minWidth: {
          xs: 200,
          sm: 600,
        },
        height: 600,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
      className="hide-scrollbar"
      buttons={
        !hideDoneButton && !isUploading
          ? [
              {
                title: "Done",
                variant: "contained",
                onClick: onClose,
                hidden: !files.length,
                sx: { mt: 2 },
              },
            ]
          : []
      }
    >
      {/* Upload options (tabs) */}
      {!disabled && (
        <ScrollableTabs
          groups={VISIBLE_UPLOAD_OPTIONS}
          activeTab={activeTab}
          onTabChange={onTabChange}
          tabsProps={{
            scrollButtons: false,
          }}
          renderContent={
            <RenderUploadOption
              uploadOption={VISIBLE_UPLOAD_OPTIONS[activeTab]?._key}
              extraProps={extraProps}
              onChange={handleChange}
              multiple={multiple}
              disabled={isUploading}
              {...rest}
            />
          }
        />
      )}

      {/* render files */}
      <RenderMedia
        media={files}
        onRemove={handleRemove}
        progressMap={progressMap}
      />
    </CustomModal>
  );
};

export default UploaderModal;
