import { inject, provide, unref, computed } from "vue";

const PanelConfigInjectKey = Symbol("pane lConfigInject");
export const usePanelConifigProvide = (questionRef) => {
  const config = computed(() => {
    const { titleLocation } = unref(questionRef);
    return {
      titleLocation,
    };
  });
  provide(PanelConfigInjectKey, config);
};

export const usePanelConfigInject = () => {
  return inject(PanelConfigInjectKey, () => ({}));
};
