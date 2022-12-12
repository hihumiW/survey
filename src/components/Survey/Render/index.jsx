import { NEmpty } from "naive-ui";
import { defineComponent } from "vue";
import SurveyContainer from "../components/SurveyContainer";
import SurveyTitle from "./components/SurveyTitle";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";
import SingleText from "./Element/Text/SingleText";

import { useValuesInit } from "./hooks/useValues";
import { useQuestionSequenceInit } from "@survey/hooks/useQuestionIndex";

const SurveyPreview = defineComponent({
  setup(props) {
    useQuestionSequenceInit(props.survey.questions);

    const { values } = useValuesInit();

    const renderTitle = () => {
      const {
        survey: { title, description },
      } = props;

      return (
        <SurveyTitle surveyTitle={title} surveyDescription={description} />
      );
    };

    const renderQuestions = () => {
      const {
        survey: { questions },
      } = props;

      if (!questions.length) {
        return (
          <div class="my-96">
            <NEmpty size="huge" />
          </div>
        );
      }

      return questions.map((question) => {
        switch (question.type) {
          case QuestionTypeEnum.text:
            return <SingleText question={question} values={values} />;
          default:
            return null;
        }
      });
    };

    return () => {
      return (
        <div class="flex-1 bg-neutral-100 flex h-full">
          <SurveyContainer questions={props.survey.questions}>
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
