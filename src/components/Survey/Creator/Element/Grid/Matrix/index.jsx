import { computed, defineComponent, toRef, unref } from "vue";
import { NRadio, NCheckbox, NInput, NSelect } from "naive-ui";
import Title from "@survey/components/Title/index.vue";
import Table from "@survey/components/Table";
import ColumnWrapper from "../components/CellWrapper";
import QuestionContainer from "@survey/components/QuestionContainer/index.vue";
import questionCommonProps from "@survey/util/questionCommonProps";
import useMatrixEdit, {
  getMatrixColumnType,
} from "@survey/Creator/hooks/useMatrixEdit";
import QuestionTypeEnum from "@survey/util/questionTypeEnum";

const Matrix = defineComponent({
  props: questionCommonProps,
  name: "MatrixElement",
  setup(props) {
    const pathRef = toRef(props, "path");
    const getColumnPath = (columnIndex) =>
      `${unref(pathRef)}.columns.${columnIndex}`;
    const { handleColumnTitleChange, handleRowTitleChange } =
      useMatrixEdit(pathRef);

    const datas = computed(() => {
      const {
        question: { rows },
      } = props;
      return rows.map(({ value, text }) => {
        return {
          key: value,
          _title: text,
        };
      });
    });

    const columnsDef = computed(() => {
      const {
        question: { columns },
      } = props;
      return [
        {
          id: "RowTitle",
          isPlaceholder: true,
          minWidth: 250,
          maxWidth: 400,
          className: "survey-table-cell survey-table-cell-rowTitle ",
          cell: renderRowTitleCell,
        },
      ].concat(
        columns.map((column) => ({
          id: column.value,
          className: "survey-table-cell ",
          minWidth: 200,
          maxWidth: 350,
          originalColumn: column,
          header: renderColumnHeader,
          cell: renderCell,
        }))
      );
    });

    const renderRowTitleCell = ({ rowData, rowIndex }) => {
      return (
        <Title
          value={rowData._title}
          editable
          onUpdate:value={(text) => handleRowTitleChange(rowIndex, text)}
        />
      );
    };

    const renderColumnHeader = ({ column, columnIndex }) => {
      return (
        <ColumnWrapper
          cellPath={getColumnPath(columnIndex - 1)}
          cellType={getMatrixColumnType(props.question.type)}
        >
          <Title
            value={column.originalColumn.text}
            editable
            onUpdate:value={(text) =>
              handleColumnTitleChange(columnIndex - 1, text)
            }
          />
        </ColumnWrapper>
      );
    };

    const renderCell = (ctx) => {
      const {
        question: { type },
      } = props;
      let element = null;
      const commonProps = {
        disabled: true,
        size: "large",
      };
      if (type === QuestionTypeEnum.matrixradio) {
        element = <NRadio {...commonProps} />;
      }
      if (type === QuestionTypeEnum.matrixcheckbox) {
        element = <NCheckbox {...commonProps} />;
      }
      if (type === QuestionTypeEnum.matrixinput) {
        element = <NInput placeholder="" {...commonProps} />;
      }
      if (type === QuestionTypeEnum.matrixdropdown) {
        element = <NSelect placeholder="" {...commonProps} />;
      }
      return (
        <div className="min-h-[40px] flex items-center justify-center">
          {element}
        </div>
      );
    };

    return () => (
      <QuestionContainer {...props} editable>
        <div className="overflow-auto relative">
          <Table
            class="survey-table"
            columns={columnsDef.value}
            data={datas.value}
          />
        </div>
      </QuestionContainer>
    );
  },
});

export default Matrix;
