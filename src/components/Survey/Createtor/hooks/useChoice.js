import { inject, unref } from "vue";
const useChoice = (questionPath) => {
  const getPath = () => unref(questionPath);
  const {
    updateQuestionFieldValueByPath,
    addQuestionChoice,
    removeItem,
    updateChoiceItemValue,
  } = inject("creator");

  const handleChoiceTitleChange = (chioceIndex, newTitle) => {
    updateQuestionFieldValueByPath(
      `${getPath()}.choices.${chioceIndex}.text`,
      newTitle
    );
  };

  const handleChoiceRemove = (chioceIndex) =>
    removeItem(`${getPath()}.choices.${chioceIndex}`);

  const handleChoiceAdd = () => addQuestionChoice(getPath());

  return {
    handleChoiceTitleChange,
    handleChoiceRemove,
    handleChoiceAdd,
    updateChoiceItemValue,
  };
};

export default useChoice;
