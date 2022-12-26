import { queryProvinceCity } from "@/api";
import { computed, unref } from "vue";
import { useQuery } from "vue-query";
import { cloneDeep } from "lodash-es";

const useProvinceCity = (enabled = true) => {
  const {
    data: province,
    isLoading: isProvinceLoading,
    error: provinceError,
    refetch: provinceRefecth,
  } = useQuery({
    queryKey: "provinceCity",
    staleTime: 1000 * 60 * 60 * 6,
    queryFn: queryProvinceCity,
    enabled,
    placeholderData: [],
  });

  return {
    province,
    provinceRefecth,
    provinceError,
    isProvinceLoading,
  };
};

export const useAvaliableProvinceCity = (
  provinceCity,
  avaliableProvinceOptions
) => {
  return computed(() => {
    if (avaliableProvinceOptions?.length) {
      const provinceData = cloneDeep(unref(provinceCity));
      forEachOptions(provinceData, (option) => {
        option.disabled = !avaliableProvinceOptions.includes(option.dictId);
      });
      return provinceData;
    } else {
      return unref(provinceCity);
    }
  });
};

const forEachOptions = (options, fn) => {
  if (!options?.length || !fn) return;
  options.forEach((option) => {
    fn(option);
    forEachOptions(option.children);
  });
};

export default useProvinceCity;
