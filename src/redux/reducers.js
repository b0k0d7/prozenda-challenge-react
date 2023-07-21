const initialState = {
    characters: [],
};

const sortCharacters = (state, sortBy) => {
    let characters = state.characters;
    if(sortBy === 'a-z'){
        characters.sort((a, b) => a.name.localeCompare(b.name))
    }
    if(sortBy === 'z-a'){
        characters.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    }
    if(sortBy === 'male'){

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
    console.log('ideer', characters);
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
        default:
            return state;
    }
};

export default rootReducer;