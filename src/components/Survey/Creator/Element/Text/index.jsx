import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import QuestionContainer from "@survey/Creator/components/QuestionContainer/index.vue";

import {
  getInputProps,
  getRenderInput,
  getInputVariantClassName,
} from "@survey/hooks/Element/Text";
const Text = (props) => {
  const {
    question: { inputVariant, inputType },
  } = props;

  const InputProps = {
    ...getInputProps(props.question),
    readonly: true,
    clearable: false,
    disabled: true,
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
