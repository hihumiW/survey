const reg = /\{[\w\u4e00-\u9fa5]+\}/g;
export const excuteExpression = (expression, values) => {
  try {
    const transExpression = expression
      .replace(reg, (val) => {
        const variable = val.match(/[\w\u4e00-\u9fa5]+/)?.[0];
        if (variable) {
          return `values['${variable}']`;
        }
        return "";
      })
      ?.replace("\n", "");

    return Function("values", ` return ${transExpression}`)(values);
  } catch (error) {
    console.log(`输入的表达式${expression}有误：`, error);
    return undefined;
  }
};
