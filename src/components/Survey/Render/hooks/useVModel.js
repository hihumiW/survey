import { computed, unref } from "vue";
import { useValues } from "./useValues";

const useVModel = (question) => {
  const { setFieldValue, values } = useValues();
  const { name } = question;
  return computed({
    get() {
      return unref(values)[name];
    },
    set(val) {
      setFieldValue(name, val);
    },
  });
};

export default useVModel;
