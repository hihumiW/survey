import { computed, defineComponent, unref } from "vue";
import QuestionContainer from "@survey/Render/components/QuestionContainer";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import { textTypeEnum } from "@survey/types/questionTypeEnum";
import {
  getRenderInput,
  getPlaceholder,
  getInputVariantClassName,
} from "@survey/hooks/Element/Text";
import useVisibleIf from "../../hooks/useVisibleIf";
import useEditableIf from "../../hooks/useEditableIf";
import useVModel from "../../hooks/useVModel";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";

const SingleText = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const { question, values } = props;
    const { inputType, placeholder, inputVariant, precision, maxLength } =
      question;

    const editableIf = useEditableIf(question, values);
    const visibleIf = useVisibleIf(question, values);
    const inputValue = useVModel(question);
    const questionIndex = useQuestionIndex(question);

    const RenderComp = getRenderInput(inputType);

    const handleValueChange = (val) => (inputValue.value = val);

    const handleInputBlur = (e) => {
      let val = (inputValue.value = e.target.value);
      if (inputType === textTypeEnum.number) val = Number(val);
      if (isNaN(val)) return;
      inputValue.value = val;
    };

    //Input不会变化的Props；只会执行一次
    const CompStaticProps = computed(() => {
      const Props = {
        size: "large",
        clearable: true,
        placeholder: getPlaceholder(inputType, placeholder),
      };
      switch (inputType) {
        case textTypeEnum.number:
          Props.precision = precision === -1 ? undefined : precision - 1;
        case textTypeEnum.text:
          Props.maxlength = maxLength;
          Props.showCount = !!maxLength;
        case textTypeEnum.text:
        case textTypeEnum.number:
          //输入框 仅仅在blur时同步values的值
          Props.onBlur = handleInputBlur;
          return Props;
        case textTypeEnum.date:
          Props.format = "yyyy/MM/dd";

        default:
          //其他的input类型 在change时同步values的值
          Props["onUpdate:value"] = handleValueChange;
      }
      return Props;
    });

    const renderInput = () => {
      return (
        <RenderComp
          value={inputType.value}
          disabled={!unref(editableIf)}
          {...CompStaticProps.value}
        />
      );
    };

    return () => {
      if (!unref(visibleIf)) {
        return null;
      }

      return (
        <QuestionContainer
          question={props.question}
          questionIndex={questionIndex.value}
          class={getInputVariantClassName(inputVariant)}
        >
          {renderInput()}
        </QuestionContainer>
      );
    };
  },
});

export default SingleText;
