import { inject, provide, ref } from "vue";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";
import objectPath from "object-path";

window.objectPath = objectPath;

const valuesInjectionKey = Symbol("values");

export const useValuesInit = () => {
  const values = ref({});
  window.values = values;

  const setFieldValue = (field, value) => {
    values.value[field] = value;
  };

  const setNestedObjectValue = (setPath, setValue) => {
    objectPath.set(values.value, setPath, setValue);
  };

  const removeValuesProperty = (removePath) => {
    objectPath.del(values.value, removePath);
  };

  const provideData = {
    values,
    setFieldValue,
    setNestedObjectValue,
    removeValuesProperty,
  };
  provide(valuesInjectionKey, provideData);

  return provideData;
};

export const useValues = () => {
  return inject(valuesInjectionKey, () => ({}));
};

const forEachQuestions = (questions, fn) => {
  if (!questions.length || !fn) return;
  questions.forEach((question) => {
    fn(question);
    if (
      question.type === QuestionTypeEnum.panel &&
      question.questions?.length
    ) {
      forEachQuestions(question.questions, fn);
    }
  });
};
