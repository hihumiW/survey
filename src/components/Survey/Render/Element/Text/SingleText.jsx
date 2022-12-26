import { computed, defineComponent, unref, ref, watch } from "vue";
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
import useReadOnly from "@survey/Render/hooks/useReadOnly";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
import useProvinceCity, {
  useAvaliableProvinceCity,
} from "@/hooks/useProvinceCity";
import { NButton } from "naive-ui";

const SingleText = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const { question, values, touched, errors } = props;

    const { name, inputType, inputVariant, avaliableProvinceOptions } =
      question;

    const editableIf = useEditableIf(question, values);
    const visibleIf = useVisibleIf(question, values);

    const inputValue = useVModel(name, question.defaultExpression);

    const { province, isProvinceLoading, provinceError, provinceRefecth } =
      useProvinceCity(
        computed(() => props.question.inputType === textTypeEnum.provinceCity)
      );

    const avaliableProvinceData = useAvaliableProvinceCity(
      province,
      avaliableProvinceOptions
    );

    const inputValueRef = ref(inputValue.value);
    watch(inputValue, (val) => {
      inputValueRef.value = val || null;
    });
    const questionIndex = useQuestionIndex(question);

    const readOnly = useReadOnly(props);
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
        case textTypeEnum.provinceCity:
          Props.valueField = "dictId";
          Props.labelField = "name";
          Props.filterable = true;
          Props.options = unref(avaliableProvinceData);
          Props["onUpdate:value"] = handleValueChange;
          return Props;
        default:
          //其他的input类型 在change时同步values的值
          Props["onUpdate:value"] = handleValueChange;
      }
      return Props;
    });

    const renderInput = () => {
      if (unref(isProvinceLoading)) {
        return <p>获取省市数据中...</p>;
      }
      if (unref(provinceError)) {
        return (
          <div class="text-center">
            <NButton onClick={() => unref(provinceRefecth)()} type="error">
              省市数据获取失败, 重新获取
            </NButton>
          </div>
        );
      }
      return (
        <RenderComp
          v-model:value={inputValueRef.value}
          disabled={unref(readOnly) || !unref(editableIf)}
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
