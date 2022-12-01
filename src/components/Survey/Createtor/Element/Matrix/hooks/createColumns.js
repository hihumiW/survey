import { h } from "vue";
import { NRadio } from "naive-ui";

const createColumns = (columns, matrixType) => {
  if (!columns?.length) return [];
  const matrixFirstColumn = {
    title: "",
    key: "_matrixFirstColumn",
    render: (_v, rowIndex) => {
      return;
    },
  };
  columns.map((column) => {
    return {
      title: column.text,
      key: column.value,
      render: () => {},
    };
  });
};

const useMatrixTable = (props) => {
  const columns = createColumns(props.question.columns);

  const data = [{}, {}];

  return {
    columns,
    data,
    renderCell,
  };
};

export default useMatrixTable;
