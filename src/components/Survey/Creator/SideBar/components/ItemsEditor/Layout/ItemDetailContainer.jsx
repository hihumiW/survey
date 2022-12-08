const ItemDetailContainer = (props, { slots }) => {
  return (
    <div class="survey-sideBar-itemDetail-container">
      {slots.default()}
      {props.showDetail && (
        <div class="p-4 bg-neutral-100">{slots.detail()}</div>
      )}
    </div>
  );
};

ItemDetailContainer.props = {
  showDetail: Boolean,
};

export default ItemDetailContainer;
