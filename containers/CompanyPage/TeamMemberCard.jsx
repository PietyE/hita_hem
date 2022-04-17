import React from "react";

import SocialTab from "components/ui/SocialTab";
import ImageComponent from "components/ui/ImageComponent";

const TeamMemberCard = ({item}) => {
    const {
        description,
        email,
        name,
        photo,
        position,
        teammatesocialurl_set,
        photo_alter_text,
    } = item;

    const getSocialsCompanySelector = (teammatesocialurl_set) => {
        return teammatesocialurl_set?.map((s) => {
            return {name: s.social.name.toLowerCase(), url: s.url};
        });
    };

    return (
        <div className="member_card_item">
            <div className="member_card_image">
                {photo && <ImageComponent
                    className="member_card_image"
                    src={photo}
                    alt={photo_alter_text || ' '}
                />}
            </div>

            <h3 className="member_card_item_name">{name}</h3>
            <span className="member_card_item_position">{position}</span>
            <a className="member_card_item_email" href={`mailto:${email}`}>
                {email}
            </a>
            <span className="member_card_item_description">{description}</span>
            <SocialTab
                socials={getSocialsCompanySelector(teammatesocialurl_set)}
                classNameContainer="member_card_social"
            />
        </div>
    );
};

export default TeamMemberCard;
