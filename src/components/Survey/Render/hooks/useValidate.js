import * as yup from "yup";
import QuestionTypeEnum, { textTypeEnum } from "@survey/types/questionTypeEnum";

const useValidate = (questions) => {
  const getTextScheme = (inputType) => {
    if (
      [textTypeEnum.number, textTypeEnum.date, textTypeEnum.time].includes(
        inputType
      )
    ) {
      return getNumberSchema();
    }
    return getStringSchema();
  };

  const getMatrixSchema = (question) => {
    const { type, rows, columns } = question;
    let columnValidate;
    if (QuestionTypeEnum.matrixradio === type) {
      columnValidate = getStringSchema();
    }
    if (QuestionTypeEnum.matrixcheckbox === type) {
      columnValidate = getArraySchema();
    }
    if (
      [QuestionTypeEnum.matrixdropdown, QuestionTypeEnum.matrixinput].includes(
        type
      )
    ) {
      columnValidate = columns.reduce((lookup, column) => {
        lookup[column.value] = getStringSchema();
        return lookup;
      }, {});
    }
    const shape = rows.reduce((lookup, row) => {
      lookup[row.value] = columnValidate;
      return lookup;
    }, {});
    return yup.object().shape(shape);
  };

  const getStringSchema = () => yup.string().required();
  const getArraySchema = () => yup.array().required();
  const getNumberSchema = () => yup.number().required();

  const getQuestionSchema = (question) => {
    const { type } = question;
    switch (type) {
      case QuestionTypeEnum.radiogroup:
      case QuestionTypeEnum.dropdown:
        return getStringSchema();
      case QuestionTypeEnum.text:
        const { inputType } = question.type;
        return getTextScheme(inputType);
      case QuestionTypeEnum.checkbox:
        return getArraySchema();
      case QuestionTypeEnum.matrixradio:
      case QuestionTypeEnum.matrixcheckbox:
      case QuestionTypeEnum.matrixinput:
      case QuestionTypeEnum.matrixdropdown:
        return getMatrixSchema(question);
      default:
        break;
    }
  };
  const getValueSchema = () => {
    const questionsShape = questions.reduce((lookup, question) => {
      if (question.isRequired) {
        const schema = getQuestionSchema(question);
        if (!schema) return;
        lookup[question.name] = schema;
      }
      return lookup;
    }, {});
    return yup.object().shape(questionsShape);
  };

  return getValueSchema();
};

export default useValidate;
