import React from 'react';
import CampaignsList from "components/CampaignsList";
import ButtonStyled from "components/ui/Button";
import {useSelector} from "react-redux";
import {getRecommendedCampaignsSelector} from "redux/reducers/companies";
import Link from "next/link";
import {INVEST_ROUTE} from "../../constants/routesConstant";

const RecommendedCampaigns = () => {

    const recommendedCampaigns = useSelector(getRecommendedCampaignsSelector)
    return (
        <>
            { recommendedCampaigns?.length > 0 &&
                <section className='recommended_campaigns_section'>
                    <div className='recommended_campaigns_content_wrapper'>
                        <h2>Title</h2>
                        <p>Subtitle</p>
                        <CampaignsList content={recommendedCampaigns} className='recommended_campaigns_list'/>
                        <Link href={INVEST_ROUTE} prefetch={false}>

                        <ButtonStyled className='recommended_campaigns_button'
                                      colorStyle="dark-green"
                        >
                            Se fier investeringsmojligheter
                        </ButtonStyled>
                        </Link>
                    </div>
                </section>
            }
            </>
    );
}

export default RecommendedCampaigns;