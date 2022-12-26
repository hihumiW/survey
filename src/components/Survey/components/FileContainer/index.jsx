import { NIcon } from "naive-ui";
import { Archive } from "@vicons/ionicons5";
import "./index.css";

const FileContainer = (props, { slots }) => {
  return (
    <div class="flex flex-col gap-x-5 text-sm items-center ">
      <NIcon size="48" depth={props.theme === "light" ? 5 : 7} class="mb-5">
        <Archive />
      </NIcon>
      <p>点击或者拖动文件到该区域来上传</p>
      {slots.default && slots.default()}
    </div>
  );
};

FileContainer.props = {
  theme: String,
};

export default FileContainer;
