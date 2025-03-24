import { IFileUploader } from "../../types";
import UploadFromCamera from "./UploadOptions/UploadFromCamera";
import UploadFromGallery from "./UploadOptions/UploadFromGallery";

interface IProps extends IFileUploader.UploadOption {
  uploadOption: IFileUploader.uploadOptionType;
}

const RenderUploadOption = ({ uploadOption, ...rest }: IProps) => {
  switch (uploadOption) {
    case "camera":
      return <UploadFromCamera {...rest} />;

    case "gallery":
      return <UploadFromGallery {...rest} />;
  }
};

export default RenderUploadOption;
