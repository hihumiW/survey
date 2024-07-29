import { computed, watch } from "vue";
import { otherOptionDefaultValue } from "@survey/Render/Element/Select";

const useOtherText = (props, emit) => {
  const showOther = computed(() => {
    const val = props.selectValue;
    if (Array.isArray(val)) {
      return val.includes(otherOptionDefaultValue);
    }
    return val === otherOptionDefaultValue;
  });

  const inputValue = computed({
    get() {
      return props.otherTextValue || "";
    },
    set(val) {
      emit("textValueChange", val);
    },
  });

  watch(showOther, (val) => {
    if (!val) inputValue.value = "";
  });

  return {
    showOther,
    inputValue,
  };
};

export default useOtherText;
