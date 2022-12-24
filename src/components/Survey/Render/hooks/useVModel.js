import { computed, unref, watchEffect } from "vue";
import { useValues } from "./useValues";
import { excuteExpression } from "../utils";

const useVModel = (fieldName, defaultExpression) => {
  const { setFieldValue, values } = useValues();

  let defaultValueWatchStop = watchEffect(() => {
    if (defaultExpression) {
      const result = excuteExpression(defaultExpression, unref(values));
      setFieldValue(fieldName, result || undefined);
    }
  });

  return computed({
    get() {
      return unref(values)[fieldName];
    },
    set(val) {
      if (defaultValueWatchStop) {
        defaultValueWatchStop();
        defaultValueWatchStop = null;
      }
      setFieldValue(fieldName, val);
    },
  });
};

export default useVModel;
