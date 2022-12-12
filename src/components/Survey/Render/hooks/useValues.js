import { inject, provide, ref } from "vue";
import QuestionTypeEnum from "@survey/types/QuestionTypeEnum";

const valuesInjectionKey = Symbol("values");

export const useValuesInit = () => {
  const values = ref({});

  const setFieldValue = (field, value) => {
    values.value[field] = value;
  };

  provide(valuesInjectionKey, {
    values,
    setFieldValue,
  });

  return {
    values,
    setFieldValue,
  };
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
