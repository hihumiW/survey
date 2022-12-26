import { computed, defineComponent, unref } from "vue";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import QuestionContainer from "@survey/Render/components/QuestionContainer";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
import { useValues } from "@survey/Render/hooks/useValues";
import { NUpload, NUploadDragger, useOsTheme } from "naive-ui";
import prettyBytes from "pretty-bytes";
import mime from "mime";
import FileContainer from "@survey/components/FileContainer";
import useReadOnly from "@survey/Render/hooks/useReadOnly";
import useEditableIf from "@survey/Render/hooks/useEditableIf";

const File = defineComponent({
  props: {
    ...questionCommonProps,
    formId: {
      type: String,
    },
  },
  setup(props) {
    const osThemeRef = useOsTheme();
    const { question, values, touched, errors, formId } = props;
    const { name, maxNumber, maxSize, acceptedTypes } = question;
    const { setFieldValue } = useValues();

    const getSavedFileList = () => unref(values)[name] || [];
    const readOnly = useReadOnly(props);
    const editableIf = useEditableIf(question, values);

    const defaultFileList = getSavedFileList().map(({ name }) => ({
      id: name,
      name,
      status: "finished",
    }));

    const htmlAcceptPropertyValue = (acceptedTypes || []).join(",");
    const acceptExtTypes = (acceptedTypes || [])
      .map((contentType) => {
        return mime.getExtension(contentType);
      })
      .join(",");
    const renderMaxNumberTips = () => {
      if (!maxNumber) return null;
      const savedFileNameList = getSavedFileList();
      return (
        <p class="mt-5">
          上传文件数量: {savedFileNameList.length} / {maxNumber}
        </p>
      );
    };
    const renderFileAcceptTips = () => {
      if (!acceptExtTypes) return null;
      return <p class="mt-5">上传格式: {acceptExtTypes}</p>;
    };
    const currentFilesSize = computed(() => {
      const files = getSavedFileList();
      return files.reduce((lookup, current) => {
        return (lookup += current.size);
      }, 0);
    });
    const avaliableUploadFileSize = computed(() => {
      return maxSize - unref(currentFilesSize);
    });
    const getFormatFileSize = (bytes) => {
      return prettyBytes(bytes, { locale: "en" });
    };
    const renderFileSizeTips = () => {
      if (!maxSize) return null;
      return (
        <p class="mt-5">
          上传大小: {getFormatFileSize(unref(currentFilesSize))} /{" "}
          {getFormatFileSize(maxSize)}
        </p>
      );
    };
    const questionIndex = useQuestionIndex(question);
    const uploadDisabled = computed(() => {
      return !formId || unref(readOnly) || !unref(editableIf);
    });
    const uploadAction = computed(() => {
      return `/ctms/api/form/uploadFile/${formId}`;
    });

    const handleUploadFail = ({ file }) => {
      window.$message.error(`文件「${file.name}」上传失败`);
    };

    const handleUploadFinished = ({ file }) => {
      const { name: fileName, file: fileInstance } = file;
      const savedFileNameList = getSavedFileList();
      window.$message.success(`文件「${fileName}」上传成功`);
      setFieldValue(name, [
        ...savedFileNameList,
        {
          name: fileName,
          size: fileInstance.size,
        },
      ]);
    };

    const handleBeforeUpload = ({ file }) => {
      const uploadFileName = file.name;
      const savedFileList = getSavedFileList();
      const fileNameMsg = `文件名「${uploadFileName}」`;
      if (savedFileList.map(({ name }) => name).includes(uploadFileName)) {
        window.$message.warning(`${fileNameMsg}已经存在`);
        return Promise.reject("文件名存在");
      }
      if (acceptedTypes?.length) {
        const contentType = mime.getType(uploadFileName);
        if (!contentType || !acceptedTypes.includes(contentType)) {
          window.$message.error(`${fileNameMsg}不是支持的文件类型`);
          return Promise.reject("不是支持的文件类型");
        }
      }
      if (maxSize && file.file.size > unref(avaliableUploadFileSize)) {
        window.$message.warning(`${fileNameMsg}大小已超出最大上传大小`);
        return Promise.reject("超出最大文件大小");
      }
    };

    const handleFileRemove = ({ file }) => {
      const removeFileName = file.name;
      if (!removeFileName) return;
      const savedFileNameList = unref(values)[name] || [];
      setFieldValue(
        name,
        savedFileNameList.filter(
          ({ name: fileName }) => fileName !== removeFileName
        )
      );
    };

    const handlePreview = ({ name }) => {
      if (!formId || !name) return;
      window.open(`/ctms/api/form/download/${formId}/${name}`);
    };

    return () => {
      return (
        <QuestionContainer
          question={question}
          questionIndex={unref(questionIndex)}
          touched={touched}
          errors={errors}
        >
          <NUpload
            class="survey-upload"
            disabled={unref(uploadDisabled)}
            action={unref(uploadAction)}
            name="files"
            defaultFileList={defaultFileList}
            withCredentials
            multiple
            keepFileAfterFinish
            max={maxNumber || undefined}
            accept={htmlAcceptPropertyValue}
            onBeforeUpload={handleBeforeUpload}
            onFinish={handleUploadFinished}
            onPreview={handlePreview}
            onError={handleUploadFail}
            onRemove={handleFileRemove}
          >
            <NUploadDragger>
              <FileContainer theme={unref(osThemeRef)}>
                {renderFileAcceptTips()}
                {renderMaxNumberTips()}
                {renderFileSizeTips()}
              </FileContainer>
            </NUploadDragger>
          </NUpload>
        </QuestionContainer>
      );
    };
  },
});

export default File;
