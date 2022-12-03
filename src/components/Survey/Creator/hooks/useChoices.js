import { unref, computed } from "vue";
import useItemEdit from "./useItemEdit";

const useChoicesEdit = (questionPath) => {
  const choicesPath = computed(() => `${unref(questionPath)}.choices`);

  return useItemEdit({
    itemsPathRef: choicesPath,
    itemValueTemplate: "item",
  });
};

export default useChoicesEdit;
