import { NSelect } from "naive-ui";
import cellProps from "./cellProps";

const Dropdown = (props) => {
  const { cellConfig } = props;
  const placeholderText = cellConfig.dropdownPlaceholder || "Please select";
  return <NSelect placeholder={placeholderText} size="large" disabled />;
};

Dropdown.props = cellProps;

export default Dropdown;
