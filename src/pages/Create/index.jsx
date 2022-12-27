import { defineComponent } from "vue";
import LoadSurvey from "@/Layout/LoadSurvey";
import Survey from "@/components/Survey/index.vue";
import { useRoute } from "vue-router";
const Create = defineComponent({
  setup() {
    const route = useRoute();

    return () => {
      if (route.query.copyFormId) {
        return (
          <LoadSurvey>
            {{
              default: (props) => {
                const { formId, ...surveyData } = props.data;
                return <Survey key="create" editSurveyData={surveyData} />;
              },
            }}
          </LoadSurvey>
        );
      }
      return <Survey key="create" />;
    };
  },
});

export default Create;
