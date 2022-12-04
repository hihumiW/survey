import { defineComponent, ref } from "vue";
import { NInput } from "naive-ui";

import Table from "../../../components/Table";
const defaultData = [
  {
    key: 0,
    name: "John Brown",
    age: "32",
    address: "New York No. 1 Lake Park",
  },
  {
    key: 1,
    name: "Jim Green",
    age: "42",
    address: "London No. 1 Lake Park",
  },
  {
    key: 2,
    name: "Joe Black",
    age: "32",
    address: "Sidney No. 1 Lake Park",
  },
];

const Test = defineComponent({
  setup() {
    const datas = ref(defaultData);
    const column = [
      {
        header() {
          console.log("header render");
          return <div>name</div>;
        },
        key: "name",
        cell({ rowData, rowIndex }) {
          console.log("name render");
          return (
            <NInput
              value={rowData.name}
              onUpdateValue={(v) => {
                datas.value[rowIndex].name = v;
              }}
            />
          );
        },
      },
      {
        title: "Age",
        key: "age",
        cell({ rowData, rowIndex }) {
          return (
            <NInput
              value={rowData.age}
              onUpdateValue={(v) => {
                datas.value[rowIndex].age = v;
              }}
            />
          );
        },
      },
    ];

    return () => <Table data={datas.value} columns={column} />;
  },
});

export default Test;
