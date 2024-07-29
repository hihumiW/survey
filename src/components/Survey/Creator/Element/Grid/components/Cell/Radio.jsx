import { NRadio, NRadioGroup } from "naive-ui";
import { Fragment } from "vue";
import cellProps from "./cellProps";

const Radio = (props) => {
  const { cellConfig } = props;
  const {
    choices = [],
    showOtherItem,
    otherText,
    orientation,
    otherPlaceholder,
    enableExternalLoadOptions,
    externalLoadOptionsName,
  } = cellConfig || {};
  if (enableExternalLoadOptions) {
    return (
      <p className="text-orange-400 break-all italic">
        ** (单选)选项通过外部加载（加载字段名：{externalLoadOptionsName}) **
      </p>
    );
  }
  return (
    <NRadioGroup
      class={`survey-grid-radio-group ${orientation || "horizontal"}`}
      value={""}
    >
      <RadioOptions choices={choices} />
      {showOtherItem && (
        <RadioOptionWithInput
          otherText={otherText}
          otherPlaceholder={otherPlaceholder}
        />
      )}
    </NRadioGroup>
  );
};

const RadioOptions = (props) => {
  const { choices } = props;
  if (!choices?.length) {
    return <p>no available option</p>;
  }
  return (
    <Fragment>
      {choices.map(({ value, text }) => {
        return (
          <NRadio value={value} key={value}>
            {text}
          </NRadio>
        );
      })}
    </Fragment>
  );
};

const RadioOptionWithInput = (props) => {
  const { otherText, otherPlaceholder } = props;
  return (
    <div className="survey-grid-radio-other">
      <NRadio value="__other">{otherText || "Other (describe)"}</NRadio>
      <div className="other-input-wrapper disabled">
        <input
          readOnly
          className="survey-grid-radio-other-text"
          placeholder={otherPlaceholder}
        />
      </div>
    </div>
  );
};

Radio.props = cellProps;

export default Radio;
