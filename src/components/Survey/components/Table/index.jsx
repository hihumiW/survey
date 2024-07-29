import { Fragment, defineComponent } from "vue";
import { NTable } from "naive-ui";
import memoizerific from "memoizerific";
const getColumnProps = (column) => {
  const props = {
    key: column.id,
    style: {},
  };

  if (column.width) {
    if (typeof column.width === "number") {
      props.style.width = `${column.width}px`;
    } else {
      props.style.width = column.width;
    }
  }
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
      const influencedCellIndexKeys = new Set();
      const setInfluencedCellIndexKeys = (
        rowIndex,
        columnIndex,
        rowSpan = 1,
        columnSpan = 1
      ) => {
        for (let rStep = 0; rStep < (rowSpan || 1); rStep++) {
          for (let cStep = 0; cStep < (columnSpan || 1); cStep++) {
            influencedCellIndexKeys.add(
              `${rowIndex + rStep}_${columnIndex + cStep}`
            );
          }
        }
      };
      return data.map((rowData, rowIndex) => {
        const { key: rowKey } = rowData;
        return (
          <tr key={rowKey}>
            {columns.map((column, columnIndex) => {
              const { id } = column;
              const cellKey = `${rowKey}_${id}`;
              const CellMergedProps = {
                colSpan: 1,
                rowSpan: 1,
              };
              const mergeConfig = props.mergedCells[cellKey];
              const isInfluencedCell = influencedCellIndexKeys.has(
                `${rowIndex}_${columnIndex}`
              );

              if (!!mergeConfig) {
                const { colSpan, rowSpan } = mergeConfig;
                colSpan && (CellMergedProps.colSpan = colSpan);
                rowSpan && (CellMergedProps.rowSpan = rowSpan);
                setInfluencedCellIndexKeys(
                  rowIndex,
                  columnIndex,
                  rowSpan,
                  colSpan
                );
              } else if (isInfluencedCell) return null;
              CellMergedProps.style = {
                "--cellColSpan": CellMergedProps.colSpan,
                "--cellRowSpan": CellMergedProps.rowSpan,
              };
              return (
                <td
                  {...getColumnProps(column)}
                  {...CellMergedProps}
                  class={column.className}
                >
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
      const children = (
        <Fragment>
          <thead>{memolizedRenderHeader(props.columns)}</thead>
          <tbody>{renderRows(props.columns, props.data)}</tbody>
        </Fragment>
      );
      if (props.variant === "NTable") {
        return <NTable {...props.nTableProps}>{children}</NTable>;
      }
      return <table {...props.tableProps}>{children}</table>;
    };
  },
});

export default Table;

Table.props = {
  variant: {
    type: String,
    default: "NTable",
  },
  nTableProps: {
    type: Object,
    default: () => ({
      size: "large",
      singleLine: false,
    }),
  },
  tableProps: {
    type: Object,
    default: () => ({}),
  },
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  mergedCells: {
    type: Object,
    default: () => ({}),
  },
  className: {
    type: String,
    default: () => "",
  },
};
