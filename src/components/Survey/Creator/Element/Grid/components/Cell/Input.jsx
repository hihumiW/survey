import cellProps from "./cellProps";
import { getPlaceholder, getRenderInput } from "@survey/hooks/Element/Text";
const Input = (props) => {
  const { cellConfig } = props;
  const { inputType, placeholder } = cellConfig;
  const InputProps = {
    size: "large",
    disabled: true,
    placeholder: getPlaceholder(inputType, placeholder),
  };

  const Input = getRenderInput(inputType);

  return <Input class="text-left" {...InputProps} />;
};

Input.props = cellProps;
export default Input;
