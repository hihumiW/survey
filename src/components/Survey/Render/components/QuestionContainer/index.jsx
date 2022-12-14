import QuestionWrapper from "@survey/components/QuestionWrapper";
import QuestionLayout from "@survey/components/QuestionLayout/index.vue";
import QuestionTitle from "@survey/components/QuestionLayout/QuestionTitle.jsx";

const QuestionContainer = (props, { slots }) => {
  const { question, questionIndex } = props;
  return (
    <QuestionWrapper questionIndent={props.question.indent}>
      <QuestionLayout question={question}>
        {{
          title: () => (
            <QuestionTitle
              hideTitleWhenEmpty
              question={question}
              questionIndex={questionIndex}
            />
          ),
          default: () => slots.default(),
        }}
      </QuestionLayout>
    </QuestionWrapper>
  );
};

QuestionContainer.props = {
  question: {
    type: Object,
    required: true,
  },
  questionIndex: {
    type: Number,
  },
};

export default QuestionContainer;
