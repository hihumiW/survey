import { provide, computed, inject, unref } from "vue";

const QUESTION_SEQUENCE_LIST_KEY = Symbol("questionSequenceList");

export const useQuestionSequenceInit = (surveyQuestionsRef) => {
  const surveyQuestionSequence = computed(() =>
    unref(surveyQuestionsRef).reduce((lookup, current) => {
      current.showQuestionNumber && lookup.push(current);
      if (current.type === "panel") {
        // 查看panel的子节点是否需要显示题目号
        current.questions?.forEach((item) => {
          item.showQuestionNumber && lookup.push(item);
        });
      }
      return lookup;
    }, [])
  );

  provide(QUESTION_SEQUENCE_LIST_KEY, surveyQuestionSequence);
};

export const useQuestionIndex = (questionRef) => {
  const surveyQuestionSequence = inject(QUESTION_SEQUENCE_LIST_KEY);
  return computed(() =>
    unref(questionRef).showQuestionNumber
      ? unref(surveyQuestionSequence).findIndex(
          (item) => item.name === unref(questionRef).name
        ) + 1
      : -1
  );
};
