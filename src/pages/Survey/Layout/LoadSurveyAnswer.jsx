import { computed, defineComponent, unref } from "vue";
import { queryFormAnswer } from "@/api";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";

const LoadSurveyAnswer = defineComponent({
  setup(props, { slots }) {
    const route = useRoute();
    const queryEnable = computed(
      () => !!route.query.idCard && !!route.query.projectPackageStageId
    );

    const { data, isLoading, error } = useQuery(
      ["formAnswer", route.query],
      () => queryFormAnswer(route.query),
      {
        enabled: queryEnable,
      }
    );

    return () => {
      if (!unref(queryEnable)) {
        return <div> 缺少参数idCard或者projectPackageStageId</div>;
      }
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

export default LoadSurveyAnswer;
