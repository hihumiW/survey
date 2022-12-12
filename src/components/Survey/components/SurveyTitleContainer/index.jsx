const SurveyTitleContainer = (_props, { slots }) => {
  return (
    <div class="survey-title-container">
      <div class="p-6 flex items-center gap-x-2">
        <div class="flex-1 flex flex-col gap-y-2">
          <div class="text-3xl leading-10 text-primary-main font-bold">
            {slots.title()}
          </div>
          <div class="text-base">{slots.description()}</div>
        </div>
        <div class="flex-shrink-0">{slots.category()}</div>
      </div>
      <div class="h-0.5 bg-primary-main" />
    </div>
  );
};

export default SurveyTitleContainer;
