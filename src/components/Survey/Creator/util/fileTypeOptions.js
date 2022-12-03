const imageTypes = [
  {
    label: ".gif",
    value: "image/gif",
  },
  {
    label: ".png",
    value: "image/png",
  },
  {
    label: ".jpg/.jpeg",
    value: "image/jpeg",
  },
  {
    label: ".bmp",
    value: "image/bmp",
  },
];

const docTypes = [
  {
    label: ".doc",
    value: "application/msword",
  },
  {
    label: ".docx",
    value:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    label: ".pdf",
    value: "application/pdf",
  },
  {
    label: ".xls",
    value: "application/vnd.ms-excel",
  },
  {
    label: ".xlsx",
    value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    label: ".ppt",
    value: "application/vnd.ms-powerpoint",
  },
  {
    label: ".pptx",
    value:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  {
    label: ".txt",
    value: "text/plain",
  },
];

const archiveTypes = [
  {
    label: ".rar",
    value: "application/vnd.rar",
  },
  {
    label: "zip",
    value: "application/zip",
  },
  {
    label: ".gzip",
    value: "application/gzip",
  },
  {
    label: ".7z",
    value: "application/x-7z-compressed",
  },
];

const auidoTypes = [
  {
    label: ".mp3",
    value: "audio/mpeg",
  },
  {
    label: ".aac",
    value: "audio/aac",
  },
  {
    label: ".wma",
    value: "audio/x-ms-wma",
  },
  {
    label: ".wav",
    value: "audio/wav",
  },
];

const videoTypes = [
  {
    label: ".mp4",
    value: "video/mp4",
  },
  {
    label: ".mpeg",
    value: "video/mpeg",
  },
  {
    label: ".mov/.qt",
    value: "video/quicktime",
  },

  {
    label: ".3gp",
    value: "video/3gpp",
  },
  {
    label: ".avi",
    value: "video/x-msvideo",
  },
  {
    label: ".webm",
    value: "video/webm",
  },
  {
    label: ".wmv",
    value: "video/x-ms-wmv",
  },
];

export default [
  {
    type: "group",
    label: "Image file",
    key: "imageTypes",
    children: imageTypes,
  },
  {
    type: "group",
    label: "Document file",
    key: "docTypes",
    children: docTypes,
  },
  {
    type: "group",
    label: "Audio file",
    key: "auidoTypes",
    children: auidoTypes,
  },
  {
    type: "group",
    label: "Video file",
    key: "videoTypes",
    children: videoTypes,
  },
  {
    type: "group",
    label: "Archive file",
    key: "archiveTypes",
    children: archiveTypes,
  },
];
