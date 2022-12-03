import QuestionContainer from "@survey/components/QuestionContainer/index.vue";
import questionCommonProps from "@survey/util/questionCommonProps";

import OptionItem from "./OptionItem.vue";
import { useInjectCreator } from "@survey/hooks/useCreator";

import { NInput, NRadioGroup, NCheckboxGroup, NSelect } from "naive-ui";
import { defineComponent } from "vue";
import useChoice from "../../hooks/useChoice";

const SelectBase = defineComponent({
  props: questionCommonProps,
  name: "SelectBase",
  setup(props) {
    const { updateQuestionFieldValueByPath } = useInjectCreator();

    const getIsInline = () => props.question.orientation === "horizontal";

    const { handleChoiceTitleChange, handleChoiceRemove, handleChoiceAdd } =
      useChoice(props.path);

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
        <Container size="large" disabled class="mt-1.5 w-full">
          <div
            class={[
              "flex  gap-y-6",
              getIsInline() ? "flex-wrap gap-x-6" : "flex-col",
            ]}
          >
            {props.question.choices.map((choice, index) => (
              <OptionItem
                type="edit"
                key={choice.value}
                chioceText={choice.text}
                chioceIndex={index}
                questionType={props.question.type}
                onTitleChange={handleChoiceTitleChange}
                onRemove={handleChoiceRemove}
              />
            ))}
          </div>
          <div class="flex flex-col gap-y-6 mt-6">
            <OptionItem
              type="add"
              chioceText="New item"
              questionType={props.question.type}
              onAddItem={handleChoiceAdd}
            />
            {props.question.showOtherItem && (
              <div class="flex flex-col gap-y-2">
                <OptionItem
                  type="edit"
                  chioceText={getOhterOptionText()}
                  chioceIndex={-1}
                  questionType={props.question.type}
                  onTitleChange={handleOtherTitleChange}
                  onRemove={handleOtherChoiceRemove}
                />
                <NInput
                  class="ml-8 self-stretch"
                  style="width: auto"
                  disabled
                  resizable={false}
                  type="textarea"
                  placeholder={props.question.otherPlaceholder || ""}
                />
              </div>
            )}
          </div>
        </Container>
      );
    };

    const renderSelect = () => {
      return props.question.type === "dropdown" ? (
        <NSelect placeholder="Select..." disabled size="large" />
      ) : null;
    };

    return () => {
      const { question } = props;
      const { type } = question;
      const isDropDown = type === "dropdown";
      const slots = {
        default: isDropDown ? renderSelect : renderOptions,
      };
      return (
        <div class="survey-question-wrapper flex flex-col gap-y-4">
          <QuestionContainer {...props} v-slots={slots} editable />
          {isDropDown ? renderOptions() : null}
        </div>
      );
    };
  },
});

export default SelectBase;
