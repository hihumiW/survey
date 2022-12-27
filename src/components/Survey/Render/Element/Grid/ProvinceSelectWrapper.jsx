import { defineComponent } from "vue";
import { useAvaliableProvinceCity } from "@/hooks/useProvinceCity";

const ProvinceSelectWrapper = defineComponent({
  props: {
    avaliableProvinceOptions: {
      type: Array,
    },
    provinceData: {
      type: Array,
    },
  },
  setup(props, { slots }) {
    const avaliableProvinceData = useAvaliableProvinceCity(
      props.provinceData,
      props.avaliableProvinceOptions
    );
    return () => (
      <div class="survey-grid-province-wrapper">
        {{
          default: () => slots.default && slots.default(avaliableProvinceData),
        }}
      </div>
    );
  },
});

export default ProvinceSelectWrapper;
