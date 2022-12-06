import { computed, defineComponent, h, inject, unref } from "vue";
const generateConditionComp = (
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
        if (Array.isArray(shouldRenderItemFn)) {
          return shouldRenderItemFn.every(
            (fn) => typeof fn === "function" && fn(creator)
          );
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

export default generateConditionComp;
