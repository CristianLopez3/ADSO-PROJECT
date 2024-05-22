import { type Menu } from "@/utils/types/Menu";

type MenuCardProps = Partial<Menu>;

const MenuCard: React.FC<MenuCardProps> = ({
  id,
  title,
  description,
  price,
  imageName
}) => {
  return (
    <>
      <div
        key={title}
        className="relative max-w-11/12  flex hover:scale-[1.02] transition-all   overflow-hidden  rounded-sm shadow-xl dark:bg-gray-800"
      >
        <figure className="w-1/3 h-full flex items-center justify-center">
          <img
            className="object-cover overflow- h-36 w-full transition-all"
            src={`${import.meta.env.VITE_APP_API_URL}menus/${id}/image`}
            alt={imageName}
          />
        </figure>

        <article className="flex justify-center  items-center px-4 py-2 w-full  bg-white">
          <div className="w-full p-2">
            <h3 className="text-xl font-bold text-gray-800 uppercase dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}.
            </p>
            <div className="flex items-center mt-6 justify-end px-4">
              <h3 className="text-lg font-bold text-black">${price}</h3>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default MenuCard;
