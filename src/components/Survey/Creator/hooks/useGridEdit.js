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
    moveItemIndex,
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
    const columns = getModelV(columnPath());
    if (columns.length === 1) {
      return window.$message.warning(`请至少保留一列`);
    }
    const cells = getCells();
    removeItem(columnPath(removeIndex));
    syncCellColumnPathRemove(cells, item.value);
    filterCellEmptyRows(cellsPath(), cells);
    filterCellsEmpty(cellsPath(), cells);
  };

  const handleColumnMove = (index, direction) => {
    moveItemIndex(columnPath(), index, direction);
  };
  const handleColumnAdd = () => {
    const columns = getModelV(columnPath());
    const maxLengthOfColumn = 10;
    if (columns.length >= maxLengthOfColumn) {
      return window.$message.warning(`表格列最多添加${maxLengthOfColumn}项`);
    }
    addNewItem(`${columnPath()}`, "column", GridColumnGenerator);
  };

  const handleRowRemove = (columnIndex, rowValue) => {
    const rows = getModelV(rowPath());
    if (rows.length === 1) {
      return window.$message.warning(`请至少保留一行`);
    }
    removeItem(rowPath(columnIndex));
    const cells = getCells();
    syncCellRowPathRemove(cells, rowValue);
    filterCellsEmpty(cellsPath(), cells);
  };

  const handleRowMove = (index, direction) => {
    moveItemIndex(rowPath(), index, direction);
  };

  const handleRowAdd = () => {
    const rows = getModelV(rowPath());
    const maxLengthOfRows = 15;
    if (rows.length >= maxLengthOfRows) {
      return window.$message.warning(`表格列最多添加${maxLengthOfRows}项`);
    }
    addNewItem(
      `${rowPath()}`,
      "row",
      (value) => value,
      (value) => value
    );
  };
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
    handleColumnMove,
    handleRowMove,
    cellEditor,
  };
};

export default useGridEdit;
