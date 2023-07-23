const initialState = {
    characters: [],
};

const sortByGenderMale = (a, b) => {
    const genderOrder = { 'male': 1, 'female': 2, 'n/a': 3 };

    const genderA = a.gender.toLowerCase();
    const genderB = b.gender.toLowerCase();

    if (genderOrder[genderA] < genderOrder[genderB]) {
        return -1;
    } else if (genderOrder[genderA] > genderOrder[genderB]) {
        return 1;
    } else {
        return 0;
    }
}

const sortByGenderFemale = (a, b) => {
    const genderOrder = { 'female': 1, 'male': 2, 'n/a': 3 };

    const genderA = a.gender.toLowerCase();
    const genderB = b.gender.toLowerCase();

    if (genderOrder[genderA] < genderOrder[genderB]) {
        return -1;
    } else if (genderOrder[genderA] > genderOrder[genderB]) {
        return 1;
    } else {
        return 0;
    }
}

const sortCharacters = (state, sortBy) => {
    let characters = state.characters;
    if(sortBy === 'a-z'){
        characters.sort((a, b) => a.name.localeCompare(b.name))
    }
    if(sortBy === 'z-a'){
        characters.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    }
    if(sortBy === 'male'){
        characters.sort(sortByGenderMale)
    }
    if(sortBy === 'female'){
        characters.sort(sortByGenderFemale)
    }
    return characters;
}

const loadMoreCharacters = (state) => {
    let characters = state.characters;
    let count = 0;
    characters.forEach(e => {
        if(count < 4 && !e.show){
            e.show = true;
            count++;
        }
    })
    return [...characters];
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setCharacters':
            return {
                characters: action.value
            };
        case 'loadMoreCharacters':
            return {
                characters: loadMoreCharacters(state)
            };
        case 'sortCharacters':
            return {
                characters: sortCharacters(state, action.value)
            };
        case 'searchCharacter':
            return {
                characters: action.value
            };

        default:
            return state;
    }
};

export default rootReducer;