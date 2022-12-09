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
    syncCellRowPathRemove,
    getModelV,
    filterCellEmptyRows,
    filterCellsEmpty,
  } = useInjectCreator();
  if (!updateQuestionFieldValueByPath || !unref(gridPathRef)) return {};

  const p = () => unref(gridPathRef);
  const cellsPath = () => `${p()}.cells`;
  const getCells = () => getModelV(cellsPath());
  const columnPath = (index = -1) =>
    index === -1 ? `${p()}.columns` : `${p()}.columns.${index}`;
  const rowPath = (index = -1) =>
    index === -1 ? `${p()}.gridRows` : `${p()}.gridRows.${index}`;

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
        syncCellColumnPathChange(getCells(), prevValue, nowValue);
      }
    );
  };

  const handleColumnRemove = (removeIndex, item) => {
    const cells = getCells();
    removeItem(columnPath(removeIndex));
    syncCellColumnPathRemove(cells, item.value);
    filterCellEmptyRows(cellsPath(), cells);
    filterCellsEmpty(cellsPath(), cells);
  };
  const handleColumnAdd = () =>
    addNewItem(`${columnPath()}`, "column", GridColumnGenerator);

  const handleRowRemove = (columnIndex, rowValue) => {
    removeItem(rowPath(columnIndex));
    const cells = getCells();
    syncCellRowPathRemove(cells, rowValue);
    filterCellsEmpty(cellsPath(), cells);
  };

  const handleRowAdd = () =>
    addNewItem(
      `${rowPath()}`,
      "row",
      (value) => value,
      (value) => value
    );

  const cellEditor = {
    updateCellText(cellPath, text) {
      updateQuestionFieldValueByPath(`${cellPath}.cellText`, text);
    },
  };

  return {
    handleColumnTitleChange,
    handleColumnValueChange,
    handleColumnRemove,
    handleColumnAdd,
    handleRowRemove,
    handleRowAdd,
    cellEditor,
  };
};

export default useGridEdit;
