import React, {useEffect, useRef, useState} from "react";

import SocialTab from "components/ui/SocialTab";
import ImageComponent from "components/ui/ImageComponent";
import {useTranslation} from "react-i18next";
import {useMediaQueries} from "@react-hook/media-query";

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
    const {t} = useTranslation();

    const descriptionRef = useRef()
    const [isShowButton, setIsShowButton] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);

    const _handleClickShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-device-width: 900px)",
    });

    useEffect(() => {
        if (matchesAll) {

            let timerId = setInterval(() => {
                const blockHeight = descriptionRef?.current?.offsetHeight

                if (blockHeight !== 0 && blockHeight !== 110) {
                    setIsShowButton(blockHeight > 110);
                }
            }, 100);

            if (descriptionRef?.current?.offsetHeight ===110) {
                setTimeout(() => clearInterval(timerId), 50);
            }

            return () => clearInterval(timerId);
        }

        if (!matchesAll) {
            const blockHeight = descriptionRef?.current?.offsetHeight

            if (blockHeight !== 0) {
                setIsShowButton(blockHeight > 450);
            }
        }

    }, [matchesAll]);

    useEffect(() => {
        if (descriptionRef.current) {
            setIsShowButton(descriptionRef.current.offsetHeight > 100);
        }
    }, []);

    let _descriptionStyle = "member_card_item_description"

    if(!isShowMore && descriptionRef?.current?.offsetHeight > 100){
        _descriptionStyle = "member_card_item_description_collapsed"
    }

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
            { teammatesocialurl_set?.length > 0 &&
                <SocialTab
                    socials={getSocialsCompanySelector(teammatesocialurl_set)}
                    classNameContainer="member_card_social"
                />
            }

            <span
                ref={descriptionRef}
                className={_descriptionStyle}
            >{description}
                { isShowButton && (
                    <div className="team_show_more">
          <span className="team_show_more_button" onClick={_handleClickShowMore}>
            {isShowMore ? t("company_page.button_show_less") : t("company_page.button_show_more")}
          </span>
                    </div>
                )}
            </span>

        </div>
    );
};

export default TeamMemberCard;
