import React, { useState } from "react";
import NavbarContainer from "../global/NavbarContainer";
import { Link } from "react-router-dom";
import StudentsSectionContainer from "./StudentsSectionContainer";
import Hero from "../pages/co-manager/Hero";
import useRoleRedirect from "../hooks/useRoleRedirect";

export default function CoManagerPageLayout() {
  useRoleRedirect(["co_manager"]);

  return (
    <div>
      <NavbarContainer title={"Co-Manager"}>
        <Link
          className="hover:cursor-pointer text-lg"
          to="#"
          spy={true}
          smooth={true}
          duration={500}
        >
          Students
        </Link>
      </NavbarContainer>
      <Hero />
      <StudentsSectionContainer editable={true} />
    </div>
  );
}
