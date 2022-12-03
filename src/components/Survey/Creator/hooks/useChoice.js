import { unref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";

const useChoice = (questionPath) => {
  const getItemsPath = () => `${unref(questionPath)}.choices`;
  const {
    updateQuestionFieldValueByPath,
    addNewItem,
    removeItem,
    updateItemValue,
  } = useInjectCreator();

  if (!updateQuestionFieldValueByPath) return {};

  const handleChoiceTitleChange = (chioceIndex, newTitle) => {
    updateQuestionFieldValueByPath(
      `${getPathItems()}.${chioceIndex}.text`,
      newTitle
    );
  };

  const handleChoiceRemove = (chioceIndex) =>
    removeItem(`${getPathItems()}.${chioceIndex}`);

  const handleChoiceAdd = () => addNewItem(getItemsPath(), "item");

  const handleItemValueChange = (itemIndex, newValue) =>
    updateItemValue(getItemsPath(), itemIndex, newValue);

  return {
    handleChoiceTitleChange,
    handleChoiceRemove,
    handleChoiceAdd,
    handleItemValueChange,
  };
};

export default useChoice;
