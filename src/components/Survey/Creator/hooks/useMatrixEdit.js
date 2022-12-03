import { useInjectCreator } from "@survey/hooks/useCreator";
import { unref } from "vue";
const useMatrixEdit = (questionPathRef) => {
  const { updateQuestionFieldValueByPath } = useInjectCreator();

  if (!updateQuestionFieldValueByPath) return {};

  const handleTitleChange = (type = "columns", index, text) => {
    const path = `${unref(questionPathRef)}.${type}.${index}.text`;
    updateQuestionFieldValueByPath(path, text);
  };

  return {
    handleTitleChange,
  };
};

export default useMatrixEdit;
