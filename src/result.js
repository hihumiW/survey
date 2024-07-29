export default {
  title: "测测",
  description: "测测你",
  questions: [
    {
      title: "长治医学院附属和平医院药物临床试验机构",
      type: "paragraph",
      name: "question2",
      fontSize: "large",
      textAlign: "center",
      bold: true,
    },
    {
      title: "药物临床试验申请表",
      type: "paragraph",
      name: "question3",
      fontSize: "xlarge",
      textAlign: "center",
      bold: true,
    },
    {
      title: "",
      type: "radiogroup",
      name: "question4",
      indent: 0,
      titleLocation: "top",
      showQuestionNumber: false,
      orientation: "horizontal",
      choices: [
        {
          text: "普通申请",
          value: "item1",
        },
        {
          text: "加速申请",
          value: "item2",
        },
      ],
    },
    {
      title: "",
      type: "grid",
      name: "question5",
      indent: 0,
      showQuestionNumber: false,
      hideTableHeader: true,
      gridRows: [
        "row1",
        "row2",
        "row3",
        "row4",
        "row5",
        "row6",
        "row7",
        "row8",
        "row9",
        "row10",
        "row11",
        "row12",
        "row13",
        "row14",
        "row15",
        "row16",
        "row17",
        "row18",
        "row19",
        "row20",
        "row21",
        "row22",
        "row23",
        "row24",
        "row25",
        "row26",
      ],
      columns: [
        {
          value: "column1",
          text: "Column1",
          cellType: "text",
          cellText: "",
        },
        {
          value: "column2",
          text: "Column2",
          cellType: "text",
          cellText: "",
        },
        {
          value: "column3",
          text: "Column3",
          cellType: "text",
          cellText: "",
        },
        {
          value: "column4",
          text: "Column4",
          cellType: "text",
          cellText: "",
        },
        {
          value: "column5",
          text: "Column5",
          cellType: "text",
          cellText: "",
        },
        {
          value: "column6",
          text: "Column6",
          cellType: "text",
          cellText: "",
        },
      ],
      cells: {
        row1: {
          column1: {
            cellType: "text",
            cellText: "项目名称",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            colSpan: 5,
            cellAlias: "projectName",
          },
        },
        row2: {
          column1: {
            cellType: "text",
            cellText: "申办单位",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            colSpan: 5,
            cellAlias: "bidPartyCro",
          },
        },
        row3: {
          column1: {
            cellType: "text",
            cellText: "通信地址",
          },
          column2: {
            colSpan: 1,
            rowSpan: 1,
            cellType: "input",
            inputType: "text",
            cellAlias: "bidPartyCroAdress",
          },
          column3: {
            cellType: "text",
            cellText: "联系人",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            cellAlias: "bidPartyCroContact",
          },
          column5: {
            cellType: "text",
            cellText: "固定电话",
          },
          column6: {
            cellType: "input",
            inputType: "text",
            cellAlias: "bidPartyCroTelephone",
          },
        },
        row4: {
          column1: {
            cellType: "text",
            cellText: "CRO名称",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            colSpan: 5,
            cellAlias: "croName",
          },
        },
        row5: {
          column1: {
            cellType: "text",
            cellText: "通信地址",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            cellAlias: "croAdress",
          },
          column3: {
            cellType: "text",
            cellText: "联系人",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            cellAlias: "croContact",
          },
          column5: {
            cellType: "text",
            cellText: "固定电话",
          },
          column6: {
            cellType: "input",
            inputType: "text",
            cellAlias: "croTelephone",
          },
        },
        row6: {
          column1: {
            cellType: "text",
            cellText: "药物名称",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            cellAlias: "drugName",
          },
          column3: {
            cellType: "text",
            cellText: "批件号",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            cellAlias: "batchNo",
          },
          column5: {
            cellType: "text",
            cellText: "类别",
          },
          column6: {
            cellType: "input",
            inputType: "text",
            cellAlias: "category",
          },
        },
        row7: {
          column1: {
            cellType: "text",
            cellText: "国际多中心",
          },
          column2: {
            cellType: "radio",
            choices: [
              {
                text: "是",
                value: "item1",
              },
              {
                text: "否",
                value: "item2",
              },
            ],
            cellAlias: "isInternationalMultiCentering",
          },
          column3: {
            cellType: "text",
            cellText: "拟展开科室",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            cellAlias: "deptCode",
          },
          column5: {
            cellType: "text",
            cellText: "我院拟承担例数",
          },
          column6: {
            cellType: "input",
            inputType: "text",
            cellAlias: "expectedSubjectsNum",
          },
        },
        row8: {
          column1: {
            cellType: "text",
            cellText: "牵头单位",
          },
          column2: {
            colSpan: 2,
            rowSpan: 1,
            cellType: "input",
            inputType: "text",
            cellAlias: "headed",
          },
          column4: {
            cellType: "text",
            cellText: "试验计划起止时间",
            cellAlias: "",
          },
          column5: {
            cellType: "input",
            inputType: "time",
            colSpan: 2,
            cellAlias: "planStartEndTime",
          },
        },
        row9: {
          column1: {
            cellType: "text",
            cellText: "临床试验阶段",
          },
          column2: {
            colSpan: 5,
            rowSpan: 1,
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            showOtherItem: false,
            otherText: "其他",
            cellAlias: "stage",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "STAGE_OPTIONS",
          },
        },
        row10: {
          column1: {
            cellType: "text",
            cellText: "基本信息",
            rowSpan: 9,
          },
          column2: {
            colSpan: 1,
            rowSpan: 1,
            cellType: "text",
            cellText: "试验状态：",
            textAlign: "right",
          },
          column3: {
            colSpan: 4,
            rowSpan: 1,
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            cellAlias: "status",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "STATUS_OPTIONS",
          },
        },
        row11: {
          column2: {
            cellType: "text",
            cellText: "标本外送：",
            textAlign: "right",
          },
          column3: {
            colSpan: 2,
            rowSpan: 1,
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            cellAlias: "isBookmarkDeliver",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "BOOLEAN_OPTIONS",
          },
          column5: {
            cellType: "text",
            cellText: "外送类型：",
            textAlign: "right",
          },
          column6: {
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            cellAlias: "bookmarkDeliverType",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "BOOKMARK_DELIVER_TYPE_OPTIONS",
          },
        },
        row12: {
          column2: {
            cellType: "text",
            cellText: "标本外送区域：",
            textAlign: "right",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            colSpan: 4,
            cellAlias: "bookmarkDeliverAreaType",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "BOOKMARK_DELIVER_AREA_TYPE_OPTIONS",
          },
        },
        row13: {
          column2: {
            cellType: "text",
            cellText: "药物是否免费：",
            textAlign: "right",
          },
          column3: {
            colSpan: 1,
            rowSpan: 1,
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            cellAlias: "isFreeDrug",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "BOOLEAN_OPTIONS",
          },
          column4: {
            cellType: "text",
            cellText: "免费形式：",
            textAlign: "right",
          },
          column5: {
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            colSpan: 2,
            cellAlias: "freeDrugStyle",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "FREE_DRUG_STYLE_OPTIONS",
          },
        },
        row14: {
          column2: {
            cellType: "text",
            cellText: "检查是否免费：",
            textAlign: "right",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            colSpan: 4,
            cellAlias: "isFreeCheck",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "IS_FREE_OPTIONS",
          },
        },
        row15: {
          column2: {
            cellType: "text",
            cellText: "受试者补助：",
            textAlign: "right",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            cellAlias: "isExamineeSubsidy",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "BOOLEAN_OPTIONS",
          },
          column4: {
            cellType: "text",
            cellText: "补助类型：",
            textAlign: "right",
          },
          column5: {
            cellType: "radio",
            choices: [
              {
                text: "交通补助",
                value: "item1",
              },
            ],
            showOtherItem: false,
            otherText: "其他",
            colSpan: 2,
            cellAlias: "examineeSubsidyType",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "EXAMINEE_SUBSIDY_TYPE_OPTIONS",
          },
        },
        row16: {
          column2: {
            cellType: "text",
            cellText: "资料存放年限：",
            textAlign: "right",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            colSpan: 4,
            showOtherItem: false,
            otherText: "其他（（具体年限）",
            cellAlias: "dataSaveYearsType",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "DATA_SAVE_YEARS_TYPE_OPTIONS",
          },
        },
        row17: {
          column2: {
            cellType: "text",
            cellText: "数据处理人员：",
            textAlign: "right",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "item1",
                value: "item1",
              },
            ],
            colSpan: 4,
            cellAlias: "dataHandlePersonType",
            enableExternalLoadOptions: true,
            externalLoadOptionsName: "DATA_HANDLE_PERSON_TYPE_OPTIONS",
          },
        },
        row18: {
          column2: {
            cellType: "text",
            cellText: "数据统计单位：",
            textAlign: "right",
          },
          column3: {
            cellType: "input",
            inputType: "text",
            colSpan: 4,
            cellAlias: "dataHandleOrg",
          },
        },
        row19: {
          column1: {
            cellType: "text",
            cellText: "提交材料清单",
            rowSpan: 2,
          },
          column2: {
            colSpan: 5,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "submitDataList",
          },
        },
        row20: {
          column2: {
            cellType: "text",
            cellText: "机构办公室秘书审核签字：",
            textAlign: "right",
          },
          column3: {
            cellType: "input",
            inputType: "text",
            colSpan: 2,
          },
          column5: {
            colSpan: 2,
            rowSpan: 1,
            cellType: "input",
            inputType: "date",
          },
        },
        row21: {
          column1: {
            cellType: "text",
            cellText: "专业负责任及主要研究者（PI）意见",
            rowSpan: 4,
          },
          column2: {
            colSpan: 5,
            rowSpan: 1,
            cellType: "blanks",
            blankSettings: [
              {
                id: "g5tpqz94nkd",
                type: "text",
              },
              {
                id: "xcs9kia8w8",
                type: "text",
              },
              {
                id: "driaaogovpm",
                type: "text",
              },
              {
                id: "zk8h1l3f5m",
                type: "text",
              },
              {
                id: "rtkj3cp2cwc",
                type: "text",
              },
            ],
            blankContent: {
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "专业目前承担在研项目",
                        type: "text",
                        version: 1,
                      },
                      { type: "blankNode", blankId: "g5tpqz94nkd", version: 1 },
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: " 项,在研入组",
                        type: "text",
                        version: 1,
                      },
                      { type: "blankNode", blankId: "xcs9kia8w8", version: 1 },
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: " 项, 本适应症在研入组阶段",
                        type: "text",
                        version: 1,
                      },
                      { type: "blankNode", blankId: "driaaogovpm", version: 1 },
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: " 项，专业具备资质",
                        type: "text",
                        version: 1,
                      },
                      { type: "blankNode", blankId: "zk8h1l3f5m", version: 1 },
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: " 人，研究者资质",
                        type: "text",
                        version: 1,
                      },
                      { type: "blankNode", blankId: "rtkj3cp2cwc", version: 1 },
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: " 人。",
                        type: "text",
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "paragraph",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "root",
                version: 1,
              },
            },
            cellAlias: "PIAdvice",
          },
        },
        row22: {
          column2: {
            cellType: "blanks",
            blankSettings: [
              {
                id: "ghersmmzm8g",
                type: "text",
              },
            ],
            colSpan: 5,
            blankContent: {
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: "我",
                        type: "text",
                        version: 1,
                      },
                      { type: "blankNode", blankId: "ghersmmzm8g", version: 1 },
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: " 承担该临床研究。",
                        type: "text",
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "paragraph",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "root",
                version: 1,
              },
            },
            cellAlias: "PIAdvice1",
          },
        },
        row23: {
          column2: {
            cellType: "text",
            cellText: "PI签字：",
            textAlign: "right",
          },
          column3: {
            cellType: "input",
            inputType: "text",
            colSpan: 2,
          },
          column5: {
            cellType: "input",
            inputType: "date",
            colSpan: 2,
          },
        },
        row24: {
          column2: {
            cellType: "text",
            cellText: "专业负责人签字：",
            textAlign: "right",
          },
          column3: {
            cellType: "input",
            inputType: "text",
            colSpan: 2,
          },
          column5: {
            colSpan: 2,
            rowSpan: 1,
            cellType: "input",
            inputType: "date",
          },
        },
        row25: {
          column1: {
            cellType: "text",
            cellText: "机构办公室审批意见",
            rowSpan: 2,
          },
          column2: {
            cellType: "text",
            cellText: "",
            colSpan: 5,
          },
        },
        row26: {
          column2: {
            cellType: "text",
            cellText: "办公室主任:",
            textAlign: "right",
          },
          column3: {
            cellType: "input",
            inputType: "text",
            colSpan: 2,
          },
          column5: {
            cellType: "input",
            inputType: "date",
            colSpan: 2,
          },
        },
      },
    },
  ],
  categoryId: 200,
};
