export const restrictOnlyLetters = data => {
    return data?.replace(/[^a-zA-ZäåéöÖÉÅÄ-]/g, '')
}

export const restrictCity = data => {
    return data?.replace(/[^a-zA-ZäåéöÖÉÅÄ0-9-. ,]/g, '')
}

export const restrictLettersNumbersAndSpecialCharacters = data => {
    return data?.replace(/[^a-zA-ZäåéöÖÉÅÄ0-9-. ,)(\/]/g, '')
}

export const filterComments = data => {
    return data?.replace(/&/g, ' and ').replace(/[[<{]/g, '(').replace(/[\]}>]/g, ')').replace(/x3c|u003c|%3c/gi, '')
}

