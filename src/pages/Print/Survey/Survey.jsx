import { defineComponent, unref } from "vue";
import Layout from "./Layout";
import temp from "@/result.js";
import { useQuestionSequenceInit } from "@survey/hooks/useQuestionIndex";
import useProvinceCity from "@/hooks/useProvinceCity";
import questionTypeEnum from "@survey/types/questionTypeEnum";
import { getOtherTextValueFieldName } from "@survey/Render/Element/Select";

import Grid from "./Grid/index";
import Checkbox from "./Checkbox";
import Paragraph from "./Paragraph";
import Text from "./Text";
import Dropdown from "./Dropdown";

import values from "@/result2.json";
import Matrix from "./Matrix";
import Panel from "./Panel";

import "./index.css";

console.log(values);

const ques = temp.questions;

const Survey = defineComponent({
  setup() {
    useQuestionSequenceInit(ques);
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
            {ques.map((que, idx) => (
              <Question key={idx} data={que} values={values} />
            ))}
          </div>
        </div>
      );
    };
  },
});

export default Survey;

export const Question = (props) => {
  const { data, values } = props;
  const { type, name, choices } = data;
  const value = values?.[name];
  switch (type) {
    case questionTypeEnum.grid:
      return (
        <Layout data={data}>
          <Grid data={data} value={value} />
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
