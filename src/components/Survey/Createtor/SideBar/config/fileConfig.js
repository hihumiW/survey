import generateValueBinder from "./generateValueBinder";
import SelectBinder from "../components/ValueBinder/Select.vue";
import InputBinder from "../components/ValueBinder/Input.vue";

import fileTypeOptions from "../../util/fileTypeOptions";

export const FileAcceptedTypesEditor = generateValueBinder(
  SelectBinder,
  {
    title: "Accepted file types",
    bindName: "acceptedTypes",
    options: fileTypeOptions,
    selectProps: {
      multiple: true,
      filterable: true,
    },
  },
  "FileAcceptedTypesEditor"
);

export const MaxFileCount = generateValueBinder(SelectBinder, {
  title: "Maximum number of file",
  bindName: "maxNumber",
  options: Array(10)
    .fill(undefined)
    .map((_i, i) => ({
      label: i + 1,
      value: i + 1,
    })),
  selectProps: {
    clearable: true,
  },
});

export const FileMaxSizeEditor = generateValueBinder(
  InputBinder,
  {
    title: "Maximum file size (in bytes)",
    bindName: "maxSize",
    type: "number",
    inputProps: {
      min: 1,
    },
  },
  "FileMaxSizeEditor"
);
