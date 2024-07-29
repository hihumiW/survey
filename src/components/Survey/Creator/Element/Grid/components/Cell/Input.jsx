import cellProps from "./cellProps";
import { getInputProps, getRenderInput } from "@survey/hooks/Element/Text";
const Input = (props) => {
  const { cellConfig } = props;
  const { inputType } = cellConfig;
  const InputProps = {
    ...getInputProps(cellConfig),
    readonly: true,
    clearable: false,
    disabled: true,
  };

  const Input = getRenderInput(inputType);

  return <Input class="text-left" {...InputProps} />;
};

Input.props = cellProps;
export default Input;
