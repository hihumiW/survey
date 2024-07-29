import { NCheckboxGroup, NCheckbox, NInput } from "naive-ui";
import { otherOptionDefaultValue } from "@survey/Render/Element/Select";
import { defineComponent, computed, unref, watch } from "vue";

const Checkbox = (props) => {
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
    <NCheckboxGroup
      value={value}
      class={`survey-grid-checkbox-group ${orientation || "horizontal"}`}
      onUpdate:checked={props["onUpdate:value"]}
      disabled={disabled}
    >
      <CheckboxOptions choices={renderChoices} />
      {showOtherItem && (
        <CheckboxOptionWithInput
          disabled={disabled}
          selectValue={value}
          otherText={otherText}
          otherPlaceholder={otherPlaceholder}
          otherTextValue={otherTextValue}
          onTextValueChange={onOtherTextValueChange}
        />
      )}
    </NCheckboxGroup>
  );
};

export default Checkbox;

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

const CheckboxOptionWithInput = defineComponent({
  emits: ["textValueChange"],
  props: [
    "disabled",
    "otherText",
    "otherPlaceholder",
    "otherTextValue",
    "selectValue",
  ],
  setup(props, { emit }) {
    const { otherText, otherPlaceholder } = props;
    const showOther = computed(() => {
      const val = props.selectValue;
      if (Array.isArray(val)) {
        return val.includes(otherOptionDefaultValue);
      }
      return val === otherOptionDefaultValue;
    });

    const inputValue = computed({
      get() {
        return props.otherTextValue || "";
      },
      set(val) {
        emit("textValueChange", val);
      },
    });

    watch(showOther, (val) => {
      if (!val) inputValue.value = "";
    });

    return () => {
      const inputDisabled = props.disabled || !unref(showOther);
      return (
        <div className="survey-grid-checkbox-other">
          <NCheckbox value={otherOptionDefaultValue}>
            {otherText || "Other (describe)"}
          </NCheckbox>
          <div className="other-input-wrapper">
            <input
              disabled={inputDisabled}
              className="survey-grid-checkbox-other-text"
              value={unref(inputValue)}
              onInput={(e) => {
                inputValue.value = e.target.value;
              }}
              placeholder={otherPlaceholder}
            />
          </div>
        </div>
      );
    };
  },
});
