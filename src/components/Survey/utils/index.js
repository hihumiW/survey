/**
 * 便利cells的行，并将便利到的行作为参数传给rowFn中
 * @param {Cells} cells 需要便利的cell
 * @param {(rowData) => void} rowFn
 * @returns
 */
export const forEachCellRows = (cells, rowFn) => {
  if (!cells) return;
  for (const rowKey in cells) {
    if (Object.hasOwnProperty.call(cells, rowKey)) {
      const rowInfo = cells[rowKey];
      if (!rowInfo) continue;
      rowFn &&
        rowFn({
          rowKey,
          rowInfo,
        });
    }
  }
};

export const forEachCell = (cells, fn) => {
  forEachCellRows(cells, ({ rowInfo }) => {
    for (const columnKey in rowInfo) {
      if (Object.hasOwnProperty.call(rowInfo, columnKey)) {
        const cell = rowInfo[columnKey];
        if (cell && fn) {
          fn(cell);
        }
      }
    }
  });
};
