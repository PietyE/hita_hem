import React from "react";
import { useSelector } from "react-redux";
import isEqual from "lodash/isEqual";

import TeamMemberCard from "./TeamMemberCard";

import { getTeatMateSetSelector } from "redux/reducers/companies";

const Team = () => {
  const teamsMateSet = useSelector(getTeatMateSetSelector, isEqual) || [];

  return (
    <section className="team_section_container">
      {teamsMateSet?.length > 0 &&
        teamsMateSet?.map((member, index) => (
          <TeamMemberCard key={index} item={member} />
        ))}
    </section>
  );
};

export default Team;
