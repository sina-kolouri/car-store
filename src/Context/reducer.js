import { produce } from "immer";

export const initialState = {
    loginData: {
        user: null,
        token: null,
        loading: false,
        error: null
    },
    products: []
}

const reducer = produce((state, action) => {
    switch (action.type) {
        case "loginRequest":
            state.loginData.loading = true;
            break;

        case "loginSuccess":
            const { user, token } = action.payload;
            state.loginData.user = user;
            state.loginData.token = token;
            state.loginData.loading = false;
            break;

        case "loginError":
            const error = action.payload;
            state.loginData.error = error;
            state.loginData.loading = false;
            break;

        case "logout":
            state.loginData.user = null;
            state.loginData.token = null;
            state.loginData.loading = false;
            state.loginData.error = null;
            state.products = [];
            break;

        case "BuyCards":
            const card = action.payload;
            state.products.push(card);
            break;
        default: return state;
    }
}, initialState)

export default reducer;