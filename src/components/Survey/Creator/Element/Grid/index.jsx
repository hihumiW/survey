import { computed, defineComponent, toRef } from "vue";
import Title from "@survey/components/Title/index.vue";
import Table from "@survey/components/Table";
import useGridEdit from "./useGridEdit";
import questionCommonProps from "@survey/util/questionCommonProps";
import QuestionContainer from "@survey/components/QuestionContainer/index.vue";

const Grid = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const pathRef = toRef(props, "path");
    const { handleColumnTitleChange } = useGridEdit(pathRef);
    const datas = computed(() => {
      const {
        question: { rows },
      } = props;
      return rows.map((row) => ({
        key: row.value,
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
            <div
              className="wrapper"
              onClick={() => {
                console.log("ccc");
              }}
            >
              <Title
                value={column.originalColumn.text}
                editable
                onUpdate:value={(text) =>
                  handleColumnTitleChange(columnIndex, text)
                }
              />
            </div>
          );
        },
        cell: () => {
          return <div>cell text</div>;
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
