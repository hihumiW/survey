import { defineComponent } from "vue";
import RenderSurvey from "@/components//Survey/Render";
import { useRoute, useRouter } from "vue-router";
import { NButton } from "naive-ui";
import LoadSurvey from "@/Layout/LoadSurvey";

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
        <div class="bg-neutral-100 p-4 dark:bg-neutral-800">
          <NButton onClick={() => router.back()}>返回</NButton>
        </div>
      );
    };

    return () => {
      if (!props.data) return;
      const formId = route.params.formId;
      const key = `Survey_${formId}`;
      return (
        <div class="h-full flex flex-col">
          {renderBackButton()}

          <RenderSurvey key={key} survey={props.data} formId={formId} />
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
