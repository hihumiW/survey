export default {
  title: "长治医学院附属和平医院药物临床试验机构药物临床试验申请表",
  description: "项目立项",
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
            textAlign: "center",
          },
          column2: {
            colSpan: 5,
            rowSpan: undefined,
            cellType: "valueText",
            cellAlias: "projectName",
          },
        },
        row2: {
          column1: {
            cellType: "text",
            cellText: "申办单位",
            textAlign: "center",
          },
          column2: {
            colSpan: 5,
            rowSpan: undefined,
            cellType: "valueText",
            cellAlias: "bidPartyCro",
          },
        },
        row3: {
          column1: {
            cellType: "text",
            cellText: "通信地址",
            textAlign: "center",
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
            textAlign: "center",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            cellAlias: "bidPartyCroContact",
          },
          column5: {
            cellType: "text",
            cellText: "固定电话",
            textAlign: "center",
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
            textAlign: "center",
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
            cellText: "通信地址(CRO)",
            textAlign: "center",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            cellAlias: "croAdress",
          },
          column3: {
            cellType: "text",
            cellText: "联系人(CRO)",
            textAlign: "center",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            cellAlias: "croContact",
          },
          column5: {
            cellType: "text",
            cellText: "固定电话(CRO)",
            textAlign: "center",
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
            textAlign: "center",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            cellAlias: "drugName",
          },
          column3: {
            cellType: "text",
            cellText: "批件号",
            textAlign: "center",
          },
          column4: {
            cellType: "input",
            inputType: "textarea",
            cellAlias: "batchNo",
          },
          column5: {
            cellType: "text",
            cellText: "类别",
            textAlign: "center",
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
            textAlign: "center",
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
            textAlign: "center",
          },
          column4: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "valueText",
            cellAlias: "deptCode",
          },
          column5: {
            cellType: "text",
            cellText: "我院拟承担例数",
            textAlign: "center",
          },
          column6: {
            cellType: "input",
            inputType: "number",
            cellAlias: "expectedSubjectsNum",
          },
        },
        row8: {
          column1: {
            cellType: "text",
            cellText: "牵头单位",
            textAlign: "center",
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
            textAlign: "center",
          },
          column5: {
            cellType: "input",
            inputType: "daterange",
            colSpan: 2,
            cellAlias: "planStartEndTime",
          },
        },
        row9: {
          column1: {
            cellType: "text",
            cellText: "临床试验阶段",
            textAlign: "center",
          },
          column2: {
            colSpan: 5,
            rowSpan: 1,
            cellType: "radio",
            choices: [
              {
                text: "Ⅰ期临床试验",
                value: "item1",
              },
              {
                text: "ⅠⅠ期临床试验",
                value: "item2",
              },
              {
                text: "ⅠⅠⅠ期临床试验",
                value: "item3",
              },
              {
                text: "ⅠV期临床试验",
                value: "item4",
              },
              {
                text: "上市后验证",
                value: "item5",
              },
              {
                text: "生物等效性试验",
                value: "item6",
              },
              {
                text: "耐受性试验",
                value: "item7",
              },
            ],
            showOtherItem: true,
            otherText: "其他",
            cellAlias: "stage",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
        },
        row10: {
          column1: {
            cellType: "text",
            cellText: "基本信息",
            rowSpan: 9,
            textAlign: "center",
          },
          column2: {
            colSpan: 1,
            rowSpan: 1,
            cellType: "text",
            cellText: "试验状态",
            textAlign: "center",
          },
          column3: {
            colSpan: 4,
            rowSpan: 1,
            cellType: "radio",
            choices: [
              {
                text: "全国已启动(增加单位)",
                value: "item1",
              },
              {
                text: "全国未启动",
                value: "item2",
              },
            ],
            cellAlias: "status",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
        },
        row11: {
          column2: {
            cellType: "text",
            cellText: "标本外送",
            textAlign: "center",
          },
          column3: {
            colSpan: 1,
            rowSpan: 1,
            cellType: "radio",
            choices: [
              {
                text: "否",
                value: "item1",
              },
              {
                text: "是",
                value: "item2",
              },
            ],
            cellAlias: "isBookmarkDeliver",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
          column5: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "radio",
            choices: [
              {
                text: "病理",
                value: "item1",
              },
              {
                text: "血液",
                value: "item2",
              },
              {
                text: "其他",
                value: "item3",
              },
            ],
            orientation: "horizontal",
            cellAlias: "bookmarkDeliverType",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
          column4: {
            cellType: "text",
            cellText: "外送类型",
            textAlign: "center",
          },
        },
        row12: {
          column2: {
            cellType: "text",
            cellText: "标本外送区域",
            textAlign: "center",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "国内",
                value: "item1",
              },
              {
                text: "国外(包括境内外资企业)",
                value: "item2",
              },
            ],
            colSpan: 4,
            cellAlias: "bookmarkDeliverAreaType",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
        },
        row13: {
          column2: {
            cellType: "text",
            cellText: "药物是否免费",
            textAlign: "center",
          },
          column3: {
            colSpan: 1,
            rowSpan: 1,
            cellType: "radio",
            choices: [
              {
                text: "否",
                value: "item1",
              },
              {
                text: "是",
                value: "item2",
              },
            ],
            cellAlias: "isFreeDrug",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
          column4: {
            cellType: "text",
            cellText: "免费形式",
            textAlign: "center",
          },
          column5: {
            cellType: "radio",
            choices: [
              {
                text: "申办者提供药物",
                value: "item1",
              },
              {
                text: "提供费用",
                value: "item2",
              },
            ],
            colSpan: 2,
            cellAlias: "freeDrugStyle",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
        },
        row14: {
          column2: {
            cellType: "text",
            cellText: "检查是否免费",
            textAlign: "center",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "否",
                value: "item1",
              },
              {
                text: "是",
                value: "item2",
              },
              {
                text: "部分减免",
                value: "item3",
              },
            ],
            colSpan: 4,
            cellAlias: "isFreeCheck",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
        },
        row15: {
          column2: {
            cellType: "text",
            cellText: "受试者补助",
            textAlign: "center",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "否",
                value: "item1",
              },
              {
                text: "是",
                value: "item2",
              },
            ],
            cellAlias: "isExamineeSubsidy",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
          column4: {
            cellType: "text",
            cellText: "补助类型",
            textAlign: "center",
          },
          column5: {
            cellType: "radio",
            choices: [
              {
                text: "交通补助",
                value: "item1",
              },
              {
                text: "采血补偿",
                value: "item2",
              },
            ],
            showOtherItem: false,
            otherText: "其他",
            colSpan: 2,
            cellAlias: "examineeSubsidyType",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
        },
        row16: {
          column2: {
            cellType: "text",
            cellText: "资料存放年限",
            textAlign: "center",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "试验结束后5年",
                value: "item1",
              },
            ],
            colSpan: 4,
            showOtherItem: true,
            otherText: "其他（具体年限）",
            cellAlias: "dataSaveYearsType",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
        },
        row17: {
          column2: {
            cellType: "text",
            cellText: "数据处理人员",
            textAlign: "center",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "委托专业医学统计人员统计",
                value: "item1",
              },
              {
                text: "由经过统计培训的研究者统计",
                value: "item2",
              },
            ],
            colSpan: 4,
            cellAlias: "dataHandlePersonType",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
          },
        },
        row18: {
          column2: {
            cellType: "text",
            cellText: "数据统计单位",
            textAlign: "center",
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
            textAlign: "center",
          },
          column2: {
            colSpan: 5,
            rowSpan: undefined,
            cellType: "input",
            inputType: "textarea",
            cellAlias: "submitDataList",
          },
        },
        row20: {
          column2: {
            cellType: "text",
            cellText: "机构办公室秘书审核签字",
            textAlign: "center",
          },
          column3: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "imageUpload",
            cellAlias: "institutionalOfficeSign",
          },
          column5: {
            colSpan: 2,
            rowSpan: 1,
            cellType: "input",
            inputType: "date",
            cellAlias: "institutionalOfficeSignDate",
          },
        },
        row21: {
          column1: {
            cellType: "text",
            cellText: "专业负责任及主要研究者（PI）意见",
            rowSpan: 4,
            textAlign: "center",
          },
          column2: {
            colSpan: 5,
            rowSpan: 1,
            cellType: "blanks",
            blankSettings: [
              {
                id: "blank1",
                type: "text",
              },
              {
                id: "blank2",
                type: "text",
              },
              {
                id: "blank3",
                type: "text",
              },
              {
                id: "blank4",
                type: "text",
              },
              {
                id: "blank5",
                type: "text",
              },
            ],
            blankContent:
              '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"专业目前承担在研项目","type":"text","version":1},{"type":"blankNode","blankId":"blank1","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 项,在研入组","type":"text","version":1},{"type":"blankNode","blankId":"blank2","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 项, 本适应症在研入组阶段","type":"text","version":1},{"type":"blankNode","blankId":"blank3","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 项，专业具备资质","type":"text","version":1},{"type":"blankNode","blankId":"blank4","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 人，研究者资质","type":"text","version":1},{"type":"blankNode","blankId":"blank5","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 人。","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
            cellAlias: "expersStatus",
          },
        },
        row22: {
          column2: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "text",
            cellText: "我是否同意承担该临床研究",
            textAlign: "center",
          },
          column4: {
            colSpan: 3,
            rowSpan: undefined,
            cellType: "radio",
            choices: [
              {
                text: "同意",
                value: "item1",
              },
              {
                text: "不同意",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            cellAlias: "agreeOptions",
          },
        },
        row23: {
          column2: {
            cellType: "text",
            cellText: "PI签字",
            textAlign: "center",
          },
          column3: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "imageUpload",
            cellAlias: "PISign",
          },
          column5: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "input",
            inputType: "date",
            cellAlias: "PISignDate",
          },
        },
        row24: {
          column2: {
            cellType: "text",
            cellText: "专业负责人签字",
            textAlign: "center",
          },
          column3: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "imageUpload",
            cellAlias: "expertSign",
          },
          column5: {
            colSpan: 2,
            rowSpan: 1,
            cellType: "input",
            inputType: "date",
            cellAlias: "expertSignDate",
          },
        },
        row25: {
          column1: {
            cellType: "text",
            cellText: "机构办公室审批意见",
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            colSpan: 5,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "officeAdvice",
          },
        },
        row26: {
          column2: {
            cellType: "text",
            cellText: "办公室主任",
            textAlign: "center",
          },
          column3: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "imageUpload",
            cellAlias: "officeSign",
          },
          column5: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "input",
            inputType: "date",
            cellAlias: "officeSignDate",
          },
        },
      },
    },
  ],
  categoryId: 200,
};
