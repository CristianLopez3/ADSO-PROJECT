import Button from "@/components/Button";
import { AppDispatch, RootState } from "@/service/store/store";
import { useEffect } from "react";
import { Category } from "@/utils/types/Menu";
import { getAllCategories } from "@/service/store/menus/CategoryReducer";
import { useDispatch, useSelector } from "react-redux";

type MenuNavProps = {
  menuActive: string;
  handleMenuActive: (value: string) => void;
};

const MenuNav = ({ menuActive, handleMenuActive }: MenuNavProps) => {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getAllCategories());
    };
    fetch();
  }, [dispatch]);
  return (
    <>
      <div className="flex-center w-full gap-2 overflow-x-scroll mt-8">
        <Button
          variant={menuActive === "All" ? "light" : "dark"}
          content="All"
          className="rounded-sm transition-colors duration-50"
          onClick={() => handleMenuActive("All")}
        />
        {categories.data.map((item: Category) => {
          return (
            <Button
              key={item.id}
              variant={menuActive === item.name ? "light" : "dark"}
              content={item.name}
              className={`rounded-sm  font-normal transition-colors duration-50`}
              onClick={() => handleMenuActive(item.name)}
            />
          );
        })}
      </div>
    </>
  );
};

export default MenuNav;
