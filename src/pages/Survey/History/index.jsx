import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import LoadSurvey from "@/Layout/LoadSurvey";
import LoadSurveyAnswer from "@/Layout/LoadSurveyAnswer.jsx";
import RenderSurvey from "@/components//Survey/Render";

const HistorySurvey = defineComponent({
  props: {
    survey: Object,
    values: Object,
  },
  setup(props) {
    const route = useRoute();

    return () => {
      return (
        <div class="h-full flex flex-col">
          <RenderSurvey
            survey={props.survey}
            defaultValue={props.values.answerMap}
            readOnly={!!route.query.readOnly}
            formId={route.params.formId}
          />
        </div>
      );
    };
  },
});

const HistorySurveyWrapper = () => {
  return (
    <LoadSurvey>
      {{
        default: (surveyProps) => {
          return (
            <LoadSurveyAnswer>
              {{
                default: (answerProps) => (
                  <HistorySurvey
                    survey={surveyProps.data}
                    values={answerProps.data}
                  />
                ),
              }}
            </LoadSurveyAnswer>
          );
        },
      }}
    </LoadSurvey>
  );
};

export default HistorySurveyWrapper;

HistorySurveyWrapper.displayName = "HistorySurveyWrapper";
