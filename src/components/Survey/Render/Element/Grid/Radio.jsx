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
  const onRadioClick = (e) => {
    const targetValue = e.target.value;
    props["onUpdate:value"](targetValue === value ? null : targetValue);
  };
  return (
    <div class={`flex flex-wrap gap-3 ${orientation || "horizontal"} `}>
      <RadioOptions
        choices={renderChoices}
        radioValue={value}
        disabled={disabled}
        onRadioClick={onRadioClick}
      />
      {showOtherItem && (
        <RadioOptionWithInput
          disabled={disabled}
          selectValue={value}
          otherText={otherText}
          otherPlaceholder={otherPlaceholder}
          otherTextValue={otherTextValue}
          onTextValueChange={onOtherTextValueChange}
          onRadioClick={onRadioClick}
        />
      )}
    </div>
  );
};

const RadioOptions = (props) => {
  const { choices, radioValue, disabled, onRadioClick } = props;
  if (!choices?.length) {
    return <p>no available option</p>;
  }
  return (
    <Fragment>
      {choices.map(({ value, text }) => {
        return (
          <NRadio
            value={value}
            key={value}
            disabled={disabled}
            checked={value === radioValue}
            onClick={onRadioClick}
          >
            {text}
          </NRadio>
        );
      })}
    </Fragment>
  );
};

const RadioOptionWithInput = defineComponent({
  emits: ["textValueChange", "radioClick"],
  props: [
    "disabled",
    "otherText",
    "otherPlaceholder",
    "otherTextValue",
    "selectValue",
  ],
  setup(props, { emit }) {
    const { disabled } = props;
    const { showOther, inputValue } = useOtherText(props, emit);

    return () => {
      const inputDisabled = props.disabled || !unref(showOther);
      const { otherText, otherPlaceholder, selectValue } = props;
      return (
        <div className="survey-grid-checkbox-other">
          <NRadio
            disabled={disabled}
            value={otherOptionDefaultValue}
            checked={otherOptionDefaultValue === selectValue}
            onClick={(e) => emit("radioClick", e)}
          >
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
