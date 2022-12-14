const PanelContainer = (props, { slots }) => {
  return (
    <div
      class={[
        ["ml-0", "ml-6", "ml-8", "ml-10"][props.innerIndent],
        "flex flex-col gap-y-8",
      ]}
    >
      {slots.default()}
    </div>
  );
};

PanelContainer.props = {
  innerIndent: Number,
};

export default PanelContainer;
