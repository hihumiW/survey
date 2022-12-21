import { useRoute } from "vue-router";
import { useQuery } from "vue-query";
import { queryFormDetail } from "@/api";
import { computed } from "vue";

const usePageSurvey = () => {
  const route = useRoute();
  return useQuery({
    queryKey: ["formDetail", route.params.formId],
    queryFn: () => queryFormDetail(route.params.formId),
    enabled: computed(() => !!route.params.formId),
    cacheTime: 0,
  });
};

export default usePageSurvey;
