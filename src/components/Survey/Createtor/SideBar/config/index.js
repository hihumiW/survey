import {
  NameEditor,
  TitleEditor,
  IsRequiredEditor,
  ReadOnlyEditor,
  ShowQuestionNumberEditor,
  TitleLocatioEditor,
  IndentEditor,
  VisibleIfEditor,
  EditableIfEditor,
  RequiredIfEditor,
  DefaultValueExpressionEditor,
} from "./common";

import {
  PlaceHolderEditor,
  MaximumLengthEditor,
  MinimumLengthEditor,
  InputTypeEditor,
  InputVariantEditor,
  NumberPrecisionEditor,
} from "./textConfig";

import {
  ChoicesOrientationEditor,
  EnableOtherOptionEditor,
  OtherOptionTextEditor,
  OtherOptionPlaceholder,
  ChoicesEditor,
} from "./selectConfig";

import {
  FileAcceptedTypesEditor,
  FileMaxSizeEditor,
  MaxFileCount,
} from "./fileConfig";

const SelectConfig = [
  {
    categoryName: "General",
    categoryTitle: "General",
    components: [NameEditor, TitleEditor, IsRequiredEditor, ReadOnlyEditor],
  },
  {
    categoryName: "Choices",
    categoryTitle: "Choices",
    components: [
      ChoicesEditor,
      EnableOtherOptionEditor,
      OtherOptionTextEditor,
      OtherOptionPlaceholder,
    ],
  },
  {
    categoryName: "Layout",
    categoryTitle: "Layout",
    components: [
      TitleLocatioEditor,
      IndentEditor,
      ChoicesOrientationEditor,
      ShowQuestionNumberEditor,
    ],
  },
  {
    categoryName: "Logic",
    categoryTitle: "Logic",
    components: [
      VisibleIfEditor,
      EditableIfEditor,
      RequiredIfEditor,
      DefaultValueExpressionEditor,
    ],
  },
];

const sideBarConfig = {
  text: [
    {
      categoryName: "General",
      categoryTitle: "General",
      components: [
        NameEditor,
        TitleEditor,
        IsRequiredEditor,
        ReadOnlyEditor,
        PlaceHolderEditor,
        InputTypeEditor,
        NumberPrecisionEditor,
        MinimumLengthEditor,
        MaximumLengthEditor,
      ],
    },
    {
      categoryName: "Layout",
      categoryTitle: "Layout",
      components: [
        TitleLocatioEditor,
        IndentEditor,
        InputVariantEditor,
        ShowQuestionNumberEditor,
      ],
    },
    {
      categoryName: "Logic",
      categoryTitle: "Logic",
      components: [
        VisibleIfEditor,
        EditableIfEditor,
        RequiredIfEditor,
        DefaultValueExpressionEditor,
      ],
    },
  ],
  radiogroup: SelectConfig,
  checkbox: SelectConfig,
  dropdown: SelectConfig,
  file: [
    {
      categoryName: "General",
      categoryTitle: "General",
      components: [
        NameEditor,
        TitleEditor,
        IsRequiredEditor,
        MaxFileCount,
        FileAcceptedTypesEditor,
        FileMaxSizeEditor,
      ],
    },
    {
      categoryName: "Layout",
      categoryTitle: "Layout",
      components: [TitleLocatioEditor, IndentEditor, ShowQuestionNumberEditor],
    },
    {
      categoryName: "Logic",
      categoryTitle: "Logic",
      components: [VisibleIfEditor, RequiredIfEditor],
    },
  ],
};

export default sideBarConfig;
