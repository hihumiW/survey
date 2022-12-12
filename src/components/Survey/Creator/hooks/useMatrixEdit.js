import useItemEdit from "@survey/Creator/hooks/useItemEdit";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";

import { computed, unref } from "vue";
const useMatrixEdit = (questionPathRef) => {
  const columsPath = computed(() => `${unref(questionPathRef)}.columns`);

  const { handleTitleChange: handleColumnTitleChange } = useItemEdit({
    itemsPathRef: columsPath,
    itemValueTemplate: "column",
  });

  const rowsPath = computed(() => `${unref(questionPathRef)}.rows`);

  const { handleTitleChange: handleRowTitleChange } = useItemEdit({
    itemsPathRef: rowsPath,
    itemValueTemplate: "row",
  });

  return {
    handleColumnTitleChange,
    handleRowTitleChange,
  };
};

export default useMatrixEdit;

export const getMatrixColumnType = (matrixType) => {
  switch (matrixType) {
    case QuestionTypeEnum.matrixcheckbox:
    case QuestionTypeEnum.matrixradio:
      return QuestionTypeEnum.matrixSelectColumn;
    case QuestionTypeEnum.matrixdropdown:
      return QuestionTypeEnum.matrixDropdownColumn;
    case QuestionTypeEnum.matrixinput:
      return QuestionTypeEnum.matrixInputColumn;
  }
};
