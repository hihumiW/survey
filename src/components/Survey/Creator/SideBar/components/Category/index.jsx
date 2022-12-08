import { NCollapse, NCollapseItem, NEmpty } from "naive-ui";
import "./index.css";
const Category = (props) => {
  return (
    <div class="side-bar-category_container mt-3">
      <NCollapse
        accordion
        expandedNames={props.expandedName}
        onUpdate:expandedNames={props.updateSideBarExpandedName}
      >
        {props.categoryConfig.map(
          ({ categoryName, categoryTitle, components }) => (
            <NCollapseItem
              key={`${props.questionType}_${categoryName}`}
              title={categoryTitle}
              name={categoryName}
            >
              {components?.length ? (
                <div class="bg-neutral-100 p-6">
                  <div class="flex flex-col gap-y-6">
                    {components.map((Comp) => {
                      return <Comp key={Comp.name} />;
                    })}
                  </div>
                </div>
              ) : (
                <div class="flex items-center justify-center" v-else>
                  <NEmpty description="No availabel config" />
                </div>
              )}
            </NCollapseItem>
          )
        )}
      </NCollapse>
    </div>
  );
};

Category.props = {
  questionType: String,
  categoryConfig: Array,
  expandedName: String,
  updateSideBarExpandedName: Function,
};

export default Category;
