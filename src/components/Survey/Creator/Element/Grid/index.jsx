import { computed, defineComponent, toRef, unref } from "vue";
import Title from "@survey/components/Title/index.vue";
import CellWrapper from "./components/CellWrapper";
import Table from "@survey/components/Table";
import Cell from "./components/Cell";
import useGridEdit from "./useGridEdit";
import questionCommonProps from "@survey/util/questionCommonProps";
import QuestionContainer from "@survey/components/QuestionContainer/index.vue";
import questionTypeEnum from "@survey/util/questionTypeEnum";

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
        question: { rows },
      } = props;
      return rows.map((rowName) => ({
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
        minWidth: 250,
        header: ({ column, columnIndex }) => {
          return (
            <CellWrapper
              cellPath={getColumnPath(columnIndex)}
              cellType={questionTypeEnum.gridColumn}
            >
              <Title
                value={column.originalColumn.text}
                editable
                placeholder="Please enter column text"
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
                cellPath={cellPath}
                column={column}
                rowName={rowData.key}
                cells={props.question.cells}
                cellEditor={cellEditor}
              />
            </CellWrapper>
          );
        },
      }));
    });

    return () => (
      <QuestionContainer {...props}>
        <div className="overflow-auto">
          <Table
            data={datas.value}
            columns={columnsDef.value}
            class="survey-table"
          />
        </div>
      </QuestionContainer>
    );
  },
});

export default Grid;
