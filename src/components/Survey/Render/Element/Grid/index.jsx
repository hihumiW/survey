import { computed, defineComponent, unref } from "vue";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import { gridCellTypeEnum, textTypeEnum } from "@survey/types/questionTypeEnum";
import QuestionContainer from "@survey/Render/components/QuestionContainer";
import Table from "@survey/components/Table";
import { NSelect, NButton } from "naive-ui";
import useVisibleIf from "@survey/Render/hooks/useVisibleIf";
import useEditableIf from "@survey/Render/hooks/useEditableIf";
import { useValues } from "@survey/Render/hooks/useValues";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
import { getInputProps, getRenderInput } from "@survey/hooks/Element/Text";
import useReadOnly from "@survey/Render/hooks/useReadOnly";
import useProvinceCity from "@/hooks/useProvinceCity";
import ProvinceSelectWrapper from "./ProvinceSelectWrapper";
import Checkbox from "./Checkbox";
import { forEachCell } from "@survey/utils";
import { getOtherTextValueFieldName } from "@survey/Render/Element/Select";
import Blanks from "./Blanks";
import Radio from "./Radio";

const Grid = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const { question, values, touched, errors } = props;
    const { name, cells, hideTableHeader } = question;
    const { setNestedObjectValue, removeValuesProperty, externalOptions } =
      useValues();
    const editableIf = useEditableIf(question, values);
    const visibleIf = useVisibleIf(question, values);
    const questionIndex = useQuestionIndex(question);
    const readOnly = useReadOnly(props);
    const shouldLoadProvinceData = computed(() => {
      const { columns, cells } = question;
      const fn = (config) => config.inputType === textTypeEnum.provinceCity;
      if (columns?.some(fn)) return true;
      const flagMessage = "has province";
      try {
        forEachCell(cells, (cell) => {
          if (fn(cell)) {
            throw Error(flagMessage);
          }
        });
      } catch (e) {
        return e.message === flagMessage;
      }
      return false;
    });
    const { province, isProvinceLoading, provinceError, provinceRefecth } =
      useProvinceCity(shouldLoadProvinceData);

    const questionValue = computed(() => {
      return unref(values)?.[name];
    });

    const getDatas = () => {
      const { gridRows } = question;
      return gridRows?.map((row) => ({
        key: row,
      }));
    };

    const getColumns = () => {
      const { columns } = question;

      return columns.map((column) => ({
        id: column.value,
        className: "survey-table-cell",
        minWidth: 200,
        maxWidth: 350,
        originalColumn: column,
        header: renderColumnHeader,
        cell: renderColumnCell,
      }));
    };

    const mergedCells = computed(() => {
      const cells = {};
      forEachCell(props?.question?.cells, (cell, rowKey, columnKey) => {
        if (cell.colSpan || cell.rowSpan) {
          const cellKey = `${rowKey}_${columnKey}`;
          cells[cellKey] = cell;
        }
      });
      return cells;
    });
    const renderColumnHeader = ({ column }) => (
      <span class="inline-block py-3">{column.originalColumn.text}</span>
    );

    const handleAliasCellValueChange = (val, alias) => {
      if (val) {
        setNestedObjectValue(alias, val);
      } else {
        removeValuesProperty(alias);
      }
    };
    const handleSelectOrInputValueChange = (val, rowName, columnName) => {
      const setPath = `${name}.${rowName}.${columnName}`;
      if (val) {
        setNestedObjectValue(setPath, val);
      } else {
        removeValuesProperty(setPath);
      }
    };

    const renderColumnCell = ({ column, rowData }) => {
      const { key: rowName } = rowData;
      const { id: columnName, originalColumn } = column;
      const cellInfo = cells?.[rowName]?.[columnName] || {};
      const cellConfig = { ...originalColumn, ...cellInfo };
      const { cellAlias } = cellConfig;
      const cellValue = cellAlias
        ? unref(values)?.[cellAlias]
        : unref(questionValue)?.[rowName]?.[columnName];
      const cellType = cellConfig.cellType;
      const handleValueChange = (val) => {
        if (cellAlias) {
          handleAliasCellValueChange(val, cellAlias);
        } else {
          handleSelectOrInputValueChange(val, rowName, columnName);
        }
      };
      const CommonProps = {
        value: cellValue,
        "onUpdate:value": handleValueChange,
        disabled: unref(readOnly) || !unref(editableIf),
        size: "large",
        clearable: true,
        filterable: true,
        class: cellType !== gridCellTypeEnum.text ? "text-left" : undefined,
      };

      switch (cellType) {
        case gridCellTypeEnum.input:
          const InputProps = getInputProps(cellConfig);
          const RenderInput = getRenderInput(cellConfig.inputType);
          InputProps.class = "text-left";
          if (cellConfig.inputType === textTypeEnum.provinceCity) {
            return (
              <ProvinceSelectWrapper
                avaliableProvinceOptions={cellConfig.avaliableProvinceOptions}
                provinceData={unref(province)}
              >
                {{
                  default: (avaliableProvinceData) => {
                    return (
                      <RenderInput
                        options={unref(avaliableProvinceData)}
                        valueField="dictId"
                        labelField="name"
                        {...InputProps}
                        {...CommonProps}
                      />
                    );
                  },
                }}
              </ProvinceSelectWrapper>
            );
          }
          if (
            [textTypeEnum.number, textTypeEnum.text].includes(
              cellConfig.inputType
            )
          ) {
            InputProps.onBlur = (e) => {
              if (cellConfig.inputType === "number") {
                handleValueChange(Number(e.target.value));
              }
            };
          }
          return <RenderInput {...InputProps} {...CommonProps} />;
        case gridCellTypeEnum.dropdown:
          return (
            <NSelect
              labelField="text"
              multiple={cellConfig.multipleChoice}
              placeholder={cellConfig.dropdownPlaceholder}
              consistentMenuWidth={false}
              options={cellConfig.choices}
              {...CommonProps}
            />
          );
        case gridCellTypeEnum.text:
          return (
            <p style={{ textAlign: cellConfig.textAlign || "left" }}>
              <span class="inline-block py-3">{cellConfig.cellText}</span>
            </p>
          );
        case gridCellTypeEnum.checkbox:
        case gridCellTypeEnum.radio:
          const otherTextField = cellAlias
            ? getOtherTextValueFieldName(cellAlias)
            : getOtherTextValueFieldName(columnName);
          const otherTextValue = cellAlias
            ? unref(values)?.[otherTextField]
            : unref(questionValue)?.[rowName]?.[otherTextField];
          const onOtherTextValueChange = (val) => {
            if (cellAlias) {
              handleAliasCellValueChange(val, otherTextField);
            } else {
              handleSelectOrInputValueChange(val, rowName, otherTextField);
            }
          };

          const PassPrpos = {
            ...CommonProps,
            cellConfig,
            otherTextValue,
            externalOptions,
            onOtherTextValueChange: onOtherTextValueChange,
          };
          return cellType === gridCellTypeEnum.checkbox ? (
            <Checkbox {...PassPrpos} />
          ) : (
            <Radio {...PassPrpos} />
          );
        case gridCellTypeEnum.blanks:
          const onBlankValueChange = (blankId, value) => {
            if (cellAlias) {
              handleAliasCellValueChange(value, `${cellAlias}.${blankId}`);
            } else {
              handleSelectOrInputValueChange(
                value,
                rowName,
                `${columnName}.${blankId}`
              );
            }
          };
          return (
            <Blanks
              cellInfo={cellInfo}
              cellValue={cellValue}
              disabled={CommonProps.disabled}
              onBlankValueChange={onBlankValueChange}
            />
          );
      }
      return <p>unknow grid cell type</p>;
    };

    const renderTableContent = () => {
      if (unref(isProvinceLoading)) {
        return <p>获取省市数据中...</p>;
      }
      if (unref(provinceError)) {
        <div class="text-center">
          <NButton onClick={() => unref(provinceRefecth)()} type="error">
            省市数据获取失败, 重新获取
          </NButton>
        </div>;
      }
      if (unref(shouldLoadProvinceData) && !unref(province)?.length) {
        return <div>没有省市数据</div>;
      }

      return (
        <div className="overflow-auto">
          <Table
            class={
              hideTableHeader
                ? "survey-table render hideTableHeader"
                : "survey-table"
            }
            columns={columns}
            data={data}
            mergedCells={unref(mergedCells)}
          />
        </div>
      );
    };

    const data = getDatas();
    const columns = getColumns();

    return () => {
      if (!unref(visibleIf)) return null;
      return (
        <QuestionContainer
          question={question}
          questionIndex={unref(questionIndex)}
          touched={touched}
          errors={errors}
        >
          {renderTableContent()}
        </QuestionContainer>
      );
    };
  },
});

export default Grid;
