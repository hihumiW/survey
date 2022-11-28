interface GernalProps {
  title: string;
  description?: string; //default : ''
  visibleIf?: string; //default : ''
  indent?: boolean; //default : false
}

interface TypeOfInputGernalProps {
  name: string;
  editableIf?: string; //default : ''
  requiredIf?: string; //default : ''
  readonlyIf?: string; //default : ''
  defaultValueExpression?: string; //default : ''
}

type TextInputType =
  | "text"
  | "number"
  | "date"
  | "time"
  | "province"
  | "provinceArea";

type TitleLocation = "top" | "left" | "right" | "bottom";

//signle text
export interface SingleInput extends GernalProps, TypeOfInputGernalProps {
  type: "text";
  inputType?: TextInputType; //default : text
  titleLocation?: TitleLocation; //detault : top
}

/**
{
    type : 'text',
    title : '今天几岁了',
    name : 'question1',
    description : '填写你的年龄',
    inputType : 'number',
}
result : 
{
    question1 : 10
}
 */

export interface MultipleText extends GernalProps, TypeOfInputGernalProps {
  type: "multipleText";
  name: string;
  items: SingleInput[];
  columnCount?: 1 | 2 | 3;
}

/**
{
  type: "multipleText",
  title: "个人信息",
  name: "personData",
  columnCount: 3,
  items: [
    {
      type: "text",
      name: "age",
      title: "年龄",
    },
    {
      type: "text",
      name: "sex",
      title: "性别",
    },
    {
      type: "text",
      name: "address",
      title: "地址",
    },
  ],
}
result:
{
    personData : {
        age : 10,
        sex : '男',
        address : 'China'
    }
}
 * 
 */
