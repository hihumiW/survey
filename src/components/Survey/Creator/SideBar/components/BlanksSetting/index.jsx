import { computed, defineComponent, unref, ref } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";
import Vertical from "../Layout/Vertical";
import { NEmpty, NCollapse, NCollapseItem } from "naive-ui";
import SelectBinder from "../../components/ValueBinder/Select.vue";
import { textTypeEnum } from "@survey/types/questionTypeEnum";

const BLANK_TYPE_OPTIONS = [
  {
    label: "文本",
    value: textTypeEnum.text,
  },
  {
    label: "数字",
    value: textTypeEnum.number,
  },
];
const BlanksSetting = defineComponent({
  setup() {
    const { currentActiveItem, currentActivePath, getModelV } =
      useInjectCreator();
    const showIndex = ref();
    const setttings = computed(() => {
      return getModelV(`${unref(currentActivePath)}.blankSettings`);
    });

    return () => {
      const s = unref(setttings);
      return (
        <Vertical title="填空">
          {!s.length ? (
            <NEmpty description="暂无填空" />
          ) : (
            <NCollapse
              accordion
              arrowPlacement="right"
              className="survey-creator-collapse"
            >
              {s.map((config, idx) => {
                return (
                  <NCollapseItem title={`填空${idx + 1}`} name={config.id}>
                    <SelectBinder
                      title="填空格式"
                      bindName={`blankSettings.${idx}.type`}
                      options={BLANK_TYPE_OPTIONS}
                    />
                  </NCollapseItem>
                );
              })}
            </NCollapse>
          )}
        </Vertical>
      );
    };
  },
});

const SettingTitle = (props) => {
  return (
    <div className="p-2 bg-white text-neutral-500 flex justify-between">
      <span>{props.title}</span>
    </div>
  );
};

export default BlanksSetting;
