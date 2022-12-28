import { NInputNumber } from "naive-ui";
import Vertical from "../Layout/Vertical";

const Score = (props) => {
  return (
    <Vertical title="分数">
      <NInputNumber
        size="large"
        value={props.value || 0}
        min={0}
        onUpdate:value={props.onUpdate}
      />
    </Vertical>
  );
};

Score.props = {
  title: {
    type: String,
    default: "Score",
  },
  value: {
    type: Number,
  },
  onUpdate: {
    type: Function,
  },
};

export default Score;
