const initialState = {
    characters: []
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setValue':
            return {
                characters: action.value
            };
        default:
            return state;
    }
};

export default rootReducer;