import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/service/store/store";
import { getAllMenusAction } from "@/service/store/menus";
import { CardSkeleton } from "@/components/Skeleton";

const MenuNav = React.lazy(() => import("./MenuNav"));
const MenuCard = React.lazy(() => import("./MenuCard"));

const Menu = () => {
  const [menuActive, setMenuActive] = useState<string>("All");
  const menus = useSelector((state: RootState) => state.menus);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuActive = useCallback((menu: string): void => {
    setMenuActive(menu);
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      await dispatch(getAllMenusAction());
    };
    fetchMenus();
  }, [dispatch]);

  const filteredMenus =
    menuActive === "All" 
      ? menus.data.filter((item) => item.state)
      : menus.data.filter((item) => item.category.name === menuActive && item.state);

  return (
    <Suspense fallback={<CardSkeleton />}>
      <section
        id="menu"
        className="mt-[100px] pt-2 dark:bg-secondary text-white mb-20"
      >
        <div className="container mx-auto">
          <MenuNav
            menuActive={menuActive}
            handleMenuActive={handleMenuActive}
          />
          <article className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {filteredMenus.map((item) => (
              <MenuCard
                // state={item.state}
                key={item.title}
                id={item.id}
                description={item.description}
                price={item.price}
                title={item.title}
                imageName={item.imageName}
              />
            ))}
          </article>
        </div>
      </section>
    </Suspense>
  );
};

export default Menu;
