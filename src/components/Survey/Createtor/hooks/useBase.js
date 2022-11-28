import { inject } from "vue";

const useBase = (questionPath) => {
  const creator = inject("creator");
  const { updateQuestionFieldValueByPath } = creator;
  const questionFieldHanlder = (fieldName) => (text) =>
    updateQuestionFieldValueByPath(`${questionPath}.${fieldName}`, text);

  return {
    questionFieldHanlder,
    ...creator,
  };
};

export default useBase;
