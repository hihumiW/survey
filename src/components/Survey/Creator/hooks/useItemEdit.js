import { useInjectCreator } from "@survey/hooks/useCreator";
import { unref } from "vue";

const useItemEdit = (eidtConfig) => {
  const {
    itemsPathRef,
    itemValueTemplate,
    maxItemCount,
    itemTitle = "项目",
  } = eidtConfig;
  const {
    updateQuestionFieldValueByPath,
    updateItemValue,
    addNewItem,
    removeItem,
    moveItemIndex,
    getModelV,
  } = useInjectCreator();

  if (!updateQuestionFieldValueByPath || !unref(itemsPathRef)) return {};

  const getItemPath = (itemIndex) => `${unref(itemsPathRef)}.${itemIndex}`;

  const handleTitleChange = (index, text) => {
    const path = `${getItemPath(index)}.text`;
    updateQuestionFieldValueByPath(path, text);
  };

  const handleItemValueChange = (itemIndex, newValue) =>
    updateItemValue(unref(itemsPathRef), itemIndex, newValue);

  const handleItemAdd = () => {
    const itemPath = unref(itemsPathRef);
    const items = getModelV(itemPath);
    if (maxItemCount && items?.length >= maxItemCount) {
      return window.$message.warning(`${itemTitle}最多添加${maxItemCount}项`);
    }
    addNewItem(itemPath, unref(itemValueTemplate));
  };

  const handleItemRemove = (revemoIndex) => {
    const items = getModelV(unref(itemsPathRef));
    if (items?.length === 1) {
      return window.$message.warning(`请至少保留一项${itemTitle}`);
    }
    removeItem(getItemPath(revemoIndex));
  };

  const handleItemScoreChange = (itemIndex, value) => {
    const scorePath = `${getItemPath(itemIndex)}.score`;
    updateQuestionFieldValueByPath(scorePath, value);
  };

  const handleItemMove = (itemIndex, direction) =>
    moveItemIndex(unref(itemsPathRef), itemIndex, direction);

  return {
    handleTitleChange,
    handleItemValueChange,
    handleItemAdd,
    handleItemRemove,
    handleItemScoreChange,
    handleItemMove,
  };
};

export default useItemEdit;
