import questionCommonProps from "../types/questionCommonProps";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";
import SingleText from "./Text/SingleText";
import Select from "./Select";
import Panel from "./Panel";
import Matrix from "./Grid/Matrix";
import Grid from "./Grid";

const SurveyRenderElementDispatch = (props) => {
  return props.questions.map((question) => (
    <SurveyElement
      key={question.name}
      question={question}
      values={props.values}
      errors={props.errors}
      touched={props.touched}
      readOnly={props.readOnly}
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
  touched: {
    type: Object,
  },
  errors: {
    type: Object,
  },
  readOnly: {
    type: Boolean,
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
    case QuestionTypeEnum.matrixradio:
    case QuestionTypeEnum.matrixcheckbox:
    case QuestionTypeEnum.matrixdropdown:
    case QuestionTypeEnum.matrixinput:
      return <Matrix {...props} />;
    case QuestionTypeEnum.grid:
      return <Grid {...props} />;
    default:
      return null;
  }
};

SurveyElement.props = questionCommonProps;

export default SurveyRenderElementDispatch;
