import { defineComponent } from "vue";
import SurveyContainer from "../components/SurveyContainer";
import SurveyTitle from "./components/SurveyTitle";
import SurveyRenderElementDispatch from "./Element";
import { useValuesInit } from "./hooks/useValues";
import { useQuestionSequenceInit } from "@survey/hooks/useQuestionIndex";

const SurveyPreview = defineComponent({
  setup(props) {
    const {
      survey: { title, description, questions },
    } = props;

    useQuestionSequenceInit(questions);

    const { values } = useValuesInit();

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
        <SurveyRenderElementDispatch questions={questions} values={values} />
      );
    };

    return () => {
      return (
        <div class="flex-1 bg-neutral-100 flex h-full">
          <SurveyContainer questions={questions}>
            {{
              title: renderTitle,
              default: renderQuestions,
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
