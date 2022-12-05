import useItemEdit from "@survey/Creator/hooks/useItemEdit";

import { computed, unref } from "vue";
const useGridEdit = (questionPathRef) => {
  const columsPath = computed(() => `${unref(questionPathRef)}.columns`);

  const { handleTitleChange: handleColumnTitleChange } = useItemEdit({
    itemsPathRef: columsPath,
    itemValueTemplate: "column",
  });

  //   const rowsPath = computed(() => `${unref(questionPathRef)}.rows`);

  //   const { handleTitleChange: handleRowTitleChange } = useItemEdit({
  //     itemsPathRef: rowsPath,
  //     itemValueTemplate: "row",
  //   });

  return {
    handleColumnTitleChange,
    // handleRowTitleChange,
  };
};

export default useGridEdit;
