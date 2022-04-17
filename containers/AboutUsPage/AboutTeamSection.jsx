import React from "react";
import SubTitle from "components/ui/SubTitle";
import Image from "next/image";

const AboutTeamSection = ({content = []}) => {
    return (
        <>
            {content.length > 0 && (
                <div className="bottom_section">
                    <div className="bottom_section_title">
                        <SubTitle content="Meet Our Team" linePosition="center"/>
                    </div>
                    <div className="bottom_section_team_container">
                        {content.map((item, index) => {
                            const {email, photo, name, position, description} = item;
                            return (
                                <div className="team_item" key={index}>
                                    {photo && (
                                        <div className="team_item_foto"
                                             style={{position: 'relative', overflow: 'hidden'}}>
                                            <Image
                                                src={photo}
                                                layout="fill"
                                                objectFit="cover"
                                                priority={true}
                                                alt={content?.photo_alter_text || ''}
                                            />
                                        </div>

                                    )}
                                    <h3 className="team_item_name">{name}</h3>
                                    <span className="team_item_position">{position}</span>
                                    {!!description && (
                                        <span className="team_item_description">{description}</span>
                                    )}
                                    {!!email && (
                                        <a className="team_item_email" href={`mailto:${email}`}>
                                            {email}
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default AboutTeamSection;
