import { computed, nextTick, unref, ref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";

const useBinder = (bindName, defaultValue) => {
  const { currentActivePath, getModelV, updateQuestionFieldValueByPath } =
    useInjectCreator();
  let enableUpdater = false;
  const updater = ref(0);

  const handleValueChange = (val) => {
    updateQuestionFieldValueByPath(
      `${unref(currentActivePath)}.${bindName}`,
      val
    );
    nextTick(() => {
      if (enableUpdater) {
        updater.value++;
      }
    });
  };

  const binderValue = computed(() => {
    let val = getModelV(unref(currentActivePath));
    if (bindName) {
      val = val?.[bindName];
    }
    if (!val) {
      enableUpdater = true;
      unref(updater);
    }
    return val ?? defaultValue;
  });

  return {
    binderValue,
    handleValueChange,
  };
};

export default useBinder;
