import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import QuestionContainer from "@survey/Creator/components/QuestionContainer/index.vue";

import {
  getPlaceholder,
  getRenderInput,
  getInputVariantClassName,
} from "@survey/hooks/Element/Text";
const Text = (props) => {
  const {
    question: { inputVariant, inputType, placeholder },
  } = props;

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
      class={getInputVariantClassName(inputVariant)}
    >
      <Input {...InputProps} />
    </QuestionContainer>
  );
};

Text.props = questionCommonProps;

export default Text;
