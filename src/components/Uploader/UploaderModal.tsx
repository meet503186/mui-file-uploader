import CustomModal from "../CustomModal";
import { IFileUploader } from "../../types";
import { useMemo, useState } from "react";
import RenderUploadOption from "./RenderUploadOption";
import RenderImages from "./RenderImages";
import { compressImage } from "./utils";
import ScrollableTabs from "../ScrollableTabs";

interface IImageUploaderModalProps extends IFileUploader.Props {
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

const ImageUploaderModal = ({
  isOpen,
  onClose,
  extraProps,
  disabled,
  images,
  onChange,
  multiple,
  hideDoneButton,
  ...rest
}: IImageUploaderModalProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const { uploadOptions = [] } = extraProps || {};

  const onTabChange = (newTab: number) => {
    setActiveTab(newTab);
  };

  const handleChange = async (files: (string | File)[]) => {
    let tempFiles: (string | File)[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (typeof file === "string") {
        tempFiles.push(file);
      } else {
        const compressedImage = await compressImage({ file });

        tempFiles.push(compressedImage);
      }
    }

    if (multiple) {
      onChange([...images, ...tempFiles]);
    } else {
      onChange(tempFiles);
    }
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, indx) => indx !== index));
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
      onClose={onClose}
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
        !hideDoneButton
          ? [
              {
                title: "Done",
                variant: "contained",
                onClick: onClose,
                hidden: !images.length,
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
              {...rest}
            />
          }
        />
      )}

      {/* render images */}
      <RenderImages images={images} onRemove={handleRemove} />
    </CustomModal>
  );
};

export default ImageUploaderModal;
