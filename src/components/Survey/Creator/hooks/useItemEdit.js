import { useInjectCreator } from "@survey/hooks/useCreator";
import { unref } from "vue";

const useItemEdit = (eidtConfig) => {
  const { itemsPathRef, itemValueTemplate } = eidtConfig;
  const {
    updateQuestionFieldValueByPath,
    updateItemValue,
    addNewItem,
    removeItem,
  } = useInjectCreator();

  if (!updateQuestionFieldValueByPath || !unref(itemsPathRef)) return {};

  const getItemPath = (itemIndex) => `${unref(itemsPathRef)}.${itemIndex}`;

  const handleTitleChange = (index, text) => {
    const path = `${getItemPath(index)}.text`;
    updateQuestionFieldValueByPath(path, text);
  };

  const handleItemValueChange = (itemIndex, newValue) =>
    updateItemValue(unref(itemsPathRef), itemIndex, newValue);

  const handleItemAdd = () =>
    addNewItem(unref(itemsPathRef), unref(itemValueTemplate));

  const handleItemRemove = (revemoIndex) =>
    removeItem(getItemPath(revemoIndex));

  const handleItemScoreChange = (itemIndex, value) => {
    const scorePath = `${getItemPath(itemIndex)}.score`;
    updateQuestionFieldValueByPath(scorePath, value);
  };

  return {
    handleTitleChange,
    handleItemValueChange,
    handleItemAdd,
    handleItemRemove,
    handleItemScoreChange,
  };
};

export default useItemEdit;
