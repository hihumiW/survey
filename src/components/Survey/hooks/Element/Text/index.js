import {
  NInput,
  NInputNumber,
  NTimePicker,
  NDatePicker,
  NSelect,
} from "naive-ui";

export const getPlaceholder = (inputType, defaultPlaceholder) => {
  switch (inputType) {
    case "time":
      return "--:--";
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
