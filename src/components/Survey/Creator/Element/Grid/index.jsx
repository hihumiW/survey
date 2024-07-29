import { computed, defineComponent, toRef, unref } from "vue";
import Title from "@survey/components/Title/index.vue";
import CellWrapper from "./components/CellWrapper";
import Table from "@survey/components/Table";
import Cell from "./components/Cell";
import useGridEdit from "@survey/Creator/hooks/useGridEdit";
import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import QuestionContainer from "@survey/Creator/components/QuestionContainer/index.vue";
import questionTypeEnum from "@survey/types/questionTypeEnum";
import { forEachCell } from "@survey/utils";

const Grid = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const pathRef = toRef(props, "path");
    const getColumnPath = (columnIndex) =>
      `${unref(pathRef)}.columns.${columnIndex}`;
    const getCellPath = (rowName, columnName) =>
      `${unref(pathRef)}.cells.${rowName}.${columnName}`;
    const { handleColumnTitleChange, cellEditor } = useGridEdit(pathRef);

    const datas = computed(() => {
      const {
        question: { gridRows },
      } = props;
      return gridRows.map((rowName) => ({
        key: rowName,
      }));
    });

    const columnsDef = computed(() => {
      const {
        question: { columns },
      } = props;

      return columns.map((column) => ({
        id: column.value,
        className: "survey-table-cell",
        originalColumn: column,
        width: column.colWidth || 250,
        header: ({ column, columnIndex }) => {
          return (
            <CellWrapper
              cellPath={getColumnPath(columnIndex)}
              cellType={questionTypeEnum.gridColumn}
            >
              <Title
                value={column.originalColumn.text}
                editable
                placeholder="请输入列标题"
                maxlength={30}
                onUpdate:value={(text) =>
                  handleColumnTitleChange(columnIndex, text)
                }
              />
            </CellWrapper>
          );
        },
        cell: ({ rowData, column }) => {
          const cellPath = getCellPath(rowData.key, column.id);
          return (
            <CellWrapper
              cellPath={cellPath}
              cellType={questionTypeEnum.gridCell}
            >
              <Cell
                column={column}
                cellPath={cellPath}
                rowName={rowData.key}
                cells={props.question.cells}
                cellEditor={cellEditor}
              />
            </CellWrapper>
          );
        },
      }));
    });

    const mergedCells = computed(() => {
      const cells = {};
      forEachCell(props?.question?.cells, (cell, rowKey, columnKey) => {
        if (cell.colSpan || cell.rowSpan) {
          const cellKey = `${rowKey}_${columnKey}`;
          cells[cellKey] = cell;
        }
      });
      return cells;
    });

    return () => {
      return (
        <QuestionContainer {...props} editable>
          <div
            className={
              props.question.hideTableHeader
                ? "overflow-auto hideTableHeader config"
                : "overflow-auto"
            }
          >
            <Table
              data={datas.value}
              columns={columnsDef.value}
              mergedCells={unref(mergedCells)}
            />
          </div>
        </QuestionContainer>
      );
    };
  },
});

export default Grid;
