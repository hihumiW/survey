export default {
  title: "项目启动申请表",
  description: "",
  questions: [
    {
      title: "项目启动申请表",
      type: "paragraph",
      name: "question5",
      fontSize: "xlarge",
      textAlign: "center",
      bold: true,
    },
    {
      title: "本中心项目编号：",
      type: "text",
      name: "question1",
      inputType: "text",
      inputVariant: "standard",
      precision: -1,
      indent: 0,
      titleLocation: "left",
      showQuestionNumber: false,
    },
    {
      title: "",
      type: "grid",
      name: "question2",
      indent: 0,
      showQuestionNumber: false,
      hideTableHeader: true,
      gridRows: ["row1", "row2", "row3", "row4", "row5", "row6", "row7"],
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
          colWidth: 400,
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
          colWidth: 340,
        },
        {
          value: "column5",
          text: "Column5",
          cellType: "text",
          cellText: "",
          colWidth: 200,
        },
        {
          value: "column6",
          text: "Column6",
          cellType: "text",
          cellText: "",
          colWidth: 200,
        },
      ],
      cells: {
        row1: {
          column1: {
            cellType: "text",
            cellText: "项目名称",
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
            cellText: "NMPA批件/通知书号",
          },
          column3: {
            cellType: "text",
            cellText: "承接科室",
          },
          column2: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "NMPA_No",
          },
          column4: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "valueText",
            cellAlias: "deptCode",
          },
          column5: {
            cellType: "blanks",
            blankSettings: [
              {
                id: "ppugbfbig4l",
                type: "text",
              },
              {
                id: "6bcyztv2pl",
                type: "text",
              },
            ],
            blankContent:
              '{"root":{"children":[{"children":[{"type":"blankNode","blankId":"ppugbfbig4l","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 期 ","type":"text","version":1},{"type":"blankNode","blankId":"6bcyztv2pl","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 例","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
            colSpan: 2,
          },
        },
        row3: {
          column1: {
            cellType: "text",
            cellText: "申办方",
          },
          column3: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "text",
            cellText: "CRO(简写)",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            colSpan: 3,
            cellAlias: "CROName",
          },
          column2: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "valueText",
            cellAlias: "bidPartyCtmsAccount",
          },
        },
        row4: {
          column1: {
            cellType: "text",
            cellText: "组长单位名称",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            cellAlias: "teamLeaderName",
          },
          column3: {
            cellType: "text",
            cellText: "组长启动时间",
          },
          column4: {
            cellType: "input",
            inputType: "date",
            colSpan: 3,
            cellAlias: "teamStartDate",
          },
        },
        row5: {
          column1: {
            cellType: "text",
            cellText: "启前CRA姓名/电话",
          },
          column2: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "beforeStartCRAName",
          },
          column3: {
            cellType: "text",
            cellText: "CRA监查计划",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            colSpan: 3,
            cellAlias: "CRAsupervisePlan",
          },
        },
        row6: {
          column1: {
            cellType: "text",
            cellText: "启后CRA姓名/电话",
          },
          column2: {
            cellType: "input",
            inputType: "text",
            cellAlias: "afterStartCARName",
          },
          column3: {
            cellType: "text",
            cellText: "PM姓名/电话",
          },
          column4: {
            cellType: "input",
            inputType: "text",
            colSpan: 3,
            cellAlias: "PMName",
          },
        },
        row7: {
          column1: {
            cellType: "text",
            cellText: "CRC姓名/电话",
          },
          column2: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "CRAName",
          },
          column3: {
            cellType: "text",
            cellText: "CRC项目信息",
          },
          column4: {
            cellType: "blanks",
            blankSettings: [
              {
                id: "dx6s009bf0h",
                type: "text",
              },
              {
                id: "ij0y04ok2di",
                type: "text",
              },
            ],
            colSpan: 3,
            blankContent:
              '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"在本院已承担","type":"text","version":1},{"type":"blankNode","blankId":"dx6s009bf0h","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 个项目,涉及","type":"text","version":1},{"type":"blankNode","blankId":"ij0y04ok2di","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" 个科室","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
            cellAlias: "CRAProjectInfo",
          },
        },
      },
    },
    {
      title: "",
      type: "grid",
      name: "question3",
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
        "row27",
        "row28",
        "row29",
        "row30",
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
          colWidth: 200,
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
          cellType: "input",
          inputType: "date",
          colWidth: 220,
        },
        {
          value: "column5",
          text: "Column5",
          cellType: "text",
          cellText: "",
          colWidth: 200,
        },
        {
          value: "column6",
          text: "Column6",
          cellType: "text",
          cellText: "",
          colWidth: 220,
        },
        {
          value: "column7",
          text: "Column7",
          cellType: "text",
          cellText: "",
        },
      ],
      cells: {
        row1: {
          column1: {
            cellType: "text",
            cellText: "名称",
          },
          column2: {
            cellType: "text",
            cellText: "内容时间",
            colSpan: 2,
          },
          column4: {
            cellType: "text",
            cellText: "日期",
          },
          column5: {
            cellType: "text",
            cellText: "签字",
          },
          column6: {
            cellType: "text",
            cellText: "备注",
            colSpan: 2,
          },
        },
        row2: {
          column6: {
            colSpan: 2,
          },
          column1: {
            cellType: "radio",
            choices: [
              {
                text: "药物",
                value: "item1",
              },
              {
                text: "器械",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
            cellAlias: "type",
          },
          column2: {
            cellType: "text",
            cellText: "接收时间",
            textAlign: "center",
            cellAlias: "",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "reciveTime",
          },
          column4: {
            cellAlias: "row1Date",
          },
        },
        row3: {
          column6: {
            colSpan: null,
            rowSpan: 1,
            cellType: "text",
            cellText: "方案讨论会时间",
            textAlign: "center",
          },
          column1: {
            cellType: "text",
            cellText: "CRC面试",
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "面试人",
            textAlign: "center",
          },
          column3: {
            colSpan: undefined,
            rowSpan: 1,
            cellType: "input",
            inputType: "text",
            cellAlias: "interviewer",
          },
          column7: {
            cellType: "input",
            inputType: "date",
            cellAlias: "planDiscussDate",
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row2Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row4: {
          column2: {
            cellType: "text",
            cellText: "面试时间",
            textAlign: "center",
            cellAlias: "",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "interviewDate",
          },
          column6: {
            cellType: "text",
            cellText: "问题落实人签字",
            textAlign: "center",
            cellAlias: "",
          },
          column7: {
            cellType: "imageUpload",
            cellAlias: "problemResolveSign",
          },
        },
        row5: {
          column1: {
            cellType: "text",
            cellText: "CRC备案及是否考核",
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "备案时间",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            rowSpan: 1,
            cellAlias: "CRCRecordDate",
          },
          column6: {
            colSpan: 2,
            rowSpan: 2,
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row3Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row6: {
          column2: {
            cellType: "text",
            cellText: "委托时间",
            textAlign: "center",
          },
          column3: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "date",
            cellAlias: "CRCEntrustDate",
          },
        },
        row7: {
          column1: {
            cellType: "text",
            cellText: "授权清单资质复核",
            colSpan: 1,
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            colSpan: 2,
            rowSpan: 2,
            cellType: "blanks",
            blankSettings: [
              {
                id: "15wot7fx4zr",
                type: "text",
              },
              {
                id: "kenlbvm6il",
                type: "text",
              },
              {
                id: "f2gdtonh3xu",
                type: "text",
              },
              {
                id: "iydx6mu81u",
                type: "text",
              },
            ],
            blankContent:
              '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"医生","type":"text","version":1},{"type":"blankNode","blankId":"iydx6mu81u","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"人； 护士 ","type":"text","version":1},{"type":"blankNode","blankId":"15wot7fx4zr","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"人","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"药师 ","type":"text","version":1},{"type":"blankNode","blankId":"kenlbvm6il","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"人；其他","type":"text","version":1},{"type":"blankNode","blankId":"f2gdtonh3xu","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"人","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
            cellAlias: "persons",
          },
          column6: {
            cellType: "text",
            cellText: "清单复核",
            textAlign: "center",
          },
          column7: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "radio",
            choices: [
              {
                text: "合格",
                value: "item1",
              },
              {
                text: "不合格",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
            showOtherItem: false,
            cellAlias: "listReview",
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row4Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row8: {
          column6: {
            cellType: "text",
            cellText: "有无提前接受物质授权及日期",
            textAlign: "center",
          },
        },
        row9: {
          column1: {
            cellType: "text",
            cellText: "招募委托备案情况",
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "备案时间",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "recruitRecordDate",
          },
          column6: {
            cellType: "text",
            cellText: "招募单位",
            textAlign: "center",
          },
          column7: {
            cellType: "input",
            inputType: "text",
            cellAlias: "recruit",
          },
          column5: {
            rowSpan: 2,
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row5Date",
          },
        },
        row10: {
          column2: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "text",
            cellText: "委托单位",
            textAlign: "center",
          },
          column3: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "recruitEntrustDate",
          },
          column6: {
            cellType: "text",
            cellText: "CRC核对情况",
            textAlign: "center",
          },
          column7: {
            cellType: "radio",
            choices: [
              {
                text: "已对",
                value: "item1",
              },
              {
                text: "未对",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            cellAlias: "CRCCheckStatus",
          },
        },
        row11: {
          column1: {
            cellType: "text",
            cellText: "伦理批准时间",
            colSpan: 1,
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "伦理批准时间",
            textAlign: "center",
            cellAlias: "ethicalApprovalDate",
          },
          column3: {
            cellType: "input",
            inputType: "date",
          },
          column6: {
            cellType: "text",
            cellText: "版本",
            textAlign: "center",
            cellAlias: "",
          },
          column7: {
            cellType: "input",
            inputType: "text",
            cellAlias: "ethicalApprovalPlan",
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row6Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row12: {
          column2: {
            cellType: "text",
            cellText: "招募广告",
            textAlign: "center",
            cellAlias: "",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "有",
                value: "item1",
              },
              {
                text: "无",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
            showOtherItem: false,
            otherText: "",
            cellAlias: "recruitAd",
          },
          column6: {
            cellType: "text",
            cellText: "编号",
            textAlign: "center",
            cellAlias: "",
          },
          column7: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "ethicalApprovalNo",
          },
        },
        row13: {
          column1: {
            cellType: "text",
            cellText: "立项及合同首付款",
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "立项时间",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "planSetupDate",
          },
          column6: {
            cellType: "text",
            cellText: "外授说明",
            textAlign: "center",
            cellAlias: "",
          },
          column7: {
            cellType: "input",
            inputType: "text",
            cellAlias: "outAuthMemo",
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row7Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row14: {
          column2: {
            cellType: "text",
            cellText: "付款时间",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "payDate",
          },
          column6: {
            cellType: "text",
            cellText: "其他说明",
            textAlign: "center",
          },
          column7: {
            cellType: "input",
            inputType: "text",
            cellAlias: "otherMemo",
          },
        },
        row15: {
          column1: {
            cellType: "text",
            cellText: "有无同类项目展开",
            colSpan: 1,
            rowSpan: 3,
          },
          column2: {
            colSpan: 2,
            rowSpan: undefined,
            cellType: "radio",
            choices: [
              {
                text: "无",
                value: "item1",
              },
              {
                text: "有",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            showOtherItem: false,
            externalLoadOptionsName: "",
            otherText: "",
            cellAlias: "haveSameStarting",
          },
          column6: {
            cellType: "text",
            cellText: "同类说明",
            rowSpan: 2,
            textAlign: "center",
            cellAlias: "",
          },
          column7: {
            colSpan: undefined,
            rowSpan: 2,
            cellType: "input",
            inputType: "text",
            cellAlias: "sameMemo",
          },
          column4: {
            rowSpan: 3,
            cellAlias: "row8Date",
          },
          column5: {
            rowSpan: 3,
          },
        },
        row16: {
          column2: {
            cellType: "text",
            cellText: "备注",
            colSpan: 1,
            textAlign: "center",
            cellAlias: "",
          },
          column3: {
            cellType: "input",
            inputType: "text",
            cellAlias: "sameMemo",
          },
        },
        row17: {
          column2: {
            cellType: "text",
            cellText: "方案编号",
            textAlign: "center",
            cellAlias: "",
          },
          column3: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "samePlanNo",
          },
          column6: {
            cellType: "text",
            cellText: "处理结果",
            textAlign: "center",
            cellAlias: "",
          },
          column7: {
            cellType: "input",
            inputType: "text",
            cellAlias: "sameResult",
          },
        },
        row18: {
          column1: {
            cellType: "text",
            cellText: "检验检查表(项目刻章)",
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "text",
            cellText: "完成时间",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "checkListFinishDate",
          },
          column6: {
            colSpan: 2,
            rowSpan: 2,
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row9Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row19: {
          column2: {
            cellType: "text",
            cellText: "合同编号",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "text",
            cellAlias: "checkListHtNo",
          },
        },
        row20: {
          column1: {
            cellType: "text",
            cellText: "设备清单及校准效期",
            colSpan: 1,
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "收集时间",
            textAlign: "center",
            cellAlias: "",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "deviceCheckDate",
          },
          column6: {
            cellType: "text",
            cellText: "冰箱编号",
            textAlign: "center",
          },
          column7: {
            cellType: "input",
            inputType: "text",
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row10Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row21: {
          column2: {
            cellType: "text",
            cellText: "清单效期负责任",
            textAlign: "center",
            cellAlias: "",
          },
          column3: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "清单效期负责任",
          },
          column6: {
            cellType: "text",
            cellText: "管理记录人",
            textAlign: "center",
          },
          column7: {
            cellType: "input",
            inputType: "text",
          },
        },
        row22: {
          column1: {
            cellType: "text",
            cellText: "CRC管理员信息确认",
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "CRC入职时间",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "CRC入职时间",
          },
          column6: {
            cellType: "text",
            cellText: "SMO",
            textAlign: "center",
          },
          column7: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "SMO",
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row11Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row23: {
          column2: {
            cellType: "text",
            cellText: "摘要交验时间",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "摘要交验时间",
          },
          column6: {
            cellType: "text",
            cellText: "老年人文关怀培训",
            textAlign: "center",
          },
          column7: {
            colSpan: undefined,
            rowSpan: undefined,
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
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
            cellAlias: "老年人文关怀培训",
          },
        },
        row24: {
          column1: {
            cellType: "text",
            cellText: "CRC方案培训及记录",
            rowSpan: 2,
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "培训完成时间",
            textAlign: "center",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "培训完成时间",
          },
          column6: {
            cellType: "text",
            cellText: "培训备案",
            textAlign: "center",
          },
          column7: {
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
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
            cellAlias: "培训备案",
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row12Date",
          },
          column5: {
            rowSpan: 2,
          },
        },
        row25: {
          column2: {
            cellType: "text",
            cellText: "应急预案SOP",
            textAlign: "center",
          },
          column3: {
            cellType: "radio",
            choices: [
              {
                text: "有",
                value: "item1",
              },
              {
                text: "无",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
            cellAlias: "应急预案SOP",
          },
          column6: {
            cellType: "text",
            cellText: "对A宣教",
            textAlign: "center",
          },
          column7: {
            cellType: "radio",
            choices: [
              {
                text: "已办",
                value: "item1",
              },
              {
                text: "未办",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
            cellAlias: "对A宣教",
          },
        },
        row26: {
          column1: {
            cellType: "text",
            cellText: "启动会两清单审核",
            textAlign: "center",
          },
          column2: {
            cellType: "text",
            cellText: "资料完成时间",
            textAlign: "center",
          },
          column4: {
            rowSpan: 2,
            cellAlias: "row13Date",
          },
          column5: {
            rowSpan: 2,
          },
          column6: {
            cellType: "text",
            cellText: "授单备案",
            textAlign: "center",
          },
          column7: {
            cellType: "radio",
            choices: [
              {
                text: "已办",
                value: "item1",
              },
              {
                text: "未办",
                value: "item2",
              },
            ],
            orientation: "horizontal",
            enableExternalLoadOptions: false,
            externalLoadOptionsName: "",
            cellAlias: "授单备案",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "资料完成时间",
          },
        },
        row27: {
          column2: {
            cellType: "text",
            cellText: "清单完成时间",
            textAlign: "center",
          },
          column6: {
            cellType: "text",
            cellText: "预约启动",
            textAlign: "center",
          },
          column7: {
            colSpan: undefined,
            rowSpan: undefined,
            cellType: "input",
            inputType: "text",
            cellAlias: "预约启动",
          },
          column3: {
            cellType: "input",
            inputType: "date",
            cellAlias: "清单完成时间",
          },
        },
        row28: {
          column1: {
            cellType: "text",
            cellText: "分管领导意见",
            rowSpan: 3,
            textAlign: "center",
          },
          column2: {
            colSpan: 6,
            rowSpan: undefined,
            cellType: "checkbox",
            choices: [
              {
                text: "方案",
                value: "item1",
              },
              {
                text: "启动会PPT",
                value: "item2",
              },
              {
                text: "启动会目录/议程",
                value: "item3",
              },
              {
                text: "影像资料（电子版）",
                value: "item4",
              },
            ],
            orientation: "horizontal",
          },
        },
        row29: {
          column2: {
            cellType: "text",
            cellText: "启动会记录和访视报告预报时间",
            colSpan: 2,
            textAlign: "center",
          },
          column4: {
            colSpan: 4,
            rowSpan: undefined,
            cellType: "input",
            inputType: "date",
            cellAlias: "访视报告预报时间",
          },
        },
        row30: {
          column2: {
            colSpan: 1,
            rowSpan: undefined,
            cellType: "text",
            cellText: "分管领导签字",
            textAlign: "center",
          },
          column4: {
            colSpan: 1,
            rowSpan: undefined,
            cellType: "text",
            cellText: "日期",
            textAlign: "center",
          },
          column5: {
            colSpan: 3,
            rowSpan: undefined,
            cellType: "input",
            inputType: "date",
            cellAlias: "分管领导意见日期",
          },
          column3: {
            cellType: "imageUpload",
            cellAlias: "分管领导签字",
          },
        },
      },
    },
    {
      title:
        "注：以上资料准备齐全并签字确认后，申办方或CRO可联系专业或机构协调安排召开启动会具体确切时",
      type: "paragraph",
      name: "question4",
      fontSize: "small",
      textAlign: "right",
      bold: false,
    },
  ],
  categoryId: undefined,
};
