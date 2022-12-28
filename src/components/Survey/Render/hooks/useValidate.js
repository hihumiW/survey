import * as yup from "yup";
import QuestionTypeEnum, {
  textTypeEnum,
  gridCellTypeEnum,
} from "@survey/types/questionTypeEnum";

const useValidate = (questions) => {
  yup.setLocale({
    mixed: {
      required: (params) => {
        const { path } = params;
        const paths = path.split(".");
        if (paths.length === 1) {
          return `题目为必填项目`;
        }
        paths[0] = "题目";
        return `${paths.join("的")} 为必填项目`;
      },
    },
  });
  const getTextScheme = (inputType) => {
    if (
      [
        textTypeEnum.number,
        textTypeEnum.date,
        textTypeEnum.time,
        textTypeEnum.provinceCity,
      ].includes(inputType)
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
      const rowDataShape = columns.reduce((lookup, column) => {
        lookup[column.value] = getStringSchema();
        return lookup;
      }, {});
      columnValidate = yup.object().shape(rowDataShape);
    }
    const shape = rows.reduce((lookup, row) => {
      lookup[row.value] = columnValidate.clone();
      return lookup;
    }, {});
    return yup.object().shape(shape);
  };

  const getGridSchema = (question) => {
    const { gridRows, columns, cells } = question;
    let shape = {};
    gridRows.forEach((rowName) => {
      const rowDataShape = {};
      columns.forEach((column) => {
        const { value: columnName } = column;
        const config = cells?.[rowName]?.[columnName] || column;
        if (config.cellType === gridCellTypeEnum.input) {
          rowDataShape[columnName] = getTextScheme(config.inputType);
        }
        if (config.cellType === gridCellTypeEnum.dropdown) {
          rowDataShape[columnName] = config.multipleChoice
            ? getArraySchema()
            : getStringSchema();
        }
      });
      shape[rowName] = yup.object().shape(rowDataShape);
    });
    return yup.object().shape(shape);
  };

  const requiredMsg = "题目是必填项目";
  const getStringSchema = () => yup.string().required();
  const getArraySchema = () => yup.array().required().min(1);
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
      case QuestionTypeEnum.grid:
        return getGridSchema(question);
      case QuestionTypeEnum.file:
        return getArraySchema();
      default:
        break;
    }
  };
  const getValueSchema = () => {
    const questionsShape = questions?.reduce((lookup, question) => {
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
