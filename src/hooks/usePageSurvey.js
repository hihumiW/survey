import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import { queryFormDetail } from "@/api";
import { computed, unref } from "vue";

const usePageSurvey = () => {
  const route = useRoute();
  const formId = computed(() => {
    return route.params.formId || route.query.copyFormId;
  });
  return useQuery({
    queryKey: ["formDetail", formId],
    queryFn: () => queryFormDetail(unref(formId)),
    enabled: computed(() => !!unref(formId)),
    cacheTime: 0,
  });
};

export default usePageSurvey;
