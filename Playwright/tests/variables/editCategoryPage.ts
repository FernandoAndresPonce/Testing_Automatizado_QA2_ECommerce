
export const randomCategoryIdEndpointOnlyCharacterAlphabetical = () => {

    const charactersAlphabetical = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const randomIndex = Math.floor(Math.random() * charactersAlphabetical.length);

    const characterAlphabetical = charactersAlphabetical[randomIndex];

    return characterAlphabetical;
};

export const randomCategoryIdEndpointOnlySpecialCharacter = () => {

    const specialsCharacter = "!#$%&'()*+-,/:;<=>?@[]^_\{}|~°©®™€£¥αβγΔπΩ√¿¡«»“‘’'";

    const randomIndex = Math.floor(Math.random() * specialsCharacter.length);

    const specialCharacter = specialsCharacter[randomIndex];

    return specialCharacter;
};

export const randomCategoryIdEndpointOnlyNumberOutOfRange = (rowlength: number) => {

    while (true) {

        const numeroAleatorio = Math.floor(Math.random() * (2000 + 1)) - 1000;

        if (numeroAleatorio < 1 || numeroAleatorio > rowlength) {
            return numeroAleatorio;
        }

    }
};
