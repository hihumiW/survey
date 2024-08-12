import { NButton, NIcon } from "naive-ui";
import { ImageOutline } from "@vicons/ionicons5";
const ImageUpload = () => {
  return (
    <NButton quaternary disabled>
      {{
        icon: () => (
          <NIcon>
            <ImageOutline />
          </NIcon>
        ),
        default: () => "点击上传",
      }}
    </NButton>
  );
};
export default ImageUpload;
