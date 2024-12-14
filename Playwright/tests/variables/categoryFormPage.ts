
export const generateRandomWord = (length: number) => {

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let randomWord = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomWord += characters[randomIndex];
    };

    return randomWord;
};


export const validRandomCategoryName = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const minLength = 1;
    const maxLength = 50;

    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    let randomWord = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomWord += characters[randomIndex];
    };

    return randomWord;
};

export const validRandomCategoryName1Character = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const randomIndex = Math.floor(Math.random() * characters.length);

    let randomWord = characters[randomIndex];

    return randomWord;
};

export const validRandomCategoryName50Character = () => {

    const character = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const maxLength = 50;
    let randomWord = "";

    for (let i = 0; i < maxLength; i++) {
        const randomIndex = Math.floor(Math.random() * character.length);
        randomWord += character[randomIndex];
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

    const specialCharacter = "!#$%&'()*+-,/:;<=>?@[]^_\{}|~°©®™€£¥αβγΔπΩ√¿¡«»“‘’'";

    const randomIndex = Math.floor(Math.random() * specialCharacter.length);

    let randomChar = specialCharacter[randomIndex];

    return randomChar;
};

export const invalidRandomCategoryNameAlphanumeric = () => {

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let randomWord = '';
    randomWord += letters[Math.floor(Math.random() * letters.length)];
    randomWord += numbers[Math.floor(Math.random() * numbers.length)];

    return randomWord;
};

export const invalidRandomCategoryNameLetterWithSpecialChar = () => {

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChar = "!#$%&'()*+-,/:;<=>?@[]^_\{}|~°©®™€£¥αβγΔπΩ√¿¡«»“‘’'";

    let randomWord = '';
    randomWord += letters[Math.floor(Math.random() * letters.length)];
    randomWord += specialChar[Math.floor(Math.random() * specialChar.length)];

    return randomWord;
};

export const invalidRandomOfferPercentageOnlyLetter = () => {

    const character = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const randomIndex = Math.floor(Math.random() * character.length);

    let randomChar = character[randomIndex];

    return randomChar;
};

export const invalidRandomOfferPercentageOnlySpecialChar = () => {

    const character = '+-.';

    const randomIndex = Math.floor(Math.random() * character.length);

    let randomChar = character[randomIndex];

    return randomChar;
};

export const invalidRandomOfferPercentageDecimal = () => {

    const integer = '1234567890';
    const decimal = '1234567890';


    let randomInteger = integer[Math.floor(Math.random() * integer.length)];
    let randomDecimal = decimal[Math.floor(Math.random() * decimal.length)];

    let randomDecimalNumber = randomInteger + '.' + randomDecimal;

    return randomDecimalNumber;
};

export const invalidRandomOfferPercentageNegativeNumber = () => {

    const number = '1234567890';

    let randomNumber = number[Math.floor(Math.random() * number.length)];

    let randomNegativeNumber = '-' + randomNumber;

    return randomNegativeNumber;
};

export const validRandomCategoryImage = () => {

    const images = ["tests/e2e/suite/Image/Desserts.png", "tests/e2e/suite/Image/12$34 Desserts.png", "tests/e2e/suite/Image/12$34.png", ""];

    let randomIndex = Math.floor(Math.random() * images.length);
    let randomImage = images[randomIndex];

    return randomImage;
};

export const validRandomActiveInactiveCheckbox = () => {

    const activeInactive = ["check", "uncheck"];

    let randomIndex = Math.floor(Math.random() * activeInactive.length);

    let randomactiveInactive = activeInactive[randomIndex];

    return randomactiveInactive;
};

export const validRandomOfferPercentageCheckbox = () => {

    const offerPercantage = ["check", "uncheck"];

    let randomIndex = Math.floor(Math.random() * offerPercantage.length);

    let randomaofferPercantage = offerPercantage[randomIndex];

    return randomaofferPercantage;
};

export const validRandomOfferPercentage = () => {

    const randomNumber = Math.floor(Math.random() * 101);

    return randomNumber;
};

export const invalidRandomOfferPercentageAbove100 = () => {

    const randomNumber = Math.floor(Math.random() * (1000 - 101 + 1)) + 101;

    return randomNumber;
};




