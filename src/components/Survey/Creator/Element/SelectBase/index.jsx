import { defineComponent, toRef } from "vue";
import { NInput, NRadioGroup, NCheckboxGroup, NSelect } from "naive-ui";

import QuestionContainer from "@survey/Creator/components/QuestionContainer/index.vue";
import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import OptionItem from "./OptionItem.vue";

import { useInjectCreator } from "@survey/hooks/useCreator";
import useChoices from "@survey/Creator/hooks/useChoices";

const SelectBase = defineComponent({
  props: questionCommonProps,
  name: "SelectBase",
  setup(props) {
    const { updateQuestionFieldValueByPath } = useInjectCreator();

    const getIsInline = () => props.question.orientation === "horizontal";

    const { handleTitleChange, handleItemRemove, handleItemAdd } = useChoices(
      toRef(props, "path")
    );

    const getOhterOptionText = () =>
      props.question.otherText || "Other (describe)";

    const handleOtherTitleChange = (_index, title) =>
      updateQuestionFieldValueByPath(`${props.path}.otherText`, title);
    const handleOtherChoiceRemove = (_index) =>
      updateQuestionFieldValueByPath(`${props.path}.showOtherItem`, false);

    const renderOptions = () => {
      const Container =
        props.question.type === "checkbox" ? NCheckboxGroup : NRadioGroup;

      return (
        <Container size="large" disabled class="w-full">
          <div
            class={[
              "survey-question-select-options-container",
              getIsInline() && "inline",
            ]}
          >
            {props.question.choices.map((choice, index) => (
              <OptionItem
                type="edit"
                key={choice.value}
                chioceText={choice.text}
                chioceIndex={index}
                questionType={props.question.type}
                onTitleChange={handleTitleChange}
                onRemove={handleItemRemove}
              />
            ))}
            <OptionItem
              type="add"
              chioceText="新增选项"
              questionType={props.question.type}
              onAddItem={handleItemAdd}
            />
          </div>

          {props.question.showOtherItem && (
            <div class="mt-6">
              <OptionItem
                type="edit"
                chioceText={getOhterOptionText()}
                chioceIndex={-1}
                questionType={props.question.type}
                onTitleChange={handleOtherTitleChange}
                onRemove={handleOtherChoiceRemove}
              />
              <NInput
                class="survey-question-select-otherText indent"
                disabled
                resizable={false}
                type="textarea"
                placeholder={props.question.otherPlaceholder || ""}
              />
            </div>
          )}
        </Container>
      );
    };

    const renderSelect = () => {
      if (props.question.type !== "dropdown") return null;
      const selectPlaceholder = props.question.dropdownPlaceholder;
      return <NSelect placeholder={selectPlaceholder} disabled size="large" />;
    };

    return () => {
      const { question } = props;
      const { type } = question;
      const isDropDown = type === "dropdown";
      const slots = {
        default: isDropDown ? renderSelect : renderOptions,
      };
      return (
        <div class="flex flex-col gap-y-4">
          <QuestionContainer {...props} v-slots={slots} editable />
          {isDropDown ? renderOptions() : null}
        </div>
      );
    };
  },
});

export default SelectBase;
