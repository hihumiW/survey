import useItemEdit from "@survey/Creator/hooks/useItemEdit";

import { computed, unref } from "vue";
const useGridEdit = (questionPathRef) => {
  const columsPath = computed(() => `${unref(questionPathRef)}.columns`);

  const { handleTitleChange: handleColumnTitleChange } = useItemEdit({
    itemsPathRef: columsPath,
    itemValueTemplate: "column",
  });

  return {
    handleColumnTitleChange,
  };
};

export default useGridEdit;
