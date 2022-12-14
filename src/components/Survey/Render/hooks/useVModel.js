import { computed, unref } from "vue";
import { useValues } from "./useValues";

const useVModel = (fieldName) => {
  const { setFieldValue, values } = useValues();

  return computed({
    get() {
      return unref(values)[fieldName];
    },
    set(val) {
      setFieldValue(fieldName, val);
    },
  });
};

export default useVModel;
