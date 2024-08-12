import { defineComponent, unref, computed } from "vue";
import Table from "@survey/components/Table";
import { forEachCell } from "@survey/utils";
import { gridCellTypeEnum } from "@survey/types/questionTypeEnum";
import { mergeWith } from "lodash-es";

import { getOtherTextValueFieldName } from "@survey/Render/Element/Select";

import Checkbox from "../Checkbox";
import Blanks from "../Blanks";
import Text from "../Text";
import Dropdown from "../Dropdown";

const getDownloadUrl = (formId, fileName) => {
  return `${import.meta.env.VITE_DOWNLOAD_URL}/${formId}/${fileName}`;
};

const Grid = defineComponent({
  props: ["data", "values", "value", "formId"],
  setup(props) {
    const { data, values, value, formId } = props;

    const { columns, gridRows, cells, hideTableHeader } = data;

    const renderColumnHeader = ({ column }) => {
      return <span>{column.originalColumn.text}</span>;
    };

    const renderColumnCell = ({ column, rowData }) => {
      const { key: rowName } = rowData;
      const { id: columnName, originalColumn } = column;
      const cellInfo = cells?.[rowName]?.[columnName] || {};
      const cellConfig = mergeWith(
        { ...originalColumn },
        { ...cellInfo },
        (objectV, sourceV) => {
          return sourceV || objectV;
        }
      );
      const { cellAlias } = cellConfig;
      const cellValue = cellAlias
        ? values?.[cellAlias]
        : value?.[rowName]?.[columnName];
      const cellType = cellConfig.cellType;
      let align = "left";
      let content = null;
      switch (cellType) {
        case gridCellTypeEnum.input:
          content = <Text value={cellValue} inputType={cellConfig.inputType} />;
          break;
        case gridCellTypeEnum.dropdown:
          content = (
            <Dropdown
              choices={cellConfig.choices}
              value={cellValue}
              showOtherItem={cellConfig.showOtherItem}
              otherText={cellConfig.otherText}
              otherTextValue={
                value?.[rowName]?.[getOtherTextValueFieldName(columnName)]
              }
            />
          );
          break;
        case gridCellTypeEnum.text:
          align = cellConfig.textAlign || "left";
          content = cellConfig.cellText;
          break;
        case gridCellTypeEnum.checkbox:
        case gridCellTypeEnum.radio:
          content = (
            <Checkbox
              choices={cellConfig.choices}
              value={cellValue}
              showOtherItem={cellConfig.showOtherItem}
              otherText={cellConfig.otherText}
              otherTextValue={
                value?.[rowName]?.[getOtherTextValueFieldName(columnName)]
              }
            />
          );
          break;
        case gridCellTypeEnum.blanks:
          content = (
            <Blanks
              blankSettings={cellConfig.blankSettings}
              blankContent={cellConfig.blankContent}
              value={cellValue}
            />
          );
          break;
        case gridCellTypeEnum.valueText:
          content = cellValue;
          break;
        case gridCellTypeEnum.imageUpload:
          content = (
            <div style={{ minHeight: "32px" }}>
              {cellValue && (
                <img
                  style={{
                    maxHeight: "36px",
                  }}
                  src={getDownloadUrl(formId, cellValue)}
                />
              )}
            </div>
          );
          break;
        default:
          content = "unknow grid cell type";
      }
      return <p className={`cell-layout ${align}`}>{content}</p>;
    };
    const getColumns = () => {
      return columns.map((column) => ({
        id: column.value,
        className: "survey-table-cell",
        originalColumn: column,
        header: renderColumnHeader,
        cell: renderColumnCell,
      }));
    };

    const getDatas = () => {
      return gridRows?.map((row) => ({
        key: row,
      }));
    };

    const mergedCells = computed(() => {
      const cells = {};
      forEachCell(data.cells, (cell, rowKey, columnKey) => {
        if (cell.colSpan || cell.rowSpan) {
          const cellKey = `${rowKey}_${columnKey}`;
          cells[cellKey] = cell;
        }
      });
      return cells;
    });

    const tableDatas = getDatas();
    const tableColumsn = getColumns();

    return () => {
      return (
        <Table
          class={`survey-print-table ${
            hideTableHeader ? "hideTableHeader" : ""
          }`}
          variant="table"
          data={tableDatas}
          columns={tableColumsn}
          mergedCells={unref(mergedCells)}
        />
      );
    };
  },
});

export default Grid;
