import { computed, unref } from "vue";

export const useParagraphStyleClassName = (question) => {
  return computed(() => {
    const {
      fontSize = "medium",
      textAlign = "left",
      bold = false,
    } = unref(question);
    return [
      "survey-paragraph",
      `text-${fontSize}`,
      `align-${textAlign}`,
      bold ? "text-bold" : "",
    ].join(" ");
  });
};
