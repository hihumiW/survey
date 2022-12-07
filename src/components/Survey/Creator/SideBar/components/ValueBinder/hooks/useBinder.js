import { computed, unref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";

const useBinder = (bindName) => {
  const { currentActivePath, getModelV, updateQuestionFieldValueByPath } =
    useInjectCreator();

  const handleValueChange = (val) =>
    updateQuestionFieldValueByPath(
      `${unref(currentActivePath)}.${bindName}`,
      val
    );

  const binderValue = computed(
    () => getModelV(unref(currentActivePath))?.[bindName]
  );

  return {
    binderValue,
    handleValueChange,
  };
};

export default useBinder;
