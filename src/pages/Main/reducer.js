export default function Reducer(state, action) {

    switch (action.type) {
        case "addIngredient":
            return {
                ...state,
                pizza: {
                    ingredients: action.ingredients
                }
            }

        case "reset":

            return {
                ...state,
                pizza: {
                    ingredients: {}
                },
                price: 0
            }

        case "price":
            let price = state.ingredients.reduce((acc, item) => {
                return acc + (item.price * Number(action.ingredients[item.key]))
            }, 0)
            return {
                ...state,
                price: price

            }

        default:
            return state
    }
}