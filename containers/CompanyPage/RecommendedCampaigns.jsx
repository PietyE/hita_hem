import React from 'react';
import CampaignsList from "components/CampaignsList";
import ButtonStyled from "components/ui/Button";
import {useSelector} from "react-redux";
import {getRecommendedCampaignsSelector} from "redux/reducers/companies";
import Link from "next/link";
import {INVEST_ROUTE} from "../../constants/routesConstant";
import {useTranslation} from "react-i18next";

const RecommendedCampaigns = () => {
    const { t } = useTranslation();

    const recommendedCampaigns = useSelector(getRecommendedCampaignsSelector)
    return (
        <>
            { recommendedCampaigns?.length > 0 &&
                <section className='recommended_campaigns_section'>
                    <div className='recommended_campaigns_content_wrapper'>
                        <h2 className='recommended_campaigns_title'>{t("company_page.recommended.title")}</h2>
                        <p className='recommended_campaigns_text'>{t("company_page.recommended.text")}</p>
                        <CampaignsList content={recommendedCampaigns} className='recommended_campaigns_list'/>
                        <Link href={INVEST_ROUTE} prefetch={false}>

                        <ButtonStyled className='recommended_campaigns_button'
                                      colorStyle="dark-violet"
                        >
                            {t("company_page.recommended.button")}
                        </ButtonStyled>
                        </Link>
                    </div>
                </section>
            }
            </>
    );
}

export default RecommendedCampaigns;