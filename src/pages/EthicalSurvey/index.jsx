import { defineComponent, onMounted, onUnmounted, ref, unref } from "vue";
import RenderSurvey from "@/components//Survey/Render";

const EthicalSurvey = defineComponent({
  setup() {
    const shouldRenderSurveyData = ref(false);
    const SurveyProps = ref({});
    window.loadEthicalSurvey = (surveyProps) => {
      SurveyProps.value = { ...surveyProps };
      shouldRenderSurveyData.value = true;
    };
    onMounted(() => {
      if (window.parent) {
        window.parent.postMessage({
          source: "echitalSurveyLoaded",
        });
      }
    });
    onUnmounted(() => {
      window.loadEthicalSurvey = undefined;
    });
    return () => {
      if (!unref(shouldRenderSurveyData)) return null;
      return <RenderSurvey {...unref(SurveyProps)} />;
    };
  },
});

export default EthicalSurvey;
