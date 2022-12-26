import { defineComponent, unref } from "vue";
import useProvinceCity from "@/hooks/useProvinceCity";
import { NButton, NCascader } from "naive-ui";
import Vertical from "../Layout/Vertical";
import useBinder from "../ValueBinder/hooks/useBinder";

const ProvinceSelect = defineComponent({
  props: {
    title: String,
  },
  setup(props) {
    const { province, isProvinceLoading, provinceError, provinceRefecth } =
      useProvinceCity();

    const { binderValue, handleValueChange } = useBinder(
      "avaliableProvinceOptions",
      []
    );
    const renderCascader = () => {
      if (unref(isProvinceLoading)) return <div>数据加载中...</div>;
      if (unref(provinceError))
        return (
          <NButton onClick={() => unref(provinceRefecth)()} type="error">
            加载失败, 点击重试
          </NButton>
        );
      return (
        <NCascader
          valueField="dictId"
          labelField="name"
          filterable
          multiple
          options={unref(province)}
          value={unref(binderValue)}
          onUpdate:value={handleValueChange}
        />
      );
    };

    return () => <Vertical title={props.title}>{renderCascader()}</Vertical>;
  },
});

export default ProvinceSelect;
