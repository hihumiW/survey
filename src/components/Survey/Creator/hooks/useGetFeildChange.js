import { inject, unref } from "vue";

const useGetFeildChange = (questionPathRef) => {
  const { updateQuestionFieldValueByPath } = inject("creator");
  return (fieldName) => (text) =>
    updateQuestionFieldValueByPath(
      `${unref(questionPathRef)}.${fieldName}`,
      text
    );
};

export default useGetFeildChange;
