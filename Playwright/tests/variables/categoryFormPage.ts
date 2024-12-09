
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
