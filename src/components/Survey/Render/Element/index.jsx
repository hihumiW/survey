import questionCommonProps from "../types/questionCommonProps";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";
import { NEmpty } from "naive-ui";
import SingleText from "./Text/SingleText";
import Select from "./Select";
import Panel from "./Panel";

const SurveyRenderElementDispatch = (props) => {
  return props.questions.map((question) => (
    <SurveyElement
      key={question.name}
      question={question}
      values={props.values}
    />
  ));
};

SurveyRenderElementDispatch.props = {
  questions: {
    type: Array,
    default: () => [],
  },
  values: {
    type: Object,
    required: true,
  },
};

const SurveyElement = (props) => {
  switch (props.question.type) {
    case QuestionTypeEnum.text:
      return <SingleText {...props} />;
    case QuestionTypeEnum.dropdown:
    case QuestionTypeEnum.radiogroup:
    case QuestionTypeEnum.checkbox:
      return <Select {...props} />;
    case QuestionTypeEnum.panel:
      return <Panel {...props} />;
    default:
      return null;
  }
};

SurveyElement.props = questionCommonProps;

export default SurveyRenderElementDispatch;
