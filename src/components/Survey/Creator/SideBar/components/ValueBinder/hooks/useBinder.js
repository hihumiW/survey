import { computed, unref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";

const useBinder = (bindName) => {
  const {
    currentActivePath,
    currentActiveItem,
    updateQuestionFieldValueByPath,
  } = useInjectCreator();

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
