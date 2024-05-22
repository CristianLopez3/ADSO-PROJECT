import  { useState, useEffect } from "react";

const Footer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      setIsOpen(currentHour >= 9 && currentHour < 23); // 9 AM - 9 PM
    };
    const interval = setInterval(checkTime, 60000);
    checkTime();
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-grayDark pt-12 pb-28 md:py-12 mt-20 mb-0  text-white">
      <section className="container-section text-base md:text-xl space-y-3">
        <h2 className="mb-12">Menu EASY Location and Hours</h2> 
        <p className="pb-3">(+57) 300 389 2X 1X </p>
        <a href="https://maps.app.goo.gl/r3AYZ1PkLttAUKkb6">
          409 Main Street, Bogota DC, IN CRA32
        </a>

        <p className="flex items-center">
          {isOpen ? (
            <>
              <span className="w-4 h-4 bg-green-900 border border-black rounded-full mr-2" />
              Open Now
            </>
          ) : (
            <>
              <span className="w-4 h-4 bg-red-900 border-black rounded-full mr-2" />
              Closed
            </>
          )}
        </p>

        <p>Open sunday to sunday since 9:00 to 21:00</p>

        <h3> &copy; CopyRight to Team 2 | 2024</h3>
      </section>
    </footer>
  );
};

export default Footer;
