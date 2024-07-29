import { defineComponent } from "vue";
import { otherOptionDefaultValue } from "@survey/Render/Element/Select";

const Checkbox = defineComponent({
  props: ["choices", "value", "showOtherItem", "otherText", "otherTextValue"],
  setup(props) {
    const { choices, value, showOtherItem, otherText, otherTextValue } = props;
    const val = Array.isArray(value) ? value : [value];
    return () => {
      return (
        <div className="flex gap-x-2 flex-wrap">
          {choices.map((choice) => {
            return (
              <div className="flex items-center gap-x-1">
                <Check checked={val.includes(choice.value)} />
                {choice.text}
              </div>
            );
          })}
          {showOtherItem && (
            <div className="flex items-center gap-x-1">
              <Check checked={val.includes(otherOptionDefaultValue)} />
              {otherText}
              <span className="underline">{otherTextValue}</span>
            </div>
          )}
        </div>
      );
    };
  },
});

export default Checkbox;

const Check = (props) => {
  return (
    <div className="w-3 h-3 border-solid border-black border flex items-center justify-center box-border p-0.5">
      {props.checked && <div className="w-full h-full bg-black" />}
    </div>
  );
};
