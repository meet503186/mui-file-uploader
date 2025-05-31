import CustomModal from "../CustomModal";
import { IFileUploader, IMedia } from "../../types";
import { useMemo, useState } from "react";
import RenderUploadOption from "./RenderUploadOption";
import { getFileMetaData } from "../../utils";
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
  const [files, setFiles] = useState<IMedia.FileData[]>(
    parseInputFiles(Array.isArray(_files) ? _files : [_files]) || []
  );

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
      ...Array(_files.length).fill(100),
      ...Array(filesToUpload.length),
    ]);

    setFiles(
      multiple
        ? [..._files, ...filesToUpload.map((file) => getFileMetaData(file))]
        : [getFileMetaData(filesToUpload[0])]
    );

    onUploadFile && setIsUploading(true);

    const uploadPromises = filesToUpload.map(async (file, index) => {
      if (onUploadFile) {
        try {
          const filePath = await onUploadFile(file, (progress) =>
            handleUploadProgress(
              progress,
              _files.length + index,
              filesToUpload.length
            )
          );

          return getFileMetaData(file, filePath);
        } catch (error) {
          rest.onError?.(
            error instanceof Error ? error.message : "Upload failed"
          );
          setFiles(_files);
          return null;
        }
      } else {
        return getFileMetaData(file);
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(Boolean) as IMedia.FileData[];

    setIsUploading(false);

    if (multiple) {
      onChange([..._files, ...successfulUploads]);
    } else {
      onChange(successfulUploads);
    }
  };

  const handleRemove = (index: number) => {
    const filteredFiles = _files.filter((_, indx) => indx !== index);
    onChange(filteredFiles);
    setFiles(filteredFiles);
  };

  const VISIBLE_UPLOAD_OPTIONS = useMemo(() => {
    return uploadOptions.length
      ? UPLOAD_OPTIONS.filter(({ _key }) => !!uploadOptions.includes(_key))
      : UPLOAD_OPTIONS;
  }, [uploadOptions]);

  return (
    <CustomModal
      title={"Upload File(s)"}
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

    if (file instanceof File) {
      return getFileMetaData(file);
    }

    return file;
  });
}
