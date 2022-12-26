import { defineComponent, unref } from "vue";
import { useRouter } from "vue-router";
import {
  NForm,
  NInput,
  NSelect,
  NGrid,
  NFormItemGi,
  NGridItem,
  NButton,
  NDataTable,
  NPagination,
  NPopconfirm,
} from "naive-ui";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import { queryFormList, deleteForm, copyForm } from "@/api";
import useFormTypes from "@survey/hooks/useFormTypes";
import useCopyValue from "@/hooks/useCopyValue";
import "./index.css";

const SurveyList = defineComponent({
  setup() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleNewCRFClick = () => {
      router.push("/creator");
    };

    const defaultQueryCondition = {
      categoryId: undefined,
      creatorName: "",
      name: "",
      page: 0,
      size: 10,
    };

    const { originalValue, copyValue, syncValue } = useCopyValue(
      defaultQueryCondition
    );

    const { data: formTypes } = useFormTypes();

    const tableColumnDef = [
      {
        title: "CRF名称",
        key: "title",
      },
      {
        title: "量表类型",
        key: "formType",
      },
      {
        title: "创建人",
        key: "creatorName",
        width: 150,
      },
      {
        title: "所属组织",
        key: "dept",
      },
      {
        title: "创建时间",
        key: "createTime",
        width: 250,
        render(rowData) {
          const { createTime } = rowData;
          return createTime?.split(".")?.[0]?.split("T")?.join(" ");
        },
      },
      {
        title: "操作",
        key: "op",
        width: 200,
        render(rowData) {
          return (
            <div class="flex gap-x-3">
              <NButton
                size="small"
                tertiary
                onClick={() => handlePreview(rowData)}
              >
                查看
              </NButton>
              <NButton
                size="small"
                tertiary
                onClick={() => handleEdit(rowData)}
              >
                编辑
              </NButton>
              <NPopconfirm onPositiveClick={() => handleCopy(rowData)}>
                {{
                  trigger: () => (
                    <NButton tertiary size="small">
                      复制
                    </NButton>
                  ),
                  default: () => <div>确定要复制吗？</div>,
                }}
              </NPopconfirm>

              <NPopconfirm onPositiveClick={() => handleDelete(rowData)}>
                {{
                  trigger: () => (
                    <NButton tertiary type="error" size="small">
                      删除
                    </NButton>
                  ),
                  default: () => <div>确定要删除吗？</div>,
                }}
              </NPopconfirm>
            </div>
          );
        },
      },
    ];

    const handlePreview = (rowData) => {
      router.push(`/survey/${rowData.formId}`);
    };
    const handleEdit = (rowData) => {
      router.push(`/creator/${rowData.formId}`);
    };

    const { data: listData, isLoading } = useQuery(
      ["formList", originalValue],
      () => queryFormList(unref(originalValue)),
      {
        onError() {
          window.$message.error("列表加载失败");
        },
      }
    );

    const { mutateAsync: mutateDeleteForm } = useMutation(deleteForm, {
      onSuccess() {
        window.$message.success("删除成功");
        queryClient.invalidateQueries(["formList"]);
      },
      onError() {
        window.$message.error("删除失败");
      },
    });
    const handleDelete = (rowData) => {
      mutateDeleteForm(rowData.formId);
    };

    const { mutateAsync: mutateCopyForm } = useMutation(copyForm, {
      onSuccess() {
        window.$message.error("复制成功");
        queryClient.invalidateQueries(["formList"]);
      },
      onError() {
        window.$message.error("复制失败");
      },
    });
    const handleCopy = (rowData) => {
      mutateCopyForm(rowData.formId);
    };

    const handleSearch = () => {
      copyValue.value.page = 0;
      syncValue();
    };
    const handleReset = () => {
      copyValue.value = {
        ...defaultQueryCondition,
        size: copyValue.value.size,
      };
      syncValue();
    };

    return () => {
      return (
        <div class="min-h-full bg bg-neutral-100 p-6 flex flex-col dark:bg-neutral-900">
          <div class="survey-list-page flex-1 min-w-[1360px] max-w-[1440px] mx-auto flex flex-col gap-y-4">
            <div class="survey-panel ">
              <div class="survey-panel-title ">数据筛选</div>
              <div class="px-3 py-3 my-3 ">
                <NForm inline label-placement="left" labelWidth={80}>
                  <NGrid cols={4} xGap={12} yGap={8}>
                    <NFormItemGi label="量表名称">
                      <NInput
                        v-model:value={copyValue.value.name}
                        placeholder="请输入"
                      />
                    </NFormItemGi>
                    <NFormItemGi label="量表类型">
                      <NSelect
                        v-model:value={copyValue.value.categoryId}
                        options={formTypes.value || []}
                        placeholder="请选择"
                        labelField="name"
                        valueField="id"
                        clearable
                      />
                    </NFormItemGi>
                    <NFormItemGi label="创建人">
                      <NInput
                        placeholder="请输入"
                        v-model:value={copyValue.value.creatorName}
                      />
                    </NFormItemGi>
                    <NGridItem>
                      <div class="flex justify-end items-center gap-x-3 mr-4">
                        <NButton type="primary" onClick={handleSearch}>
                          搜索
                        </NButton>
                        <NButton onClick={handleReset}>重置</NButton>
                      </div>
                    </NGridItem>
                  </NGrid>
                </NForm>
              </div>
            </div>
            <div class="survey-panel">
              <div class="flex items-center justify-between">
                <p class="font-bold">数据列表</p>
                <NButton onClick={handleNewCRFClick}>新建CRF</NButton>
              </div>
              <div class="p-3">
                <NDataTable
                  loading={isLoading.value}
                  columns={tableColumnDef}
                  data={listData.value?.content || []}
                />
                <div class="flex justify-end mt-3">
                  <NPagination
                    page={copyValue.value.page + 1}
                    pageSize={copyValue.value.size}
                    pageCount={listData.value?.totalPages}
                    pageSizes={[10, 20, 30]}
                    showSizePicker
                    onUpdate:page={(num) => {
                      copyValue.value.page = num - 1;
                      syncValue();
                    }}
                    onUpdatePageSize={(size) => {
                      copyValue.value.size = size;
                      copyValue.value.page = 0;
                      syncValue();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});

export default SurveyList;
