import { defineComponent, unref } from "vue";
import { NAlert, NButton, NSpin } from "naive-ui";
import usePageSurvey from "@/hooks/usePageSurvey";

const LoadSurvey = defineComponent({
  setup(_props, { slots }) {
    const { data, isLoading, error, refetch } = usePageSurvey();

    return () => {
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

export default LoadSurvey;
