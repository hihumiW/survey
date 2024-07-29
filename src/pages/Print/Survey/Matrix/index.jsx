import { defineComponent } from "vue";
import { CheckboxOutline } from "@vicons/ionicons5";
import Table from "@survey/components/Table";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";

const Matrix = defineComponent({
  props: ["data", "value"],
  setup(props) {
    const { data, value } = props;
    const { columns, rows, type } = data;
    const getDatas = () => {
      return rows?.map(({ value, text }) => ({
        key: value,
        title: text,
      }));
    };

    const renderRowTitleCell = ({ rowData }) => (
      <span class="inline-block">{rowData.title}</span>
    );
    const renderColumnHeader = ({ column }) => (
      <span class="inline-block">{column.originalColumn.text}</span>
    );

    const getColumns = () => {
      return [
        {
          id: "RowTitle",
          isPlaceholder: true,
          className: "survey-table-cell-rowTitle survey-table-cell",
          cell: renderRowTitleCell,
        },
      ].concat(
        columns.map((column) => ({
          id: column.value,
          className: "survey-table-cell",
          originalColumn: column,
          header: renderColumnHeader,
          cell: renderColumnCell,
        }))
      );
    };

    const renderColumnCell = ({ column, rowData }) => {
      const { key: rowName } = rowData;
      const { id: columnName } = column;
      const rowValue = value?.[rowName];

      switch (type) {
        case QuestionTypeEnum.matrixradio:
          return rowValue === columnName ? (
            <CheckboxOutline class="w-5" />
          ) : null;
        case QuestionTypeEnum.matrixcheckbox:
          return rowValue?.includes(columnName) ? (
            <CheckboxOutline class="w-5" />
          ) : null;
        case QuestionTypeEnum.matrixinput:
          return rowValue?.[columnName];
        case QuestionTypeEnum.matrixdropdown:
          const { originalColumn } = column;
          return originalColumn.choices?.find(
            (i) => i.value === rowValue?.[columnName]
          )?.text;
      }
    };

    const tableDatas = getDatas();
    const tableColumsn = getColumns();
    return () => {
      return (
        <Table
          class="survey-print-table"
          variant="table"
          columns={tableColumsn}
          data={tableDatas}
        />
      );
    };
  },
});

export default Matrix;
