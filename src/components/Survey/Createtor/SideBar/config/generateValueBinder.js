import { computed, defineComponent, h, inject } from "vue";
const generateValueBinder = (
  component,
  props,
  componentName,
  shouldRenderItemFn
) =>
  defineComponent({
    name: componentName,
    setup() {
      const creator = inject("creator");
      const shouldRenderItem = computed(() => {
        if (typeof shouldRenderItemFn === "function") {
          return shouldRenderItemFn(creator);
        }
        return true;
      });
      return () => (shouldRenderItem.value ? h(component, props) : null);
    },
  });

export default generateValueBinder;
