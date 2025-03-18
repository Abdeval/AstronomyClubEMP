import CategoryCard from "@/components/images/category-card";
import GroupCard from "@/components/images/group-card";
import PageHeader from "@/components/page-header";
import { categoryList, groupList } from "@/lib/data";
import { CategoryCardType, GroupCardType } from "@/lib/types";


export default function Images() {
  return (
    <div className="w-full min-h-full space-y-4">
      {/* by groups */}
      <div className="space-y-4">
        <PageHeader title="Groups" className="sm:text-3xl text-2xl"/>
        <div className="w-full flex sm:gap-8 gap-2 flex-wrap flex-1">
          {
            groupList.map((group: GroupCardType, index: number) => (
              <GroupCard key={index} {...group}/>
            ))
          }
        </div>
      </div>

      {/* by categories */}

      <div className="space-y-4">
        <PageHeader title="Categories" className="sm:text-3xl text-2xl"/>
        <div className="w-full flex sm:gap-8 gap-2 flex-wrap flex-1">
          {
            categoryList.map((category: CategoryCardType, index: number) => (
              <CategoryCard key={index} {...category}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}
