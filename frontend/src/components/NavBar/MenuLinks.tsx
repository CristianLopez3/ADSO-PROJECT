import { Link } from "react-router-dom";
import { PiUsers } from "react-icons/pi";
import {ROUTES} from '@/routes/constants';

type MenuLinksProps = {
  handleHamburgerMenu?: () => void;
  variant: "desktop" | "mobile";
};


const MenuLinks = ({ variant, handleHamburgerMenu }: MenuLinksProps) => {
  const links = [
    { path: ROUTES.HOME.ROOT, text: "Home" },
    { path: ROUTES.HOME.MENU, text: "Menu" },
    { path: ROUTES.HOME.BOOK, text: "Book" },
    {path: ROUTES.HOME.EVENTS, text: "Events"},
    { path: ROUTES.LOGIN, text: "Login" }
  ];

  if (variant === "mobile") {
    return (
      <div onClick={handleHamburgerMenu} className="absolute z-50 top-0 left-0 flex flex-col w-full min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg text-white uppercase bg-black">
        {links.map((link, index) => (
          <Link key={index} to={link.path} className="hover:text-primary">
            {link.text}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden h-12 items-center md:flex md:space-x-8">
      {links.map((link, index) => (
        <div key={index} className="group">
          <Link to={link.path} className="hover:text-primary">
            {link.text === "Login" ? <PiUsers size={24} /> : link.text}
            <div className="mx-2 group-hover:border-b group-hover:border-b-primary"></div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MenuLinks;