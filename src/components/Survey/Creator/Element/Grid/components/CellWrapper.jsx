import { computed, defineComponent, unref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";

const CellWrapper = defineComponent({
  props: {
    cellPath: {
      type: String,
      required: true,
    },
    cellType: String,
    required: true,
  },
  setup(props, { slots }) {
    const { currentActivePath, onQuestionItemClick } = useInjectCreator();
    const isActive = computed(
      () => unref(currentActivePath) === props.cellPath
    );
    const handleContainerClick = (e) => {
      onQuestionItemClick(props.cellPath, props.cellType);
      e.stopPropagation();
      e.preventDefault();
      return false;
    };
    return () => (
      <div
        class={[
          "survey-question_container rounded-sm cursor-pointer p-1",
          isActive.value && "active",
        ]}
        onClick={handleContainerClick}
      >
        {slots.default()}
      </div>
    );
  },
});

export default CellWrapper;
