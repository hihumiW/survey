import { useQuery } from "vue-query";
import { queryFormTypes } from "@/api";
const useFormTypes = () => {
  return useQuery({
    queryKey: ["formTypes"],
    queryFn: queryFormTypes,
    placeholderData: [],
    staleTime: 1000 * 60 * 60 * 2,
  });
};

export default useFormTypes;
