
export const validRandomCategoryName1Character = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const randomIndex = Math.floor(Math.random() * characters.length);

    let randomWord = characters[randomIndex];

    return randomWord;
};

export const validRandomCategoryName50Characters = () => {

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const maxLenght = 50;
    let randomWord = "";

    for ( let i = 0 ; i < maxLenght ; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomWord += characters[randomIndex];
    };

    return randomWord;
};

export const invalidRandomCategoryNameOnlyNumber = () => {

    const character = '1234567890';

    const minLength = 1;
    const maxLength = 50;

    let randomWord = "";

    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(Math.random() * character.length);
        randomWord += character[randomIndex];

    }
    return randomWord;
};

export const invalidRandomCategoryNameOnlySpecialCharacter = () => {

    const specialChar = "!#$%&'()*+-,/:;<=>?@[]^_\{}|~°©®™€£¥αβγΔπΩ√¿¡«»“‘’'";

    const randomIndex = Math.floor(Math.random() * specialChar.length);
    const randomSpecialChar = specialChar[randomIndex];

    return randomSpecialChar;
}