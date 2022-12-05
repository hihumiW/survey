import getQuestionDefaultConfig, { getItem } from "./questionDefaultConfig";
import { ref, unref, provide, inject } from "vue";
import objectPath from "object-path";

export const CREATOR_KEY = Symbol("creator");

const useCreator = (surveyQuestionsRef) => {
  const surveyQuestions = surveyQuestionsRef || ref([]);
  const questionModel = objectPath(surveyQuestions.value);

  const surveyQuestionsNameSet = new Set();

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
    generateFieldPathBinder: (bindFieldRef) => (value) => {
      creator.updateQuestionFieldValueByPath(unref(bindFieldRef), value);
    },
    getNewQuestionName: (questionType) => {
      const questionBaseName = questionType === "panel" ? "panel" : "question";
      let startIndex = unref(surveyQuestions).length;
      const getNew = () => {
        return `${questionBaseName}${++startIndex}`;
      };
      let questionName = null;
      while (!questionName) {
        const temp = getNew();
        if (!surveyQuestionsNameSet.has(temp)) questionName = temp;
      }
      return questionName;
    },
    addQuestion: (questionType, insertPath) => {
      const newQuesName = creator.getNewQuestionName(questionType);
      const defaultConfig =
        getQuestionDefaultConfig(questionType, !!insertPath) || {};
      const questionJSON = {
        title: newQuesName,
        type: questionType,
        name: newQuesName,
        ...defaultConfig,
      };
      questionModel.push(insertPath, questionJSON);
      surveyQuestionsNameSet.add(newQuesName);
    },
    addNewItem: (itemsPath, itemNameTemplate, itemGenerator) => {
      const newItem = creator.generateNewItem(
        itemsPath,
        itemNameTemplate,
        itemGenerator
      );
      console.log(
        "add new item ------------>",
        itemsPath,
        "-------->",
        newItem
      );
      questionModel.push(itemsPath, newItem);
    },
    removeItem: (removeItemPath) => {
      console.log("remove item path -------------->", removeItemPath);
      questionModel.del(removeItemPath);
    },
    updateItemValue: (itemsPath, itemIndex, newValue, cb) => {
      if (!newValue) return;
      const items = questionModel.get(itemsPath);
      if (!items.length) return;
      const isDuplicate =
        items.findIndex((item) => item.value === newValue) !== -1;
      if (isDuplicate) return;
      const oldValue = items[itemIndex].value;
      questionModel.set(`${itemsPath}.${itemIndex}.value`, newValue);
      cb && cb(oldValue, items[itemIndex].value);
    },
    generateNewItem: (itemsPath, itemNameTemplate, itemGenerator = getItem) => {
      const items = questionModel.get(`${itemsPath}`) || [];
      const itemValueSet = new Set(items.map((i) => i.value));
      let startIndex = items.length;
      let newValue = null;
      while (!newValue) {
        const temp = `${itemNameTemplate}${++startIndex}`;
        if (!itemValueSet.has(temp)) newValue = temp;
      }
      return itemGenerator(newValue);
    },
    forEachCellRows: (cells, rowFn) => {
      if (!cells) return;
      for (const rowKey in cells) {
        if (Object.hasOwnProperty.call(cells, rowKey)) {
          const rowInfo = cells[rowKey];
          if (!rowInfo) continue;
          rowFn **
            rowFn({
              rowKey,
              rowInfo,
            });
        }
      }
    },
    syncCellColumnPathChange: (cellPath, prevColumnValue, nowColumnValue) => {
      creator.forEachCellRows(questionModel.get(cellPath), ({ rowInfo }) => {
        if (prevColumnValue in rowInfo) {
          rowInfo[nowColumnValue] = rowInfo[prevColumnValue];
          delete rowInfo[prevColumnValue];
        }
      });
    },
    syncCellColumnPathRemove: (cellPath, removeColumnValue) => {
      creator.forEachCellRows(questionModel.get(cellPath), ({ rowInfo }) => {
        if (removeColumnValue in rowInfo) {
          delete rowInfo[removeColumnValue];
        }
      });
    },
    survey: surveyDef,
    surveyQuestions,
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

  provide("creator", creator);

  return creator;
};

export default useCreator;

export const useInjectCreator = () => inject("creator", () => ({}));
