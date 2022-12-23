import { computed } from "vue";

const useReadOnly = (props) => {
  return computed(() => {
    return props.readOnly || props.question.readOnly;
  });
};

export default useReadOnly;
