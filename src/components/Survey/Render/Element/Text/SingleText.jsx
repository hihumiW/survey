import { computed, defineComponent, unref, watch } from "vue";
import QuestionContainer from "@survey/Render/components/QuestionContainer";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import { textTypeEnum } from "@survey/types/questionTypeEnum";
import {
  getRenderInput,
  getInputProps,
  getInputVariantClassName,
} from "@survey/hooks/Element/Text";
import useVisibleIf from "@survey/Render/hooks/useVisibleIf";
import useEditableIf from "@survey/Render/hooks/useEditableIf";
import useVModel from "@survey/Render/hooks/useVModel";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";

const SingleText = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const { question, values, touched, errors } = props;

    watch(errors, (v) => {
      console.log("cnm change", v);
    });

    const { name, inputType, inputVariant } = question;

    const editableIf = useEditableIf(question, values);
    const visibleIf = useVisibleIf(question, values);
    const inputValue = useVModel(name);
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
      const Props = getInputProps(question);
      switch (inputType) {
        case textTypeEnum.text:
        case textTypeEnum.number:
          //输入框 仅仅在blur时同步values的值
          Props.onBlur = handleInputBlur;
          return Props;
        default:
          //其他的input类型 在change时同步values的值
          Props["onUpdate:value"] = handleValueChange;
      }
      return Props;
    });

    const renderInput = () => {
      return (
        <RenderComp
          value={inputValue.value}
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
          question={question}
          questionIndex={unref(questionIndex)}
          class={getInputVariantClassName(inputVariant)}
          touched={touched}
          errors={errors}
        >
          {renderInput()}
        </QuestionContainer>
      );
    };
  },
});

export default SingleText;
