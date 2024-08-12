import { defineComponent, computed } from "vue";
import useProvinceCity from "@/hooks/useProvinceCity";
import { textTypeEnum } from "@survey/types/questionTypeEnum";

const Text = defineComponent({
  props: ["value", "inputType"],
  setup(props) {
    const { value, inputType } = props;
    const { province } = useProvinceCity();
    const provinceMap = computed(() => {
      const m = new Map();
      mapProvinceFn(unref(province), m);
      return m;
    });
    return () => {
      if (!value) return "";
      if (inputType === textTypeEnum.time) {
        return new Intl.DateTimeFormat("zh-cn", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(value));
      }
      if (inputType === textTypeEnum.date) {
        return new Intl.DateTimeFormat("fr-CA").format(new Date(value));
      }
      if (inputType === textTypeEnum.provinceCity) {
        const provinceNames = [];
        mapProvinceName(val, unref(provinceMap), provinceNames);
        return provinceNames.reverse().join("/");
      }
      if (inputType === textTypeEnum.daterange) {
        const [startDate, endDate] = value;
        return `
          ${new Intl.DateTimeFormat("fr-CA").format(
            new Date(startDate)
          )} ~ ${new Intl.DateTimeFormat("fr-CA").format(new Date(endDate))} 
        `;
      }
      if (inputType === textTypeEnum.textarea) {
        return <div className="whitespace-pre">{value}</div>;
      }
      return value;
    };
  },
});

export default Text;

const mapProvinceFn = (l, map) => {
  if (!Array.isArray(l)) return;
  l?.forEach((i) => {
    map.set(i.dictId, i);
    if (i.children) {
      mapProvinceFn(i.children, map);
    }
  });
};

const mapProvinceName = (id, map, prev) => {
  const item = map.get(id);
  if (item?.name) {
    prev.push(item.name);
  }
  if (item?.parentDictId) {
    mapProvinceName(item.parentDictId, map, prev);
  }
};
