import { defineComponent, unref } from "vue";
import SurveyContainer from "../components/SurveyContainer";
import SurveyTitle from "./components/SurveyTitle";
import SurveyRenderElementDispatch from "./Element";
import { useValuesInit } from "./hooks/useValues";
import { useQuestionSequenceInit } from "@survey/hooks/useQuestionIndex";
import useValidate from "./hooks/useValidate";

import { NButton, NEmpty } from "naive-ui";
import useFormTypes from "@survey/hooks/useFormTypes";

const SurveyRender = defineComponent({
  setup(props) {
    const {
      defaultValue,
      survey: { title, description, questions, categoryId },
      readOnly,
      formId,
    } = props;

    useQuestionSequenceInit(questions);
    const { data: formTypes } = useFormTypes();
    const valuesSchema = useValidate(questions);

    const { values, touched, errors, handleSubmit } = useValuesInit({
      defaultValue,
      schema: valuesSchema,
      onSubmit: (values) => {
        const unrefValues = unref(values);
        if (props.onSurveySubmit) {
          props.onSurveySubmit(unrefValues);
        }
        if (window.onSurveySubmit) {
          window.onSurveySubmit(unrefValues);
        }
      },
    });

    const renderTitle = () => (
      <SurveyTitle
        surveyTitle={title}
        surveyDescription={description}
        formTypes={formTypes.value}
        categoryId={categoryId}
      />
    );

    const renderQuestions = () => {
      if (!questions?.length) {
        return (
          <div class="my-96">
            <NEmpty size="huge" />
          </div>
        );
      }
      return (
        <SurveyRenderElementDispatch
          questions={questions}
          formId={formId}
          values={values}
          touched={touched}
          errors={errors}
          readOnly={readOnly}
        />
      );
    };

    const renderFooter = () => {
      if (props.readOnly || !questions?.length) return null;
      return (
        <div class="text-center mb-8">
          <NButton size="large" type="primary" onClick={handleSubmit}>
            提交
          </NButton>
        </div>
      );
    };

    return () => {
      return (
        <div class="flex-grow bg-neutral-100 flex flex-col dark:bg-neutral-800">
          <SurveyContainer questions={questions}>
            {{
              title: renderTitle,
              default: renderQuestions,
              footer: renderFooter,
            }}
          </SurveyContainer>
        </div>
      );
    };
  },
});

SurveyRender.props = {
  readOnly: {
    type: Boolean,
    default: () => false,
  },
  defaultValue: {
    type: Object,
    default: () => ({}),
  },
  survey: {
    type: Object,
    required: true,
  },
  onSurveySubmit: {
    type: Function,
  },
  formId: {
    type: String,
  },
};

export default SurveyRender;
