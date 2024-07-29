import { defineComponent, unref } from "vue";
import { NRadioGroup, NRadio } from "naive-ui";
import useOtherText from "./useOtherText";
import { otherOptionDefaultValue } from "@survey/Render/Element/Select";

const Radio = (props) => {
  const {
    cellConfig,
    value,
    disabled,
    otherTextValue,
    onOtherTextValueChange,
    externalOptions,
  } = props;

  const {
    choices,
    showOtherItem,
    otherText,
    otherPlaceholder,
    orientation,
    enableExternalLoadOptions,
    externalLoadOptionsName,
  } = cellConfig || {};
  const renderChoices =
    (enableExternalLoadOptions
      ? externalOptions?.[externalLoadOptionsName || "options"]
      : choices) || [];

  return (
    <NRadioGroup
      value={value}
      class={`survey-grid-radio-group ${orientation || "horizontal"}`}
      onUpdate:value={props["onUpdate:value"]}
      disabled={disabled}
    >
      <RadioOptions choices={renderChoices} />
      {showOtherItem && (
        <RadioOptionWithInput
          disabled={disabled}
          selectValue={value}
          otherText={otherText}
          otherPlaceholder={otherPlaceholder}
          otherTextValue={otherTextValue}
          onTextValueChange={onOtherTextValueChange}
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

const RadioOptionWithInput = defineComponent({
  emits: ["textValueChange"],
  props: [
    "disabled",
    "otherText",
    "otherPlaceholder",
    "otherTextValue",
    "selectValue",
  ],
  setup(props, { emit }) {
    const { showOther, inputValue } = useOtherText(props, emit);

    return () => {
      const inputDisabled = props.disabled || !unref(showOther);
      const { otherText, otherPlaceholder } = props;
      return (
        <div className="survey-grid-checkbox-other">
          <NRadio value={otherOptionDefaultValue}>
            {otherText || "Other (describe)"}
          </NRadio>
          <div className="other-input-wrapper">
            <input
              disabled={inputDisabled}
              className="survey-grid-radio-other-text"
              v-model={inputValue.value}
              placeholder={otherPlaceholder}
            />
          </div>
        </div>
      );
    };
  },
});

export default Radio;
