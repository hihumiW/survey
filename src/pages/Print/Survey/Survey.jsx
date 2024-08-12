import { defineComponent, onMounted, ref, unref } from "vue";
import Layout from "./Layout";
import { useQuestionSequenceInit } from "@survey/hooks/useQuestionIndex";
import useProvinceCity from "@/hooks/useProvinceCity";
import questionTypeEnum from "@survey/types/questionTypeEnum";
import { getOtherTextValueFieldName } from "@survey/Render/Element/Select";

import Grid from "./Grid/index";
import Checkbox from "./Checkbox";
import Paragraph from "./Paragraph";
import Text from "./Text";
import Dropdown from "./Dropdown";

import Matrix from "./Matrix";
import Panel from "./Panel";

import "./index.css";

// import fakeData from "@/projectCreate.js";
// import fakeValues from "@/projectCreateValue.js";
// import fakeData from "@/projectStart.js";
// import fakeValues from "@/projectStartValue.js";

// window.test = () => {
//   window.loadSurvey(d);
// };
const LoadSurvey = defineComponent({
  setup() {
    const ready = ref(false);
    let SurveyProps = {};
    window.loadSurvey = (props) => {
      if (!props) return;
      SurveyProps = { ...props };
      ready.value = true;
    };
    onMounted(() => {
      if (window.parent) {
        window.parent.postMessage({
          source: "surveyPrintLoaded",
        });
      }
    });
    return () => {
      if (!unref(ready)) return "等待问卷渲染指令";
      return <Survey {...SurveyProps} />;
    };
  },
});

const Survey = defineComponent({
  props: ["survey", "values"],
  setup(props) {
    const { survey, values = {} } = props;
    const { questions = [], formId } = survey || {};
    useQuestionSequenceInit(questions);
    const { isProvinceLoading, provinceError } = useProvinceCity();
    const onPrintClick = () => {
      window.print();
    };
    return () => {
      if (unref(isProvinceLoading)) {
        return "loading...";
      }
      if (unref(provinceError)) {
        return unref(provinceError)?.message || "error";
      }

      return (
        <div className="survey-print">
          <div className="survey-print-notice border border-dashed border-neutral-500 rounded-sm flex justify-between">
            <p className="font-bold">
              打印内容: *实际打印效果以浏览器预览界面为主*
            </p>
            <button className="underline" onClick={onPrintClick}>
              打印
            </button>
          </div>
          <div className="flex flex-col gap-y-2 survey-print-container">
            {questions.map((que, idx) => (
              <Question key={idx} data={que} values={values} formId={formId} />
            ))}
          </div>
        </div>
      );
    };
  },
});

export default LoadSurvey;

export const Question = (props) => {
  const { data, values, formId } = props;
  const { type, name, choices } = data;
  const value = values?.[name];
  switch (type) {
    case questionTypeEnum.grid:
      return (
        <Layout data={data}>
          <Grid data={data} values={values} value={value} formId={formId} />
        </Layout>
      );
    case questionTypeEnum.radiogroup:
    case questionTypeEnum.checkbox:
      return (
        <Layout data={data}>
          <Checkbox
            choices={choices}
            value={value}
            showOtherItem={data.showOtherItem}
            otherText={data.otherText}
            otherTextValue={values?.[getOtherTextValueFieldName(name)]}
          />
        </Layout>
      );
    case questionTypeEnum.paragraph:
      return <Paragraph data={data} />;
    case questionTypeEnum.text:
      const { titleLocation } = data;
      if (titleLocation === "left") {
        return (
          <div className="flex items-center">
            <Layout data={data} /> :
            <Text value={value} inputType={data.inputType} />
          </div>
        );
      }
      return (
        <Layout data={data}>
          <p>
            答:
            <Text value={value} inputType={data.inputType} />
          </p>
        </Layout>
      );
    case questionTypeEnum.dropdown:
      return (
        <Layout data={data}>
          <p>
            答:
            <Dropdown
              choices={choices}
              value={value}
              showOtherItem={data.showOtherItem}
              otherText={data.otherText}
              otherTextValue={values?.[getOtherTextValueFieldName(name)]}
            />
          </p>
        </Layout>
      );
    case questionTypeEnum.matrixradio:
    case questionTypeEnum.matrixcheckbox:
    case questionTypeEnum.matrixdropdown:
    case questionTypeEnum.matrixDropdownColumn:
    case questionTypeEnum.matrixinput:
      return (
        <Layout data={data}>
          <Matrix data={data} value={value} />
        </Layout>
      );
    case questionTypeEnum.panel:
      return (
        <Layout data={data}>
          <Panel data={data} values={values} />
        </Layout>
      );
    default:
      return <p>不支持的打印类型</p>;
  }
};
