import { Link } from "react-scroll";

export default function HomeNavbar() {
  return (
    <div className="w-[23rem] mt-8">
      <ul className="flex flex-row justify-between text-lg text-gray font-semibold">
        <a href="/">Home</a>
        <Link
          className="hover:cursor-pointer"
          to="aboutus"
          spy={true}
          smooth={true}
          duration={500}
        >
          About
        </Link>
        <Link
          className="hover:cursor-pointer"
          to="services"
          spy={true}
          smooth={true}
          duration={500}
        >
          Services
        </Link>
        <Link
          className="hover:cursor-pointer"
          to="footer"
          spy={true}
          smooth={true}
          duration={500}
        >
          Contact
        </Link>
      </ul>
    </div>
  );
}
