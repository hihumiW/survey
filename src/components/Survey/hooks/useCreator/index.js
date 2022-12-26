import { ref, unref, provide, inject } from "vue";
import objectPath from "object-path";
import getQuestionDefaultConfig, { getItem } from "./questionDefaultConfig";
import questionTypeEnum from "../../types/questionTypeEnum";
import { cloneDeep } from "lodash-es";

export const CREATOR_KEY = Symbol("creator");

const useCreator = (defaultData = {}) => {
  const surveyQuestions = defaultData.questions
    ? ref(cloneDeep(defaultData.questions))
    : ref([]);
  const questionModel = objectPath(surveyQuestions.value);
  const surveyQuestionsNameSet = new Set();

  const showSideBar = ref(true);

  const surveyDef = ref({
    title: defaultData.title,
    description: defaultData.description,
    formId: defaultData.formId,
    categoryId: defaultData.categoryId,
    questions: surveyQuestions,
  });

  //当前用户选中的题目：对应question 或者 表格单元格的对象；
  const currentActiveItem = ref();
  //当前用户选中的题目类型；或者未表格单元格的类型；
  const currentActiveItemType = ref();
  // 当前用户选中的题目的对象在配置中的路径；
  const currentActivePath = ref();

  const sideBarExpandedName = ref("");

  const creator = {
    getModelV: (path) => questionModel.get(path),
    /**
     * 当点击题目或者表格的单元格的容器时触发的事件
     * @param {string} questionPath question的对象路径，这个值将作为边框高亮的判断
     * @param {string} questionType question的type；默认情况下question会包含type；当点击表格的单元格时，并没有type属性，所以需要单独传入；
     */
    onQuestionItemClick: (questionPath, questionType) => {
      const item = creator.getModelV(questionPath);
      if (!item && questionType !== questionTypeEnum.gridCell) return;
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
    updateSurveyFormType: (id) => {
      surveyDef.value.categoryId = id;
    },
    /**
     * 更新question的name；name需要保证唯一；
     * @param {string} path 要修改question的path；
     * @param {string} newQuestionName 修改后的value值
     * @param {("success" | "fail") => void} cb 修改成功/失败后 的回调函数
     */
    updateQuestionNameFieldValue: (path, newQuestionName, cb) => {
      if (!newQuestionName) return cb("fail");
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
      let startIndex = unref(surveyQuestions).filter(
        (question) => question.type !== questionTypeEnum.panel
      ).length;
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
    /**
     * 添加一个新的question
     * @param {questionTypeEnum} questionType 要添加的问题的类型
     * @param {string} insertPath 默认情况下新的question都会被插入在question的最后；对于添加在panel下面的question，需要指定insertPath
     */
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
    /**
     * 删除指定path的 值
     * @param {string} removeItemPath
     * @param {string} removeSetName 移除question时需要额外传入question的name；
     */
    removeItem: (removeItemPath, removeSetName) => {
      console.log("remove item path -------------->", removeItemPath);
      if (removeSetName) {
        surveyQuestionsNameSet.delete(removeSetName);
      }
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
    /**
     * 便利cells的行，并将便利到的行作为参数传给rowFn中
     * @param {Cells} cells 需要便利的cell
     * @param {(rowData) => void} rowFn
     * @returns
     */
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
    /**
     * 对于grid类型的题目： 当列的name变化时 cells中对应的列名也应该一起变化
     * @param {string} cells
     * @param {string} prevColumnValue  变化的列，变化前的name值
     * @param {string} nowColumnValue  变化的列， 变化之后的值
     */
    syncCellColumnPathChange: (cells, prevColumnValue, nowColumnValue) => {
      creator.forEachCellRows(cells, ({ rowInfo }) => {
        if (prevColumnValue in rowInfo) {
          rowInfo[nowColumnValue] = rowInfo[prevColumnValue];
          delete rowInfo[prevColumnValue];
        }
      });
    },
    /**
     * 对于grid类型的题目： 当某一列被移除时， cells中对应的列的配置也应该一起被移除
     * @param {string} cells
     * @param {string} removeColumnValue 被移除的列name值
     */
    syncCellColumnPathRemove: (cells, removeColumnValue) => {
      creator.forEachCellRows(cells, ({ rowInfo }) => {
        if (removeColumnValue in rowInfo) {
          delete rowInfo[removeColumnValue];
        }
      });
    },
    /**
     * 对于grid类型的题目： 当某一行移除时，cell中对应的行配置也需要移除
     * @param {string} cells
     * @param {string} removeRowValue 被移除的rowName
     */
    syncCellRowPathRemove: (cells, removeRowValue) => {
      if (!cells) return;
      if (removeRowValue in cells) {
        delete cells[removeRowValue];
      }
    },
    filterCellsEmpty: (cellsPath, cells) => {
      const cellsValue = cells || creator.getModelV(cellsPath);
      if (!cellsValue) return;
      if (Object.keys(cellsValue).length === 0) {
        creator.removeItem(cellsPath);
      }
    },
    filterCellEmptyRows: (cellsPath, cells) => {
      const cellsValue = cells || creator.getModelV(cellsPath);
      creator.forEachCellRows(cellsValue, ({ rowInfo, rowKey }) => {
        if (Object.keys(rowInfo).length === 0) {
          delete cellsValue[rowKey];
        }
      });
    },
    moveItemIndex: (itemsPath, index = -1, direction) => {
      const questions = creator.getModelV(itemsPath);
      if (index === -1 || !questions?.length) return;
      if (direction === "up" && index === 0) return;
      if (direction === "down" && index === questions.length - 1) return;
      const index2 = direction === "up" ? index - 1 : index + 1;
      const temp = questions[index2];
      questions[index2] = questions[index];
      questions[index] = temp;
    },
    moveQuestionIndex: (name, forward, panelPath) => {
      let index = -1;
      let questions = panelPath
        ? creator.getModelV(`${panelPath}.questions`)
        : surveyQuestions.value;
      if (!questions) return;
      index = questions.findIndex((question) => question.name === name);
      if (index === -1) return;
      if (forward === "up" && index === 0) return;
      if (forward === "down" && index === questions.length - 1) return;
      const index2 = forward === "up" ? index - 1 : index + 1;
      const temp = questions[index2];
      questions[index2] = questions[index];
      questions[index] = temp;
    },
    survey: surveyDef,
    surveyQuestions,
    currentActiveItem,
    currentActivePath,
    currentActiveItemType,
    sideBarExpandedName,
    showSideBar,
    toggleSideBarShow: () => {
      showSideBar.value = !showSideBar.value;
    },
    updateSideBarExpandedName: ([value]) => {
      sideBarExpandedName.value = value;
    },
    JSON() {
      const { title, description, categoryId, formId } = unref(surveyDef);
      const questions = unref(surveyQuestions);
      const json = {
        title,
        description,
        questions,
        categoryId,
      };
      if (formId) {
        json.formId = formId;
      }
      return json;
    },
  };

  provide("creator", creator);

  return creator;
};

export default useCreator;

export const useInjectCreator = () => inject("creator", () => ({}));
