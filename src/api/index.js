import fetchBaseQuery from "../util/fetchBaseQuery";
const fetchQuery = fetchBaseQuery();

export const queryFormTypes = () =>
  fetchQuery("/ctms/api/form/getFormType", {
    method: "post",
  });

export const saveForm = (formData) =>
  fetchQuery("/ctms/api/form/saveForm", {
    method: "post",
    body: JSON.stringify(formData),
  });

export const queryFormDetail = (formId) =>
  fetchQuery(`/ctms/api/form/getForm/${formId}`, {
    method: "post",
  });

export const queryFormList = (data) =>
  fetchQuery("/ctms/api/form/getFormPageList", {
    method: "post",
    body: JSON.stringify(data),
  });

export const deleteForm = (formId) =>
  fetchQuery(`/ctms/api/form/deleteForm/${formId}`, {
    method: "post",
  });

export const copyForm = (formId) =>
  fetchQuery(`/ctms/api/form/copyForm/${formId}`, {
    method: "post",
  });

export const queryFormAnswer = (data) =>
  fetchQuery("/ctms/api/project/subjects/get/formRecord", {
    method: "post",
    body: JSON.stringify(data),
  });

export const queryProvinceCity = () =>
  fetchQuery("/ctms/api/crf/dict/get/CrfDict", {
    method: "post",
    body: JSON.stringify({
      type: 1,
    }),
  });
