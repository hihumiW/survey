import { defineComponent } from "vue";
import RenderSurvey from "@/components//Survey/Render";
import { useRoute, useRouter } from "vue-router";
import { NButton } from "naive-ui";
import LoadSurvey from "./Layout/LoadSurvey";

const Survey = defineComponent({
  props: {
    data: Object,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const renderBackButton = () => {
      if (route.query.hideBack) {
        return null;
      }
      return (
        <div class="bg-neutral-100 p-4">
          <NButton onClick={() => router.back()}>Back</NButton>
        </div>
      );
    };

    return () => {
      if (!props.data) return;
      const key = `Survey_${route.params.formId}`;
      return (
        <div class="h-full flex flex-col">
          {renderBackButton()}

          <RenderSurvey key={key} survey={props.data} />
        </div>
      );
    };
  },
});

const SurveyWrapper = () => {
  return (
    <LoadSurvey>
      {{
        default: (props) => {
          return <Survey data={props.data} />;
        },
      }}
    </LoadSurvey>
  );
};
SurveyWrapper.displayName = "SurveyWrapper";
export default SurveyWrapper;
