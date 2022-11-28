import { computed, inject, unref } from "vue";
const useBinder = (bindName) => {
  const {
    currentActivePath,
    currentActiveItem,
    updateQuestionFieldValueByPath,
  } = inject("creator");

  const handleValueChange = (val) =>
    updateQuestionFieldValueByPath(
      `${unref(currentActivePath)}.${bindName}`,
      val
    );

  const binderValue = computed(() => unref(currentActiveItem)[bindName]);

  return {
    binderValue,
    handleValueChange,
  };
};

export default useBinder;
