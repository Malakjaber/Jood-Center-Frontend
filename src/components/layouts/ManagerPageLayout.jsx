import { Link } from "react-scroll";
import NavbarContainer from "../global/NavbarContainer";
import useRoleRedirect from "../hooks/useRoleRedirect";
import StudentsSectionContainer from "./StudentsSectionContainer";
import Hero from "../pages/manager/Hero";
import ClassesSection from "../pages/manager/classes-section/ClassesSection";
import JoodTeamSection from "../pages/manager/jood-team/JoodTeamSection";

export default function ManagerPageLayout() {
  useRoleRedirect(["manager"]);

  return (
    <div>
      <NavbarContainer title={"Manager"}>
        <Link
          className="hover:cursor-pointer text-lg"
          to="students"
          spy={true}
          smooth={true}
          duration={500}
        >
          Students
        </Link>
        <Link
          className="hover:cursor-pointer text-lg"
          to="classes"
          spy={true}
          smooth={true}
          duration={500}
        >
          Classes
        </Link>
        <Link
          className="hover:cursor-pointer text-lg"
          to="team"
          spy={true}
          smooth={true}
          duration={500}
        >
          Jood Team
        </Link>
      </NavbarContainer>
      <Hero />
      <StudentsSectionContainer editable={true} />
      <ClassesSection />
      <JoodTeamSection />
    </div>
  );
}
