const SurveyTitleContainer = (_props, { slots }) => {
  return (
    <div class="survey-title-container">
      <div class="flex-1 flex flex-col gap-y-2 mt-4">
        <div class="flex items-center gap-x-2">
          <div class="flex-1 text-3xl leading-10 text-primary-main font-bold">
            {slots.title()}
          </div>
          <div class="flex-shrink-0 w-[200px]">{slots.category()}</div>
        </div>
        <div class="text-base">{slots.description()}</div>
      </div>
      <div class="h-0.5 bg-primary-main mt-4 " />
    </div>
  );
};

export default SurveyTitleContainer;
