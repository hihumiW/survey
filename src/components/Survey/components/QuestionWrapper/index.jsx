const QuestionWrapper = (props, { slots }) => {
  const { onClick, questionIndent } = props;

  const renderFooter = () => {
    if (!slots.footer) return null;
    return (
      <div class="survey-question-wrapper_footer mt-4">{slots.footer()}</div>
    );
  };

  return (
    <div
      class={["survey-question-wrapper"]}
      onClick={() => onClick && onClick()}
    >
      <div class={["ml-0", "ml-6", "ml-8", "ml-10"][questionIndent]}>
        {slots.default()}
      </div>
      {renderFooter()}
    </div>
  );
};

QuestionWrapper.props = {
  onClick: Function,
  questionIndent: {
    type: Number,
  },
};

export default QuestionWrapper;
