import {
  NInput,
  NInputNumber,
  NTimePicker,
  NDatePicker,
  NCascader,
} from "naive-ui";
import { textTypeEnum } from "@survey/types/questionTypeEnum";

export const getPlaceholder = (inputType, defaultPlaceholder) => {
  switch (inputType) {
    case textTypeEnum.text:
      return "请输入";
    case textTypeEnum.time:
      return "--:--:--";
    case textTypeEnum.date:
      return "年/月/日";
    case textTypeEnum.provinceCity:
      return "请选择省市";
    default:
      return defaultPlaceholder;
  }
};

export const getRenderInput = (inputType) => {
  switch (inputType) {
    case textTypeEnum.number:
      return NInputNumber;
    case textTypeEnum.time:
      return NTimePicker;
    case textTypeEnum.date:
    case textTypeEnum.daterange:
      return NDatePicker;
    case textTypeEnum.provinceCity:
      return NCascader;
    default:
      return NInput;
  }
};

export const getInputVariantClassName = (inputVariant) => {
  return [
    "survey-question_text",
    inputVariant === "standard" && "variant-standard",
  ];
};

export const getInputProps = (props) => {
  const { placeholder, inputType, precision, maxLength } = props;
  const Props = {
    size: "large",
    clearable: true,
    placeholder: getPlaceholder(inputType, placeholder),
  };
  switch (inputType) {
    case textTypeEnum.number:
      if (typeof precision === "number") {
        Props.precision = precision === -1 ? undefined : precision - 1;
      }
      return Props;
    case textTypeEnum.text:
    case textTypeEnum.textarea:
      if (maxLength > 0) {
        Props.maxlength = maxLength;
        Props.showCount = !!maxLength;
      }
      if (inputType === textTypeEnum.textarea) {
        Props.type = "textarea";
      }
      return Props;
    case textTypeEnum.date:
      Props.format = "yyyy/MM/dd";
      return Props;
    case textTypeEnum.daterange:
      Props.format = "yyyy/MM/dd";
      Props.type = "daterange";
  }
  return Props;
};
