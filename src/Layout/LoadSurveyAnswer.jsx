import { computed, defineComponent, unref } from "vue";
import { queryFormAnswer } from "@/api";
import { useQuery } from "vue-query";
import { useRoute } from "vue-router";
import { NAlert, NSpin, NButton } from "naive-ui";

const LoadSurveyAnswer = defineComponent({
  setup(_props, { slots }) {
    const route = useRoute();
    const queryEnable = computed(
      () => !!route.query.idCard && !!route.query.projectPackageStageId
    );

    const { data, isLoading, error, refetch } = useQuery(
      ["formAnswer", route.query],
      () => queryFormAnswer(route.query),
      {
        enabled: queryEnable,
      }
    );

    return () => {
      if (!unref(queryEnable)) {
        return (
          <NAlert title="缺少参数" type="error" class="m-3">
            缺少参数idCard或者projectPackageStageId
          </NAlert>
        );
      }
      if (unref(isLoading)) {
        return (
          <NAlert type="info" title="加载中" class="m-3">
            {{
              icon: () => <NSpin size="small" class="mr-2" />,
              default: () => "加载问卷信息",
            }}
          </NAlert>
        );
      }
      if (unref(error)) {
        const msg = unref(error).message || "加载失败";
        return (
          <NAlert title="加载失败" type="error" class="m-3">
            <div class="flex justify-between items-center">
              <p>{msg}</p>
              <NButton onClick={() => unref(refetch)()}>重试</NButton>
            </div>
          </NAlert>
        );
      }
      if (!unref(data)) {
        return (
          <NAlert type="warning" title="警告">
            空的返回值
          </NAlert>
        );
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