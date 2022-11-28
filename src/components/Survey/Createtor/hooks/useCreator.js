import getQuestionDefaultConfig from "../util/questionDefaultConfig";
import { ref, computed, unref } from "vue";
import objectPath from "object-path";
const useCreator = () => {
  const surveyQuestions = ref([]);
  const questionModel = objectPath(surveyQuestions.value);

  const surveyQuestionsNameSet = new Set();

  const surveyQuestionSequence = computed(() =>
    unref(surveyQuestions).filter((item) => item.showQuestionNumber)
  );

  const surveyDef = ref({
    title: "",
    description: "",
    questions: surveyQuestions,
  });

  const currentActiveItem = ref();
  const currentActivePath = ref();

  const creator = {
    onQuestionItemClick: (questionPath) => {
      if (!questionModel.has(questionPath)) return;
      currentActivePath.value = questionPath;
      currentActiveItem.value = questionModel.get(questionPath);
    },
    updateSurveyTitle: (title) => {
      surveyDef.value.title = title || "";
    },
    updateSurveyDescription: (description) => {
      surveyDef.value.description = description || "";
    },
    updateQuestionNameFieldValue: (path, newQuestionName, cb) => {
      const questionNamePath = `${path}.name`;
      const oldQuestionName = questionModel.get(questionNamePath);
      if (oldQuestionName && !surveyQuestionsNameSet.has(newQuestionName)) {
        questionModel.set(questionNamePath, newQuestionName);
        surveyQuestionsNameSet.delete(oldQuestionName);
        surveyQuestionsNameSet.add(newQuestionName);
        return cb("success");
      }
      return cb("fail");
    },
    updateQuestionFieldValueByPath: (path, value) => {
      console.log("update path value--------->", path, "-------->", value);
      questionModel.set(path, value);
    },
    getNewQuestionName: () => {
      let startIndex = unref(surveyQuestions).length;
      const getNew = () => {
        return `question${++startIndex}`;
      };
      let questionName = null;
      while (!questionName) {
        const temp = getNew();
        if (!surveyQuestionsNameSet.has(temp)) questionName = temp;
      }
      return questionName;
    },
    addQuestion: (questionType, insertPath) => {
      console.log("add question ------>", questionType);
      const newQuesName = creator.getNewQuestionName();
      const defaultConfig = getQuestionDefaultConfig(questionType) || {};
      const questionJSON = {
        title: newQuesName,
        type: questionType,
        name: newQuesName,
        ...defaultConfig,
      };
      questionModel.push(insertPath, questionJSON);
      surveyQuestionsNameSet.add(newQuesName);
    },
    removeItem: (removeItemPath) => {
      console.log("remove item path -------------->", removeItemPath);
      questionModel.del(removeItemPath);
    },
    // choice
    addQuestionChoice: (questionPath) => {
      console.log("add choice ------------>", questionPath);
      const newChoice = creator.generateNewChoice(questionPath);
      questionModel.push(`${questionPath}.choices`, newChoice);
    },
    updateChoiceItemValue: (questionPath, choiceIndex, newValue) => {
      if (!newValue) return;
      const choicesPath = `${questionPath}.choices`;
      const choices = questionModel.get(choicesPath);
      if (!choices.length) return;
      const isDuplicate =
        choices.findIndex((choice) => choice.value === newValue) !== -1;
      if (isDuplicate) return;
      questionModel.set(`${choicesPath}.${choiceIndex}.value`, newValue);
    },
    removeQuestionChoice: (questionPath, choiceIndex) => {
      questionModel.del(`${questionPath}.choices.${choiceIndex}`);
    },
    generateNewChoice: (questionPath) => {
      const questionChoices =
        questionModel.get(`${questionPath}.choices`) || [];
      const choicesValueSet = new Set(
        questionChoices.map((choice) => choice.value)
      );
      let startIndex = questionChoices.length;
      let newValue = null;
      while (!newValue) {
        const temp = `item${++startIndex}`;
        if (!unref(choicesValueSet).has(temp)) newValue = temp;
      }
      return {
        text: newValue,
        value: newValue,
      };
    },
    survey: surveyDef,
    surveyQuestionSequence,
    currentActiveItem,
    currentActivePath,
    JSON() {
      const { title, description } = unref(surveyDef);
      const questions = unref(surveyQuestions);
      return {
        title,
        description,
        questions,
      };
    },
  };

  return creator;
};

export default useCreator;
