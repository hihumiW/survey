import getQuestionDefaultConfig, { getItem } from "./questionDefaultConfig";
import { ref, unref, provide, inject } from "vue";
import objectPath from "object-path";

window.objectPath = objectPath;

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

  //当前用户选中的题目：对应question 或者 表格单元格的对象；
  const currentActiveItem = ref();
  //当前用户选中的题目类型；或者未表格单元格的类型；
  const currentActiveItemType = ref();
  // 当前用户选中的题目的对象在配置中的路径；
  const currentActivePath = ref();

  const creator = {
    getModelV: (path) => questionModel.get(path),
    /**
     * 当点击题目或者表格的单元格的容器时触发的事件
     * @param {string} questionPath question的对象路径，这个值将作为边框高亮的判断
     * @param {string} questionType question的type；默认情况下question会包含type；当点击表格的单元格时，并没有type属性，所以需要单独传入；
     */
    onQuestionItemClick: (questionPath, questionType) => {
      const item = creator.getModelV(questionPath);
      if (!item) return;
      currentActivePath.value = questionPath;
      currentActiveItem.value = item;
      currentActiveItemType.value = questionType || item.type;
    },
    /**
     * 更改问卷的标题
     * @param {string} title
     */
    updateSurveyTitle: (title) => {
      surveyDef.value.title = title || "";
    },
    /**
     * 更改问卷的描述信息
     * @param {string} description
     */
    updateSurveyDescription: (description) => {
      surveyDef.value.description = description || "";
    },
    /**
     * 更新question的name；name需要保证唯一；
     * @param {string} path 要修改question的path；
     * @param {string} newQuestionName 修改后的value值
     * @param {("success" | "fail") => void} cb 修改成功/失败后 的回调函数
     */
    updateQuestionNameFieldValue: (path, newQuestionName, cb) => {
      const questionNamePath = `${path}.name`;
      const oldQuestionName = creator.getModelV(questionNamePath);
      if (oldQuestionName && !surveyQuestionsNameSet.has(newQuestionName)) {
        questionModel.set(questionNamePath, newQuestionName);
        surveyQuestionsNameSet.delete(oldQuestionName);
        surveyQuestionsNameSet.add(newQuestionName);
        return cb("success");
      }
      return cb("fail");
    },
    /**
     * 更新question的字段值（可以整个问卷的任意参数，只要你的path正确）
     * @param {string} path 更新的path（需要包含字段名）
     * @param {any} value  更新的值
     */
    updateQuestionFieldValueByPath: (path, value) => {
      console.log("update path value--------->", path, "-------->", value);
      questionModel.set(path, value);
    },
    /**
     * 生成一个绑定了字段的修改函数；
     * @param {MaybeyRef<string>} bindFieldRef
     * @returns (value :any ) =>  void
     */
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
    addNewItem: (itemsPath, itemNameTemplate, itemGenerator, getItemKey) => {
      const newItem = creator.generateNewItem(
        itemsPath,
        itemNameTemplate,
        itemGenerator,
        getItemKey
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
      const items = creator.getModelV(itemsPath);
      if (!items.length) return;
      const isDuplicate =
        items.findIndex((item) => item.value === newValue) !== -1;
      if (isDuplicate) return;
      const oldValue = items[itemIndex].value;
      questionModel.set(`${itemsPath}.${itemIndex}.value`, newValue);
      cb && cb(oldValue, items[itemIndex].value);
    },
    generateNewItem: (
      itemsPath,
      itemNameTemplate,
      itemGenerator = getItem,
      getItemKey = (i) => i.value
    ) => {
      const items = creator.getModelV(`${itemsPath}`) || [];
      const itemValueSet = new Set(items.map(getItemKey));
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
      creator.forEachCellRows(creator.getModelV(cellPath), ({ rowInfo }) => {
        if (prevColumnValue in rowInfo) {
          rowInfo[nowColumnValue] = rowInfo[prevColumnValue];
          delete rowInfo[prevColumnValue];
        }
      });
    },
    syncCellColumnPathRemove: (cellPath, removeColumnValue) => {
      creator.forEachCellRows(creator.getModelV(cellPath), ({ rowInfo }) => {
        if (removeColumnValue in rowInfo) {
          delete rowInfo[removeColumnValue];
        }
      });
    },
    syncCellRowPathRemove: (cellPath, removeRowValue) => {
      const cells = creator.getModelV(cellPath);
      if (removeRowValue in cells) {
        delete cells[removeRowValue];
      }
    },
    survey: surveyDef,
    surveyQuestions,
    currentActiveItem,
    currentActivePath,
    currentActiveItemType,
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
