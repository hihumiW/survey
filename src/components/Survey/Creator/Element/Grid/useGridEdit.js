import useItemEdit from "@survey/Creator/hooks/useItemEdit";
import { useInjectCreator } from "@survey/hooks/useCreator";
import { computed, unref } from "vue";

const useGridEdit = (questionPathRef) => {
  const columsPath = computed(() => `${unref(questionPathRef)}.columns`);
  const { updateQuestionFieldValueByPath } = useInjectCreator();
  const { handleTitleChange: handleColumnTitleChange } = useItemEdit({
    itemsPathRef: columsPath,
    itemValueTemplate: "column",
  });

  const cellEditor = {
    updateCellText(cellPath, text) {
      updateQuestionFieldValueByPath(`${cellPath}.cellText`, text);
    },
  };

  return {
    handleColumnTitleChange,
    cellEditor,
  };
};

export default useGridEdit;
