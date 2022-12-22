import { ref } from "vue";
const useCopyValue = (defaultValue = {}) => {
  const originalValue = ref({ ...defaultValue });
  const copyValue = ref({ ...defaultValue });
  const syncValue = () => {
    originalValue.value = {
      ...copyValue.value,
    };
  };
  return {
    originalValue,
    copyValue,
    syncValue,
  };
};

export default useCopyValue;
