import QuestionTypeEnum from "@survey/types/questionTypeEnum";

export default [
  {
    name: "单选",
    type: QuestionTypeEnum.radiogroup,
  },
  {
    name: "输入框",
    type: QuestionTypeEnum.text,
  },
  {
    name: "多选",
    type: QuestionTypeEnum.checkbox,
  },
  {
    name: "下拉选择",
    type: QuestionTypeEnum.dropdown,
  },
  {
    name: "文件上传",
    type: QuestionTypeEnum.file,
  },
  {
    name: "面板",
    type: QuestionTypeEnum.panel,
  },
  {
    name: "矩阵单选",
    type: QuestionTypeEnum.matrixradio,
  },
  {
    name: "矩阵多选",
    type: QuestionTypeEnum.matrixcheckbox,
  },
  {
    name: "矩阵下拉选择",
    type: QuestionTypeEnum.matrixdropdown,
  },
  {
    name: "矩阵输入",
    type: QuestionTypeEnum.matrixinput,
  },
  {
    name: "表格",
    type: QuestionTypeEnum.grid,
  },
];
