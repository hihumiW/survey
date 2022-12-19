import { defineComponent, ref } from "vue";
import SurveyContainer from "../components/SurveyContainer";
import SurveyTitle from "./components/SurveyTitle";
import SurveyRenderElementDispatch from "./Element";
import { useValuesInit } from "./hooks/useValues";
import { useQuestionSequenceInit } from "@survey/hooks/useQuestionIndex";
import useValidate from "./hooks/useValidate";
import { NButton } from "naive-ui";

const SurveyPreview = defineComponent({
  setup(props) {
    const {
      survey: { title, description, questions },
    } = props;

    useQuestionSequenceInit(questions);

    const valuesSchema = useValidate(questions);
    const { values, touched, errors, handleSubmit } = useValuesInit({
      schema: valuesSchema,
    });

    console.log(errors);

    const renderTitle = () => (
      <SurveyTitle surveyTitle={title} surveyDescription={description} />
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
          values={values}
          touched={touched}
          errors={errors}
        />
      );
    };

    const renderFooter = () => {
      return (
        <div class="text-center">
          <NButton size="large" type="primary" onClick={handleSubmit}>
            Submit
          </NButton>
        </div>
      );
    };

    return () => {
      return (
        <div class="flex-1 bg-neutral-100 flex h-full">
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

SurveyPreview.props = {
  survey: {
    type: Object,
    required: true,
  },
};

export default SurveyPreview;
