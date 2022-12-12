import { computed, unref } from "vue";
import { excuteExpression } from "../utils";

const useVisibleIf = (question, values) => {
  return computed(() => {
    const { visibleIf } = question;
    return visibleIf
      ? Boolean(excuteExpression(visibleIf, unref(values)))
      : true;
  });
};

export default useVisibleIf;
