import { computed, defineComponent, unref } from "vue";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import { gridCellTypeEnum } from "@survey/types/questionTypeEnum";
import QuestionContainer from "@survey/Render/components/QuestionContainer";
import Table from "@survey/components/Table";
import { NSelect } from "naive-ui";
import useVisibleIf from "@survey/Render/hooks/useVisibleIf";
import useEditableIf from "@survey/Render/hooks/useEditableIf";
import { useValues } from "@survey/Render/hooks/useValues";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
import { getInputProps, getRenderInput } from "@survey/hooks/Element/Text";
const Grid = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const { question, values } = props;

    const { name, cells } = question;
    const { setNestedObjectValue, removeValuesProperty } = useValues();
    const editableIf = useEditableIf(question, values);
    const visibleIf = useVisibleIf(question, values);
    const questionIndex = useQuestionIndex(question);

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

    const renderColumnHeader = ({ column }) => (
      <span class="inline-block py-3">{column.originalColumn.text}</span>
    );

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
      const CommonProps = {
        disabled: !unref(editableIf),
        size: "large",
      };
      const cellConfig = cells?.[rowName]?.[columnName] || originalColumn;
      const cellValue = unref(questionValue)?.[rowName]?.[columnName];
      const cellType = cellConfig?.cellType;
      switch (cellType) {
        case gridCellTypeEnum.input:
          const InputProps = getInputProps(cellConfig);
          const RenderInput = getRenderInput(cellConfig.inputType);
          return (
            <RenderInput
              class="text-left"
              defaultValue={cellValue}
              clearable
              onBlur={(e) =>
                handleSelectOrInputValueChange(
                  cellConfig.inputType === "number"
                    ? Number(e.target.value)
                    : e.target.value,
                  rowName,
                  columnName
                )
              }
              {...InputProps}
              {...CommonProps}
            />
          );
        case gridCellTypeEnum.dropdown:
          return (
            <NSelect
              class="text-left"
              labelField="text"
              multiple={cellConfig.multipleChoice}
              placeholder={cellConfig.dropdownPlaceholder}
              consistentMenuWidth={false}
              value={cellValue}
              options={cellConfig.choices}
              filterable
              clearable
              onUpdate:value={(value) =>
                handleSelectOrInputValueChange(value, rowName, columnName)
              }
              {...CommonProps}
            />
          );
        case gridCellTypeEnum.text:
          return <span class="inline-block py-3">{cellConfig.cellText}</span>;
      }
    };

    const data = getDatas();
    const columns = getColumns();

    return () => {
      if (!unref(visibleIf)) return null;

      return (
        <QuestionContainer
          question={question}
          questionIndex={unref(questionIndex)}
        >
          <div className="overflow-auto">
            <Table class="survey-table" columns={columns} data={data} />
          </div>
        </QuestionContainer>
      );
    };
  },
});

export default Grid;
