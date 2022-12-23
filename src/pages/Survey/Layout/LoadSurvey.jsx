import { defineComponent, unref } from "vue";
import usePageSurvey from "@/hooks/usePageSurvey";

const LoadSurvey = defineComponent({
  setup(props, { slots }) {
    const { data, isLoading, error } = usePageSurvey();

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
      return (
        slots.default &&
        slots.default({
          data: data.value,
        })
      );
    };
  },
});

export default LoadSurvey;
