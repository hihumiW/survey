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
    updateItemValue(`${getItemPath(itemIndex)}`, newValue);

  const handleItemAdd = () =>
    addNewItem(unref(itemsPathRef), unref(itemValueTemplate));

  const handleItemRemove = (revemoIndex) =>
    removeItem(getItemPath(revemoIndex));

  return {
    handleTitleChange,
    handleItemValueChange,
    handleItemAdd,
    handleItemRemove,
  };
};

export default useItemEdit;
