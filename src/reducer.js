export const initialState = {
    basket: []
};

// Selector
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);



const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'RESET_BASKET':
            return {
                ...state,
                basket: []
            };

        case 'REMOVE_FROM_BASKET':
            const indexToBeRemoved = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket]

            if (indexToBeRemoved >= 0) {
                newBasket.splice(indexToBeRemoved, 1);
            } else {
                console.warn("Index do not exist")
            }

            return {
                ...state,
                basket: newBasket
             }

        default:
            return state
    }
};


export default reducer