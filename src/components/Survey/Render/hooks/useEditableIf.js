import { computed, unref } from "vue";
import { excuteExpression } from "../utils";

const useEditable = (question, values) => {
  const { readOnly, editableIf } = question;

  if (readOnly) return false;
  return computed(() =>
    editableIf ? Boolean(excuteExpression(editableIf, unref(values))) : true
  );
};

export default useEditable;
