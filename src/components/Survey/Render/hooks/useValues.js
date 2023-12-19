import {
  inject,
  provide,
  ref,
  watch,
  onUnmounted,
  unref,
  onMounted,
} from "vue";
import { cloneDeep } from "lodash-es";
import objectPath from "object-path";

const valuesInjectionKey = Symbol("values");

export const useValuesInit = (config) => {
  const { defaultValue = {}, schema, onSubmit } = config;
  const values = ref(cloneDeep(defaultValue));

  window.cc = values;
  const errors = ref(null);
  const touched = ref({});

  const setFieldValue = (field, value) => {
    touched.value[field] = true;
    if (value) {
      values.value[field] = value;
    } else {
      delete values.value[field];
    }
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
    return schema
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
          if (questionPath in errorPreview) {
            errorPreview[questionPath] += ` , ${message}`;
          } else {
            errorPreview[questionPath] = message;
          }

          return errorPreview;
        }, {});
        errors.value = valuesError;
      });
  };
  const validateField = (questionName) => {
    return schema
      .validateAt(questionName, values.value, {
        abortEarly: false,
      })
      .then(() => {
        if (unref(errors)) {
          delete errors.value[questionName];
        }
      })
      .catch((e) => {
        if (unref(errors)) {
          errors.value[questionName] = e.inner
            .map((e) => e.message)
            .join(" , ");
        }
      });
  };

  const watchRequiredValueChange = () => {
    return schema._nodes.map((questionName) => {
      return watch(
        () => values.value[questionName],
        () => validateField(questionName),
        {
          deep: true,
        }
      );
    });
  };
  const stops = watchRequiredValueChange();
  onUnmounted(() => stops.forEach((stop) => stop()));

  let isAllTouchedSeted = false;
  const setAllTouched = () => {
    if (isAllTouchedSeted) return;
    schema._nodes.map((questionName) => {
      touched.value[questionName] = true;
    });
    isAllTouchedSeted = true;
  };

  const handleSubmit = () => {
    setAllTouched();
    validateValue().then(() => {
      !errors.value && onSubmit && onSubmit(values.value);
    });
  };

  onMounted(() => {
    window.triggerSubmit = (cb) => {
      setAllTouched();
      validateValue().then(() => {
        cb(unref(errors), unref(values));
      });
    };
  });
  onUnmounted(() => {
    window.triggerSubmit = null;
  });

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
