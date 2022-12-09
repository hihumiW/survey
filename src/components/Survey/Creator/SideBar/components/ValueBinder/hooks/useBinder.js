import { computed, unref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";

const useBinder = (bindName, defaultValue) => {
  const { currentActivePath, getModelV, updateQuestionFieldValueByPath } =
    useInjectCreator();

  const handleValueChange = (val) =>
    updateQuestionFieldValueByPath(
      `${unref(currentActivePath)}.${bindName}`,
      val
    );

  const binderValue = computed(
    () => getModelV(unref(currentActivePath))?.[bindName] || defaultValue
  );

  return {
    binderValue,
    handleValueChange,
  };
};

export default useBinder;
