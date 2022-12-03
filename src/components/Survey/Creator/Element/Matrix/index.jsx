import { computed, defineComponent, toRef } from "vue";
import { NRadio, NCheckbox, NInput, NTable } from "naive-ui";
import Title from "@survey/components/Title/index.vue";
import QuestionContainer from "@survey/components/QuestionContainer/index.vue";
import questionCommonProps from "@survey/util/questionCommonProps";
import useMatrixEdit from "../../hooks/useMatrixEdit";
import QuestionTypeEnum from "@survey/util/questionTypeEnum";

import "./index.css";

const Matrix = defineComponent({
  props: questionCommonProps,
  name: "MatrixElement",
  setup(props) {
    const pathRef = toRef(props, "path");
    const { handleTitleChange } = useMatrixEdit(pathRef);

    const renderHeader = () => {
      const { columns } = props.question;
      return (
        <tr>
          <th className="survey-matrix_cell"></th>
          {columns?.map((column, index) => (
            <th className="survey-matrix_cell">
              <Title
                value={column.text}
                editable
                onUpdate:value={(text) =>
                  handleTitleChange("columns", index, text)
                }
              />
            </th>
          ))}
        </tr>
      );
    };

    const renderRows = () => {
      const { rows, columns } = props.question;

      return rows?.map((row, rowIndex) => (
        <tr>
          <td className="survey-matrix_cell">
            <Title
              value={row.text}
              editable
              onUpdate:value={(text) =>
                handleTitleChange("rows", rowIndex, text)
              }
            />
          </td>
          {columns?.map((column, columnIndex) => (
            <td className="survey-matrix_cell">{renderCell()}</td>
          ))}
        </tr>
      ));
    };

    const renderCell = (columnValue) => {
      const {
        question: { type },
      } = props;
      if (type === QuestionTypeEnum.matrixradio) {
        return <NRadio disabled />;
      }
      if (type === QuestionTypeEnum.matrixcheckbox) {
        return <NCheckbox disabled />;
      }
      if (type === QuestionTypeEnum.matrixinput) {
        return <NInput disabled placeholder="" />;
      }
    };

    return () => {
      return (
        <QuestionContainer {...props}>
          <div className="overflow-auto relative">
            <NTable size="large" bordered={false} class="survey-matrix_table">
              <thead className="survey-matrix_table_header">
                {renderHeader()}
              </thead>
              <tbody>{renderRows()}</tbody>
            </NTable>
          </div>
        </QuestionContainer>
      );
    };
  },
});

export default Matrix;
