import { NUpload } from "naive-ui";
import { defineComponent, computed, unref } from "vue";

const getDownloadUrl = (formId, fileName) => {
  return `${import.meta.env.VITE_DOWNLOAD_URL}/${formId}/${fileName}`;
};

const ImageUpload = defineComponent({
  props: ["formId", "value", "disabled"],
  emits: ["valueChange"],
  setup(props, { emit }) {
    const { formId, value, disabled } = props;
    const defaultFileList = value
      ? [
          {
            id: value,
            name: value,
            status: "finished",
            url: getDownloadUrl(formId, value),
          },
        ]
      : [];

    const uploadAction = computed(() => {
      return `${import.meta.env.VITE_UPLOAD_URL}/${formId}`;
    });

    const handleUploadFinished = ({ file }) => {
      const { name: originalName } = file;
      window.$message.success(`上传成功`);
      emit("valueChange", originalName);
    };
    const handleUploadFail = ({ file }) => {
      window.$message.error(`文件「${file.name}」上传失败`);
    };
    const handleFileRemove = ({ file }) => {
      const removeFileName = file.name;
      if (!removeFileName) return;
      emit("valueChange", undefined);
    };

    const Authorization = localStorage.getItem("gcp-portal-token");
    const headers = {
      Authorization,
    };
    return () => (
      <NUpload
        name="files"
        accept="image/*"
        headers={headers}
        withCredentials
        keepFileAfterFinish
        disabled={disabled || !formId}
        defaultFileList={defaultFileList}
        action={unref(uploadAction)}
        onFinish={handleUploadFinished}
        onError={handleUploadFail}
        onRemove={handleFileRemove}
        list-type="image-card"
        max={1}
      ></NUpload>
    );
  },
});
export default ImageUpload;
