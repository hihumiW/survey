import { defineComponent } from "vue";
import { useAvaliableProvinceCity } from "@/hooks/useProvinceCity";

const ProvinceWrapper = defineComponent({
  props: ["avaliableProvinceOptions ", "provinceData"],
  setup(props, { slots }) {
    const avaliableProvinceData = useAvaliableProvinceCity(
      props.provinceData,
      props.avaliableProvinceOptions
    );
    return () => (
      <template>
        {{
          default: () => slots.default && slots.default(avaliableProvinceData),
        }}
      </template>
    );
  },
});

export default ProvinceWrapper;
