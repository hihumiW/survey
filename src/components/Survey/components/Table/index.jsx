import { defineComponent } from "vue";
import { NTable } from "naive-ui";
import memoizerific from "memoizerific";
const getColumnProps = (column) => {
  const props = {
    key: column.id,
    style: {},
  };
  column.width && (props.style.width = `${column.width}px`);
  column.minWidth && (props.style.minWidth = `${column.minWidth}px`);
  column.maxWidth && (props.style.maxWidth = `${column.maxWidth}px`);

  return props;
};

const Table = defineComponent({
  setup(props) {
    const renderCell = (cell, rowData, rowIndex, column, columnIndex) => {
      const ctx = {
        rowData,
        rowIndex,
        column,
        columnIndex,
      };
      return typeof cell === "function" ? <cell {...ctx} /> : cell;
    };

    const renderHeader = (columns) => {
      return (
        <tr>
          {columns.map((column, columnIndex) => (
            <th {...getColumnProps(column)} class={column.className}>
              {columns.isPlaceholder
                ? null
                : renderCell(
                    column.header,
                    undefined,
                    undefined,
                    column,
                    columnIndex
                  )}
            </th>
          ))}
        </tr>
      );
    };
    const memolizedRenderHeader = memoizerific(1)(renderHeader);

    const renderRows = (columns, data) => {
      return data.map((rowData, rowIndex) => {
        return (
          <tr key={rowData.key}>
            {columns.map((column, columnIndex) => {
              return (
                <td {...getColumnProps(column)} class={column.className}>
                  {renderCell(
                    column.cell,
                    rowData,
                    rowIndex,
                    column,
                    columnIndex
                  )}
                </td>
              );
            })}
          </tr>
        );
      });
    };

    return () => {
      return (
        <NTable {...props.nTableProps}>
          <thead>{memolizedRenderHeader(props.columns)}</thead>
          <tbody>{renderRows(props.columns, props.data)}</tbody>
        </NTable>
      );
    };
  },
});

export default Table;

Table.props = {
  nTableProps: {
    type: Object,
    default: () => ({
      size: "large",
      bordered: false,
    }),
  },
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
};
