import { useQuery } from "vue-query";
import { queryFormTypes } from "@/api";
const useFormTypes = () => {
  return useQuery({
    queryKey: ["formTypes"],
    queryFn: queryFormTypes,
    placeholderData: [],
    staleTime: 1000 * 60 * 60 * 2,
    onError() {
      window.$message.error("量表类型加载失败");
    },
  });
};

export default useFormTypes;
