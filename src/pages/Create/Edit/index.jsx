import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import Survey from "@/components/Survey/index.vue";
import usePageSurvey from "@/hooks/usePageSurvey";

const Edit = defineComponent({
  setup() {
    const { data, isLoading, error } = usePageSurvey();
    const route = useRoute();

    return () => {
      if (error.value) {
        return <div>error : {error.value?.message}</div>;
      }
      if (isLoading.value) {
        return <div>Loading...</div>;
      }
      if (!data.value) {
        return <div>Empty reseponse data</div>;
      }

      const key = `edit_${route.params.formId}`;
      return <Survey key={key} editSurveyData={data.value} />;
    };
  },
});

export default Edit;
