
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