import fetchBaseQuery from "../util/fetchBaseQuery";
const fetchQuery = fetchBaseQuery();

export const queryFormTypes = () =>
  fetchQuery("/form/getFormType", {
    method: "post",
  });

export const saveForm = (formData) =>
  fetchQuery("/form/saveForm", {
    method: "post",
    body: JSON.stringify(formData),
  });

export const queryFormDetail = (formId) =>
  fetchQuery(`/form/getForm/${formId}`, {
    method: "post",
  });

export const queryFormList = (data) =>
  fetchQuery("/form/getFormPageList", {
    method: "post",
    body: JSON.stringify(data),
  });

export const deleteForm = (formId) =>
  fetchQuery(`/form/deleteForm/${formId}`, {
    method: "post",
  });

export const queryFormAnswer = (data) =>
  fetchQuery("/project/subjects/get/formRecord", {
    method: "post",
    body: JSON.stringify(data),
  });

export const queryProvinceCity = () =>
  fetchQuery("/crf/dict/get/CrfDict", {
    method: "post",
    body: JSON.stringify({
      type: 1,
    }),
  });
