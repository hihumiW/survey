import { unref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";
import { GridColumnGenerator } from "@survey/hooks/useCreator/questionDefaultConfig";
const useGridEdit = (gridPathRef) => {
  const {
    updateQuestionFieldValueByPath,
    updateItemValue,
    addNewItem,
    removeItem,
    syncCellColumnPathChange,
    syncCellColumnPathRemove,
  } = useInjectCreator();
  if (!updateQuestionFieldValueByPath || !unref(gridPathRef)) return {};

  const p = () => unref(gridPathRef);
  const cellPath = () => `${p()}.cells`;
  const columnPath = (index = -1) =>
    index === -1 ? `${p()}.columns` : `${p()}.columns.${index}`;

  const handleColumnTitleChange = (index, text) => {
    const path = `${columnPath(index)}.text`;
    updateQuestionFieldValueByPath(path, text);
  };

  const handleColumnValueChange = (columnIndex, newValue) => {
    updateItemValue(
      columnPath(),
      columnIndex,
      newValue,
      (prevValue, nowValue) => {
        syncCellColumnPathChange(cellPath(), prevValue, nowValue);
      }
    );
  };

  const handleColumnRemove = (removeIndex, item) => {
    removeItem(columnPath(removeIndex));
    syncCellColumnPathRemove(cellPath(), item.value);
  };
  const handleColumnAdd = () =>
    addNewItem(`${p()}.columns`, "column", GridColumnGenerator);

  const handleRowRemove = () => {};

  const handleRowAdd = () => {};

  return {
    handleColumnTitleChange,
    handleColumnValueChange,
    handleColumnRemove,
    handleColumnAdd,
    handleRowRemove,
    handleRowAdd,
  };
};

export default useGridEdit;
