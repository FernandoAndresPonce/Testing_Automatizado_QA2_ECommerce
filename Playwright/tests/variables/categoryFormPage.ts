
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

    for (let i = 0; i < length; i ++) {

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


