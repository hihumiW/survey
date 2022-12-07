import questionCommonProps from "@survey/util/questionCommonProps";
import QuestionContainer from "@survey/components/QuestionContainer/index.vue";

import { getPlaceholder, getRenderInput } from "@survey/hooks/Element/Text";
const Text = (props) => {
  const {
    question: { inputVariant, inputType, placeholder },
  } = props;
  const isStandardVariant = inputVariant === "standard";

  const InputProps = {
    size: "large",
    disabled: true,
    placeholder: getPlaceholder(inputType, placeholder),
  };

  const Input = getRenderInput(inputType);

  return (
    <QuestionContainer
      {...props}
      editable
      class={["survey-question_text", isStandardVariant && "variant-standard"]}
    >
      <Input {...InputProps} />
    </QuestionContainer>
  );
};

Text.props = questionCommonProps;

export default Text;
