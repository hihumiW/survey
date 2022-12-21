import { defineComponent, unref } from "vue";
import usePageSurvey from "@/hooks/usePageSurvey";
import RenderSurvey from "@/components//Survey/Render";
import { useRoute } from "vue-router";

const Survey = defineComponent({
  setup() {
    const route = useRoute();
    const { data, isLoading, error } = usePageSurvey();
    const handleSurveySubmit = (values) => {
      if (typeof window.onSurveySubmit === "function") {
        window.onSurveySubmit(values);
      }
    };
    return () => {
      if (unref(isLoading)) {
        return <div>Loading...</div>;
      }
      if (unref(error)) {
        return <div>error : {unref(error).message}</div>;
      }
      if (!unref(data)) {
        return <div>empty responese data</div>;
      }
      const key = `Survey_${route.params.formId}`;
      return (
        <RenderSurvey
          key={key}
          survey={unref(data)}
          onSurveySubmit={handleSurveySubmit}
        />
      );
    };
  },
});

export default Survey;
