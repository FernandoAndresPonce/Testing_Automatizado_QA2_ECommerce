
export const generateRandomWord = (length: number) => {
    
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let randomWord = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomWord += characters[randomIndex];
    }

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
    }

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
    }

    return randomWord;
}
