import {createStore} from 'redux';

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

const initialState = {
    characters: []
};

const store = createStore(rootReducer);

export default store;
