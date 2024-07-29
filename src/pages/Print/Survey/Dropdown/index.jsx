import { otherOptionDefaultValue } from "@survey/Render/Element/Select";
import { Fragment } from "vue";

const Dropdown = (props) => {
  const { choices, value, showOtherItem, otherText, otherTextValue } = props;
  if (showOtherItem && value === otherOptionDefaultValue) {
    return (
      <Fragment>
        {otherText}
        <span className="underline ml-1">{otherTextValue}</span>
      </Fragment>
    );
  }
  return choices?.find((i) => i.value === value)?.text;
};

export default Dropdown;
