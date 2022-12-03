import { computed, defineComponent, h, inject, unref } from "vue";
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

      const passProps = computed(() => {
        if (typeof props === "function") {
          return props(creator);
        }
        return props;
      });
      return () =>
        unref(shouldRenderItem) ? h(component, unref(passProps)) : null;
    },
  });

export default generateValueBinder;
