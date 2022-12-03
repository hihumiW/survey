import { defineComponent, toRef } from "vue";
import { NRadio, NCheckbox, NInput, NTable } from "naive-ui";
import Title from "@survey/components/Title/index.vue";
import QuestionContainer from "@survey/components/QuestionContainer/index.vue";
import questionCommonProps from "@survey/util/questionCommonProps";

import useMatrixEdit from "./useMatrixEdit";
import QuestionTypeEnum from "@survey/util/questionTypeEnum";

import "./index.css";

const Matrix = defineComponent({
  props: questionCommonProps,
  name: "MatrixElement",
  setup(props) {
    const pathRef = toRef(props, "path");
    const { handleColumnTitleChange, handleRowTitleChange } =
      useMatrixEdit(pathRef);

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
                onUpdate:value={(text) => handleColumnTitleChange(index, text)}
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
              onUpdate:value={(text) => handleRowTitleChange(rowIndex, text)}
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
      return (
        <div className="min-h-[40px] flex items-center justify-center">
          {element}
        </div>
      );
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
