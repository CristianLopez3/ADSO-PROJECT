import "./hamburgerButton.styles.css";

type HamburgerButtonProps = {
  openMenu: boolean;
  handleHamburgerMenu: () => void;
};

export default function HamburgerButton({
  openMenu,
  handleHamburgerMenu,
}: HamburgerButtonProps) {
  return (
    <button
      id="menu-btn"
      type="button"
      className={`${
        openMenu ? "open" : ""
      } z-[900] block hamburger md:hidden focus:outline-none`}
      onClick={handleHamburgerMenu}
    >
      <span className="hamburger-top"></span>
      <span className="hamburger-middle"></span>
      <span className="hamburger-bottom"></span>
    </button>
  );
}
