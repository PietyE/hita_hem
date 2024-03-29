export const validateEmail = (email) => {
    //eslint-disable-next-line
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
    return re.test(email);
};

export const validateCampaignNumber = (number) => {
    //eslint-disable-next-line
    const re = /^([A-Z]{1,3}[0-9]{1,10}|[0-9]{5,14}|[0-9]{1,6}[A-Z]{1,1}|[0-9]{7}-[0-9]{4}|[A-Z]{1,3}[0-9]{1,6}[A-Z]{1,2}|[A-Z]{1}[0-9]{7}[A-Z]{1}|[0-9]{3}\s[0-9]{2}\s[0-9]{3}|[0-9]{6}-[0-9]{4})$/;
    return re.test(number);
};

//eslint-disable-next-line
export const urlRegExp =
    /^(http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const checkingAndEditingLink = link => {
    if (link.trim().slice(0, 4) === 'http') {
        return link
    } else {
        return `https://${link}`
    }
}

export const validateUrl = (url) => {
    return urlRegExp.test(url);
};

export const checkCurrentResolution = () => {
    if (typeof window !== "undefined") {
        if (screen.width > 1280) {
            return 'desktop';
        }
        if (screen.width > 640 && screen.width <= 1280) {
            return 'laptop';
        }
        if (screen.width <= 640) {
            return 'mobile';
        }
    }
    return null
};

export const getCorrectImage = (images) => {
    const imageSize = checkCurrentResolution();
    let img;
    if (typeof window !== "undefined" && images) {
        img = images[imageSize] || images['desktop'] || images['laptop'] || images['mobile']
    } else {
        img = null
    }
    return img
}

export const getImageAltText = (images) => {
    let alt;
    if (typeof window !== "undefined" && images) {
        alt = images['alter_text'] || ' '
    } else {
        alt = ' '
    }
    return alt
}

export const getImageSizes = images => {
    const currentImageSize = checkCurrentResolution();
    let width = 0;
    let height = 0;

    if (typeof window !== "undefined" && images) {
        width = images[`${currentImageSize}_width`] || images['desktop_width'] || images['laptop_width'] || images['mobile_width']
        height = images[`${currentImageSize}_height`] || images['desktop_height'] || images['laptop_height'] || images['mobile_height']
    }
    return {width, height}
}

export const chooseCorrectResolution = (imageList) => {
    const imageSize = checkCurrentResolution();
    /////////remove after fix on beck-end
    if (Array.isArray(imageList)) {
        if (imageList?.length === 0) {
            return null
        }
        const images = imageList[0]
        return images[imageSize]
    } else if (!imageList) {
        return null
    } else {
        return imageList[imageSize]
        // return imageList['desktop']

    }
    // for (let key in imageList) {
    // if (Number(key.replace(/\D/g, "")) === Number(imageSize)) {
    //   return imageList[key]
    //     ? imageList[key]
    //     : imageList[Object.keys(imageList)[0]];
    // }
    // }
};

export const convertStatusToText = (status, language = 'en') => {
    switch (status) {
        case 1:
            return language === 'en' ? "UPCOMING" : "KOMMANDE";
        case 2:
            return language === 'en' ? "COMPLETED" : "AVSLUTAD";
        case 3:
            return language === 'en' ? "Open for investments" : "Öppet för investering";
        case 4:
            return language === 'en' ? "SUCCESSFULLY CLOSED" : "Stängd";
        default:
            return null;
    }
};

export const createYearList = () => {
    let currentYear = new Date().getFullYear();
    const years = [];
    let lastYear = 1920;
    while (currentYear > lastYear) {
        years.push(currentYear--);
    }
    return years;
};

export const getDays = (month) => {
    let startDay = 1;
    let days = [];
    if (
        month === "January" ||
        month === "March" ||
        month === "May" ||
        month === "July" ||
        month === "August" ||
        month === "October" ||
        month === "December" ||
        month === "1" ||
        month === "3" ||
        month === "5" ||
        month === "7" ||
        month === "8" ||
        month === "10" ||
        month === "12"
    ) {
        while (startDay <= 31) {
            days.push(startDay++);
        }
        return days;
    }
    if (
        month === "April" ||
        month === "June" ||
        month === "September" ||
        month === "November" ||
        month === "4" ||
        month === "6" ||
        month === "9" ||
        month === "11"
    ) {
        while (startDay <= 30) {
            days.push(startDay++);
        }
        return days;
    }
    if (month === "February" || month === "2") {
        while (startDay <= 28) {
            days.push(startDay++);
        }
        return days;
    }
};

export const months = [
    {id: 1, month: "January", monthSw: 'Januari'},
    {id: 2, month: "February", monthSw: 'Februari'},
    {id: 3, month: "March", monthSw: 'Mars'},
    {id: 4, month: "April", monthSw: 'April'},
    {id: 5, month: "May", monthSw: 'Maj'},
    {id: 6, month: "June", monthSw: 'Juni'},
    {id: 7, month: "July", monthSw: 'Juli'},
    {id: 8, month: "August", monthSw: 'Augusti'},
    {id: 9, month: "September", monthSw: 'September'},
    {id: 10, month: "October", monthSw: 'Oktober'},
    {id: 11, month: "November", monthSw: 'November'},
    {id: 12, month: "December", monthSw: 'December'},
];


export const getYoutubeId = (link) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link?.match(regExp);
    return (match && match[2].length === 11)
        ? match[2]
        : null;
}


export const getRedirectUrl = (currentLanguage) => {
    let _link;
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'development') {
        _link = currentLanguage === 'en' ? `https://dev.accumeo.com/en/authBankId` : `https://dev.accumeo.com/authBankId`
    }

    // if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'development') {
    //   _link = currentLanguage === 'en'?`http://localhost:3000/en/authBankId`:`http://localhost:3000/authBankId`
    // }

    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'staging') {
        _link = currentLanguage === 'en' ? `https://stage.accumeo.com/en/authBankId` : `https://stage.accumeo.com/authBankId`
    }
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'production') {
        _link = currentLanguage === 'en' ? `https://accumeo.com/en/authBankId` : `https://accumeo.com/authBankId`
    }
    return _link
}

export const getRedirectUrlForChangeAccountType = (currentLanguage) => {
    let _link;
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'development') {
        _link = currentLanguage === 'en' ? `https://dev.accumeo.com/en/authBankId?account_type=bankId` : `https://dev.accumeo.com/authBankId?account_type=bankId`
    }

    // if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'development') {
    //     _link = currentLanguage === 'en'?`http://localhost:3000/en/authBankId?account_type=bankId`:`http://localhost:3000/authBankId?account_type=bankId`
    // }

    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'staging') {
        _link = currentLanguage === 'en' ? `https://stage.accumeo.com/en/authBankId?account_type=bankId` : `https://stage.accumeo.com/authBankId?account_type=bankId`
    }
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'production') {
        _link = currentLanguage === 'en' ? `https://accumeo.com/en/authBankId?account_type=bankId` : `https://accumeo.com/authBankId?account_type=bankId`
    }
    return _link
}

export const getRedirectUrlForBlog = (currentLanguage) => {
    let _link;
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'development') {
        _link = currentLanguage === 'en' ? `https://dev.accumeo.com/en/news` : `https://dev.accumeo.com/nyheter`
    }

    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'staging') {
        _link = currentLanguage === 'en' ? `https://stage.accumeo.com/en/news` : `https://stage.accumeo.com/nyheter`
    }
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === 'production') {
        _link = currentLanguage === 'en' ? `https://accumeo.com/en/news` : `https://accumeo.com/nyheter`
    }
    return _link
}

export const getUrlForMyInvestments = (currentLanguage, data) => {
    let _link;
    let _textLink;

    // if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "development") {
    //     _link = currentLanguage === 'en' ? `http://localhost:3000/en/company/${data?.company_slug}` : `http://localhost:3000/foretag/${data?.company_slug}`
    // }
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "development") {
        _link = currentLanguage === 'en' ? `https://dev.accumeo.com/en/company/${data?.company_slug}` : `http://dev.accumeo.com/foretag/${data?.company_slug}`
    }
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "staging") {
        _link = currentLanguage === 'en' ? `https://stage.accumeo.com/en/company/${data?.company_slug}` : `https://stage.accumeo.com/foretag/${data?.company_slug}`
    }
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "production") {
        _link = currentLanguage === 'en' ? `https://accumeo.com/en/company/${data?.company_slug}` : `https://accumeo.com/foretag/${data?.company_slug}`
    }

    _textLink = currentLanguage === 'en' ? `https://accumeo.com/en/company/${data?.company_slug}` : `https://accumeo.com/foretag/${data?.company_slug}` ;

    return {link: _link, text_link: _textLink}
}


export const getUrlForMyCampaigns = (currentLanguage, data) => {
    let _link;
    let _textLink;

    // if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "development") {
    //     _link = currentLanguage === 'en' ? `http://localhost:3000/en/company/${data?.slug}` : `http://localhost:3000/foretag/${data?.slug}`
    // }

    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "development") {
        _link = currentLanguage === 'en' ? `http://dev.accumeo.com/en/company/${data?.slug}` : `http://dev.accumeo.com/foretag/${data?.slug}`
    }
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "staging") {
        _link = currentLanguage === 'en' ? `https://stage.accumeo.com/en/company/${data?.slug}` : `https://stage.accumeo.com/foretag/${data?.slug}`
    }
    if (process.env.NEXT_PUBLIC_CUSTOM_NODE_ENV === "production") {
        _link = currentLanguage === 'en' ? `https://accumeo.com/en/company/${data?.slug}` : `https://accumeo.com/foretag/${data?.slug}`
    }

    _textLink = currentLanguage === 'en' ? `https://accumeo.com/en/company/${data?.slug}` : `https://accumeo.com/foretag/${data?.slug}`;

    return {link: _link, text_link: _textLink}
}

export const getImgMeta = (url, callback) =>{
    const img = new Image();
    img.addEventListener("load", function() {
        callback({width: this.naturalWidth,height: this.naturalHeight})
    });
    img.src = url;
}
export const clearOffset = (router) => {
    const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
    const removeOffset = removeProperty('offset')
    const queryWithoutOffset = removeOffset(router?.query)
    router.push({
        pathname: router.pathname,
        query: queryWithoutOffset,
    })
}

export const clearStatus = (router) => {
    const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
    const removeOffset = removeProperty('status')
    const queryWithoutOffset = removeOffset(router?.query)
    router.push({
        pathname: router.pathname,
        query: queryWithoutOffset,
    })
}
