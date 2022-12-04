import { defineComponent } from "vue";
import { NTable } from "naive-ui";

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
    const renderCell = (cell, ctx) => {
      return typeof cell === "function" ? cell(ctx) : cell;
    };

    const renderHeader = () => {
      const { columns } = props;
      return (
        <tr>
          {columns.map((column, columnIndex) => (
            <th {...getColumnProps(column)} class={column.className}>
              {columns.isPlaceholder
                ? null
                : renderCell(column.header, {
                    columnIndex,
                    column,
                    columns,
                  })}
            </th>
          ))}
        </tr>
      );
    };

    const renderRows = () => {
      const { columns, data } = props;
      return data.map((rowData, rowIndex) => {
        return (
          <tr key={rowData.key}>
            {columns.map((column, columnIndex) => {
              return (
                <td {...getColumnProps(column)} class={column.className}>
                  {renderCell(column.cell, {
                    data,
                    rowData,
                    rowIndex,
                    columns,
                    column,
                    columnIndex,
                  })}
                </td>
              );
            })}
          </tr>
        );
      });
    };

    return () => (
      <NTable {...props.nTableProps}>
        <thead>{renderHeader()}</thead>
        <tbody>{renderRows()}</tbody>
      </NTable>
    );
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
