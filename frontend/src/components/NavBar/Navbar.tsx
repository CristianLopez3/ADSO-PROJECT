import { useState } from "react";
import { MdOutlineFastfood } from "react-icons/md";
import HamburgerButton from "./HamburgerButton";
import MenuLinks from "./MenuLinks";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleHamburgerMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="navbar-container">
      <div className="container mx-auto px-6 py-6">
        <nav className="relative flex justify-between items-center font-bold text-white">
          <Link to="/">
            <h2 className="flex items-center gap-2 text-2xl">
              <MdOutlineFastfood />
              Menu EASY
            </h2>
          </Link>
          <MenuLinks variant="desktop" />
          {/*  Hamburger Button */}
          <div className="md:hidden">
            <HamburgerButton
              openMenu={openMenu}
              handleHamburgerMenu={handleHamburgerMenu}
            />
          </div>
        </nav>
        {/*  Mobile Menu */}
        {openMenu && (
          <MenuLinks
            variant="mobile"
            handleHamburgerMenu={handleHamburgerMenu}
          />
        )}
      </div>
    </div>
  );
}
