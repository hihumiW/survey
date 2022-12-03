const Vertical = (props, { slots }) => {
  return (
    <div class="flex flex-col gap-y-2">
      <div class="text-base text-neutral-500">
        {props.title || (slots.title && slots.title())}
      </div>
      {slots.default()}
    </div>
  );
};

Vertical.props = {
  title: String,
};

export default Vertical;
