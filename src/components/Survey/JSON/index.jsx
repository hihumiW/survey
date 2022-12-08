import VueJsonPretty from "vue-json-pretty";
import clipboard from "clipboardy";
import { NButton } from "naive-ui";
import { inject } from "vue";
import "vue-json-pretty/lib/styles.css";
const JSONPreview = () => {
  const { JSON } = inject("creator");
  const jsonData = JSON();
  const handleCopyClick = () => {
    clipboard.write(window.JSON.stringify(jsonData)).then(() => {
      window.$message.success("copied to clipboard successfully");
    });
  };
  return (
    <div class="flex flex-col relative">
      <NButton
        class="absolute right-2 -top-8 z-10 bg-white"
        text
        strong
        onClick={handleCopyClick}
      >
        Copy JSON
      </NButton>
      <VueJsonPretty data={jsonData} />
    </div>
  );
};

export default JSONPreview;
