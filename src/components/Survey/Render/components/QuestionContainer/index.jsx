import QuestionWrapper from "@survey/components/QuestionWrapper";
import QuestionLayout from "@survey/components/QuestionLayout/index.vue";
import QuestionTitle from "@survey/components/QuestionLayout/QuestionTitle.jsx";
import { unref } from "vue";
const QuestionContainer = (props, { slots }) => {
  const { question, questionIndex, touched, errors } = props;
  const { name } = question;
  const errorMsg = unref(errors)?.[name];

  const showError = unref(touched)?.[name] && !!errorMsg;
  console.log(showError, "showError");
  return (
    <QuestionWrapper questionIndent={props.question.indent}>
      <QuestionLayout question={question}>
        {{
          title: () => (
            <QuestionTitle
              hideTitleWhenEmpty
              question={question}
              questionIndex={questionIndex}
              showError
            />
          ),
          default: () => slots.default(),
          footer: () =>
            showError ? <p class="text-red-500">{errorMsg}</p> : null,
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
  touched: {
    type: Object,
  },
  errors: {
    type: Object,
  },
};

export default QuestionContainer;
