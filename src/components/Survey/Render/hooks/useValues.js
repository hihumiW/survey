import { inject, provide, ref, watch, onUnmounted } from "vue";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";
import objectPath from "object-path";

const valuesInjectionKey = Symbol("values");

export const useValuesInit = (config) => {
  const values = ref({});
  const errors = ref(null);
  const touched = ref({});

  window.errors = errors;
  window.values = values;

  const setFieldValue = (field, value) => {
    touched.value[field] = true;
    values.value[field] = value;
  };

  const setNestedObjectValue = (setPath, setValue) => {
    const questionName = setPath.split(".")[0];
    touched.value[questionName] = true;
    objectPath.set(values.value, setPath, setValue);
  };

  const removeValuesProperty = (removePath) => {
    const questionName = removePath.split(".")[0];
    touched.value[questionName] = true;
    objectPath.del(values.value, removePath);
  };

  const provideData = {
    values,
    setFieldValue,
    setNestedObjectValue,
    removeValuesProperty,
  };
  provide(valuesInjectionKey, provideData);

  const validateValue = () => {
    config.schema
      .validate(values.value, {
        abortEarly: false,
      })
      .then((resp) => {
        errors.value = null;
      })
      .catch((error) => {
        const valuesError = error.inner.reduce((errorPreview, e) => {
          const { path, message } = e;
          const questionPath = path.split(".")[0];
          errorPreview[questionPath] = message;
          return errorPreview;
        }, {});
        errors.value = valuesError;
      });
  };
  const validateSigleField = (questionName) => {
    config.schema
      .validateAt(questionName, values.value)
      .then(() => {
        console.log("no err");
        delete errors.value[questionName];
      })
      .catch((e) => {
        errors.value[questionName] = e.message;
      });
  };

  const watchValueChange = () => {
    return config.schema._nodes.map((node) => {
      return watch(
        () => values.value[node],
        () => validateSigleField(node)
      );
    });
  };
  const stops = watchValueChange();
  onUnmounted(() => stops.forEach((stop) => stop()));

  let isAllTouchedSeted = false;
  const setAllTouched = () => {
    if (isAllTouchedSeted) return;
    config.schema._nodes.map((node) => {
      touched.value[node] = true;
    });
    isAllTouchedSeted = true;
  };

  const handleSubmit = () => {
    setAllTouched();
    validateValue();
    !errors.value && config.onSubmit && config.onSubmit(values.value);
  };

  return {
    ...provideData,
    errors,
    touched,
    handleSubmit,
  };
};

export const useValues = () => {
  return inject(valuesInjectionKey, () => ({}));
};

const forEachQuestions = (questions, fn) => {
  if (!questions.length || !fn) return;
  questions.forEach((question) => {
    fn(question);
    if (
      question.type === QuestionTypeEnum.panel &&
      question.questions?.length
    ) {
      forEachQuestions(question.questions, fn);
    }
  });
};
