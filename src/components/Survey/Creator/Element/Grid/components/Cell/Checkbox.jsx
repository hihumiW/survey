import { NCheckbox, NCheckboxGroup } from "naive-ui";
import { Fragment } from "vue";
import cellProps from "./cellProps";

const Checkbox = (props) => {
  const { cellConfig } = props;
  const {
    choices = [],
    showOtherItem,
    otherText,
    orientation,
    otherPlaceholder,
  } = cellConfig || {};
  return (
    <NCheckboxGroup
      class={`survey-grid-checkbox-group ${orientation || "horizontal"}`}
      value={[]}
    >
      <CheckboxOptions choices={choices} />
      {showOtherItem && (
        <CheckboxOptionWithInput
          otherText={otherText}
          otherPlaceholder={otherPlaceholder}
        />
      )}
    </NCheckboxGroup>
  );
};

const CheckboxOptions = (props) => {
  const { choices } = props;
  if (!choices?.length) {
    return <p>no available option</p>;
  }
  return (
    <Fragment>
      {choices.map(({ value, text }) => {
        return (
          <NCheckbox value={value} key={value}>
            {text}
          </NCheckbox>
        );
      })}
    </Fragment>
  );
};

const CheckboxOptionWithInput = (props) => {
  const { otherText, otherPlaceholder } = props;
  return (
    <div className="survey-grid-checkbox-other">
      <NCheckbox value="__other">{otherText || "Other (describe)"}</NCheckbox>
      <div className="other-input-wrapper disabled">
        <input
          readOnly
          className="survey-grid-checkbox-other-text"
          placeholder={otherPlaceholder}
        />
      </div>
    </div>
  );
};

Checkbox.props = cellProps;

export default Checkbox;
