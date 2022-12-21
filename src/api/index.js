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
