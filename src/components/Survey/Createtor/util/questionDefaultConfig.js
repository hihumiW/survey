const commonDefault = {
  indent: 0,
  titleLocation: "top",
  showQuestionNumber: true,
};

const getSelectTypeDefault = () => ({
  ...commonDefault,
  orientation: "vertical",
  choices: [
    {
      value: "item1",
      text: "item1",
    },
    {
      value: "item2",
      text: "item2",
    },
    {
      value: "item3",
      text: "item3",
    },
  ],
});
const getQuestionDefaultConfig = (questionType) => {
  switch (questionType) {
    case "text":
      return {
        inputType: "text",
        inputVariant: "outlined",
        precision: "",
        ...commonDefault,
      };
    case "radiogroup":
    case "checkbox":
    case "dropdown":
      return getSelectTypeDefault();
    case "file":
      return {
        ...commonDefault,
      };
  }
};

export default getQuestionDefaultConfig;
