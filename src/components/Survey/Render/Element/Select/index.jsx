import { computed, defineComponent, unref } from "vue";
import QuestionContainer from "@survey/Render/components/QuestionContainer";

import useVisibleIf from "@survey/Render/hooks/useVisibleIf";
import useEditableIf from "@survey/Render/hooks/useEditableIf";
import useVModel from "@survey/Render/hooks/useVModel";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
import useReadOnly from "@survey/Render/hooks/useReadOnly";

import QuestionTypeEnum from "@survey/types/questionTypeEnum";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import {
  NCheckbox,
  NCheckboxGroup,
  NInput,
  NRadio,
  NRadioGroup,
  NSelect,
} from "naive-ui";

const otherOptionDefaultValue = "__select__item__other__";
const getOtherTextValueFieldName = (fieldName) => `${fieldName}__Comment`;

const Select = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const { question, values, touched, errors } = props;
    const {
      name,
      type,
      choices = [],
      showOtherItem,
      otherText,
      orientation,
    } = question;

    const readOnly = useReadOnly(props);
    const editableIf = useEditableIf(question, values);
    const visibleIf = useVisibleIf(question, values);
    const selectValue = useVModel(name, question.defaultExpression);
    const otherTextValue = useVModel(getOtherTextValueFieldName(name));
    const questionIndex = useQuestionIndex(question);

    const optionsForRender = showOtherItem
      ? [
          ...choices,
          {
            value: otherOptionDefaultValue,
            text: otherText || "Other (describe)",
          },
        ]
      : choices;

    const isDropdown = type === QuestionTypeEnum.dropdown;
    const isInline = orientation === "horizontal";
    const OptionsComp = !isDropdown && {
      Container:
        type === QuestionTypeEnum.radiogroup ? NRadioGroup : NCheckboxGroup,
      Item: type === QuestionTypeEnum.radiogroup ? NRadio : NCheckbox,
    };
    const renderOptions = () => {
      if (!OptionsComp) return null;
      return (
        <OptionsComp.Container
          size="large"
          class="w-full"
          v-model:value={selectValue.value}
          disabled={unref(readOnly) || !unref(editableIf)}
        >
          <div
            class={[
              "survey-question-select-options-container",
              isInline && "inline",
            ]}
          >
            {optionsForRender.map(({ value, text }) => (
              <OptionsComp.Item key={value} value={value} label={text} />
            ))}
          </div>
        </OptionsComp.Container>
      );
    };

    const renderSelect = () => {
      const { dropdownPlaceholder } = question;
      return (
        <NSelect
          placeholder={dropdownPlaceholder}
          v-model:value={selectValue.value}
          labelField="text"
          options={optionsForRender}
          size="large"
          filterable
          clearable
          disabled={unref(readOnly) || !unref(editableIf)}
        />
      );
    };

    const showOther = computed(() => {
      const val = unref(selectValue);
      if (Array.isArray(val)) {
        return val.includes(otherOptionDefaultValue);
      }
      return val === otherOptionDefaultValue;
    });
    const renderOther = () => {
      if (!unref(showOther)) return null;
      const { otherPlaceholder } = question;
      return (
        <NInput
          class="survey-question-select-otherText"
          type="textarea"
          placeholder={otherPlaceholder}
          v-model:value={otherTextValue.value}
          maxlength={150}
          showCount
          clearable
          size="large"
          disabled={unref(readOnly) || !unref(editableIf)}
        />
      );
    };

    return () => {
      if (!unref(visibleIf)) return null;

      return (
        <QuestionContainer
          question={question}
          questionIndex={unref(questionIndex)}
          touched={touched}
          errors={errors}
        >
          {isDropdown ? renderSelect() : renderOptions()}
          {renderOther()}
        </QuestionContainer>
      );
    };
  },
});

export default Select;
