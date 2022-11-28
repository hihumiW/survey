import generateValueBinder from "./generateValueBinder";
import InputBinder from "../components/ValueBinder/Input.vue";
import RadioBinder from "../components/ValueBinder/Radio.vue";
import BooleanBinder from "../components/ValueBinder/Boolean.vue";
export { default as ChoicesEditor } from "../components/ChoicesEditor/index.vue";
import { unref } from "vue";

export const ChoicesOrientationEditor = generateValueBinder(
  RadioBinder,
  {
    title: "Choice orientation",
    bindName: "orientation",
    options: [
      {
        label: "Vertical",
        value: "vertical",
      },
      {
        label: "Horizontal",
        value: "horizontal",
      },
    ],
  },
  "ChoicesOrientationEditor"
);

export const EnableOtherOptionEditor = generateValueBinder(
  BooleanBinder,
  {
    title: "Enable other option (describe)",
    bindName: "showOtherItem",
  },
  "EnableOtherOptionEditor"
);

export const OtherOptionTextEditor = generateValueBinder(
  InputBinder,
  {
    title: "Other option text",
    bindName: "otherText",
  },
  "OtherOptionTextEditor",
  ({ currentActiveItem }) => unref(currentActiveItem).showOtherItem
);

export const OtherOptionPlaceholder = generateValueBinder(
  InputBinder,
  {
    title: "Other placeholder",
    bindName: "otherPlaceholder",
  },
  "OtherOptionPlaceholder",
  ({ currentActiveItem }) => unref(currentActiveItem).showOtherItem
);
