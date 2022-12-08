import QuestionTypeEnum from "@survey/util/questionTypeEnum";

export default [
  {
    name: "Radio Group",
    type: QuestionTypeEnum.radiogroup,
  },
  {
    name: "Single Text",
    type: QuestionTypeEnum.text,
  },
  {
    name: "Checkbox",
    type: QuestionTypeEnum.checkbox,
  },
  {
    name: "Dropdown",
    type: QuestionTypeEnum.dropdown,
  },
  {
    name: "File",
    type: QuestionTypeEnum.file,
  },
  {
    name: "Panel",
    type: QuestionTypeEnum.panel,
  },
  {
    name: "MatrixRadio",
    type: QuestionTypeEnum.matrixradio,
  },
  {
    name: "MatrixCheckbox",
    type: QuestionTypeEnum.matrixcheckbox,
  },
  {
    name: "MatrixDropdown",
    type: QuestionTypeEnum.matrixdropdown,
  },
  {
    name: "MatrixInput",
    type: QuestionTypeEnum.matrixinput,
  },
  {
    name: "Grid",
    type: QuestionTypeEnum.grid,
  },
];
