import {
  NInput,
  NInputNumber,
  NTimePicker,
  NDatePicker,
  NSelect,
} from "naive-ui";
import { textTypeEnum } from "@survey/types/questionTypeEnum";

export const getPlaceholder = (inputType, defaultPlaceholder) => {
  switch (inputType) {
    case "time":
      return "--:--:--";
    case "date":
      return "year/month/day";
    case "provinceCity":
      return "Please select province";
    default:
      return defaultPlaceholder;
  }
};

export const getRenderInput = (inputType) => {
  switch (inputType) {
    case "number":
      return NInputNumber;
    case "time":
      return NTimePicker;
    case "date":
      return NDatePicker;
    case "provinceCity":
      return NSelect;
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
      Props.precision = precision === -1 ? undefined : precision - 1;
      return Props;
    case textTypeEnum.text:
      Props.maxlength = maxLength;
      Props.showCount = !!maxLength;
      return Props;
    case textTypeEnum.date:
      Props.format = "yyyy/MM/dd";
      return Props;
  }
  return Props;
};
