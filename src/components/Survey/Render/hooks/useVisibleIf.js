import { computed, unref } from "vue";
import { excuteExpression } from "../utils";
import { useValues } from "./useValues";

const useVisibleIf = (question, values) => {
  const { setFieldValue } = useValues();

  return computed(() => {
    const { visibleIf } = question;
    const result = visibleIf
      ? Boolean(excuteExpression(visibleIf, unref(values)))
      : true;
    if (!result) {
      setFieldValue(question.name, undefined);
    }
    return result;
  });
};

export default useVisibleIf;
