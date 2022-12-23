import { computed, defineComponent, unref } from "vue";
import questionCommonProps from "@survey/Render/types/questionCommonProps";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";
import QuestionContainer from "@survey/Render/components/QuestionContainer";
import Table from "@survey/components/Table";
import { NCheckbox, NInput, NRadio, NSelect } from "naive-ui";
import useVisibleIf from "@survey/Render/hooks/useVisibleIf";
import useEditableIf from "@survey/Render/hooks/useEditableIf";
import { useValues } from "@survey/Render/hooks/useValues";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
import useReadOnly from "@survey/Render/hooks/useReadOnly";

const Matrix = defineComponent({
  props: questionCommonProps,
  setup(props) {
    const { question, values, touched, errors } = props;

    const { name } = question;
    const { setNestedObjectValue, removeValuesProperty } = useValues();
    const editableIf = useEditableIf(question, values);
    const visibleIf = useVisibleIf(question, values);
    const questionIndex = useQuestionIndex(question);
    const readOnly = useReadOnly(props);

    const questionValue = computed(() => {
      return unref(values)?.[name];
    });

    const getDatas = () => {
      const { rows } = question;
      return rows?.map(({ value, text }) => ({
        key: value,
        title: text,
      }));
    };

    const getColumns = () => {
      const { columns } = question;
      return [
        {
          id: "RowTitle",
          isPlaceholder: true,
          minWidth: 250,
          maxWidth: 400,
          className: "survey-table-cell-rowTitle survey-table-cell",
          cell: renderRowTitleCell,
        },
      ].concat(
        columns.map((column) => ({
          id: column.value,
          className: "survey-table-cell",
          minWidth: 200,
          maxWidth: 350,
          originalColumn: column,
          header: renderColumnHeader,
          cell: renderColumnCell,
        }))
      );
    };
    const renderRowTitleCell = ({ rowData }) => (
      <span class="inline-block py-2">{rowData.title}</span>
    );
    const renderColumnHeader = ({ column }) => (
      <span class="inline-block py-3">{column.originalColumn.text}</span>
    );

    const handleRadioChange = (rowName, columnName) => {
      setNestedObjectValue(`${name}.${rowName}`, columnName);
    };
    const handleCheckboxChange = (checked, rowName, columnName) => {
      const setPath = `${name}.${rowName}`;
      const oldValue = unref(questionValue)?.[rowName];
      if (oldValue) {
        if (checked) {
          setNestedObjectValue(setPath, [...oldValue, columnName]);
        } else {
          const newValue = oldValue.filter((i) => i !== columnName);
          if (newValue.length) {
            setNestedObjectValue(setPath, newValue);
          } else {
            removeValuesProperty(setPath);
          }
        }
      } else {
        setNestedObjectValue(setPath, [columnName]);
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
      const { id: columnName } = column;
      const CommonProps = {
        disabled: unref(readOnly) || !unref(editableIf),
        size: "large",
      };
      const rowValue = unref(questionValue)?.[rowName];
      switch (question.type) {
        case QuestionTypeEnum.matrixradio:
          return (
            <NRadio
              checked={rowValue === columnName}
              onUpdate:checked={() => handleRadioChange(rowName, columnName)}
              {...CommonProps}
            />
          );
        case QuestionTypeEnum.matrixcheckbox:
          return (
            <NCheckbox
              checked={rowValue?.includes(columnName)}
              onUpdate:checked={(checked) => {
                handleCheckboxChange(checked, rowName, columnName);
              }}
              {...CommonProps}
            />
          );
        case QuestionTypeEnum.matrixinput:
          return (
            <NInput
              class="text-left"
              defaultValue={rowValue?.[columnName]}
              clearable
              onBlur={(e) =>
                handleSelectOrInputValueChange(
                  e.target.value,
                  rowName,
                  columnName
                )
              }
              disabled={unref(readOnly)}
              {...CommonProps}
            />
          );
        case QuestionTypeEnum.matrixdropdown:
          const { originalColumn } = column;
          return (
            <NSelect
              class="text-left"
              labelField="text"
              value={rowValue?.[columnName]}
              options={originalColumn.choices}
              filterable
              clearable
              onUpdate:value={(value) =>
                handleSelectOrInputValueChange(value, rowName, columnName)
              }
              disabled={unref(readOnly)}
              {...CommonProps}
            />
          );
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
          touched={touched}
          errors={errors}
        >
          <div className="overflow-auto">
            <Table class="survey-table" columns={columns} data={data} />
          </div>
        </QuestionContainer>
      );
    };
  },
});

export default Matrix;
