import { computed, defineComponent, unref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";

const CellWrapper = defineComponent({
  props: {
    cellPath: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { currentActivePath, onQuestionItemClick } = useInjectCreator();
    const isActive = computed(
      () => unref(currentActivePath) === props.cellPath
    );
    const handleContainerClick = (e) => {
      onQuestionItemClick(props.cellPath);
      e.stopPropagation();
      e.preventDefault();
      return false;
    };
    return () => (
      <div
        class={["survey-question_container", isActive.value && "active"]}
        onClick={handleContainerClick}
      >
        {slots.default()}
      </div>
    );
  },
});

export default CellWrapper;
