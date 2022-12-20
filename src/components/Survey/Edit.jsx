import Survey from "./index.vue";
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
const Edit = defineComponent({
  setup() {
    const route = useRoute();
    return () => {
      const key = `edit_${route.params.formId}`;
      return <Survey key={key} />;
    };
  },
});

export default Edit;
