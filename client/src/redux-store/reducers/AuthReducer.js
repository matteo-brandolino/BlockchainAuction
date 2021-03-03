const AuthReducer = (state = {}, actions) => {
    switch (actions.type) {
        case "SET_LOGIN":
            return { ...state, loggedIn: true, user:actions.payload };
        case "SET_TOKEN":
            return { ...state, loggedIn: true, token:actions.payload };
        case "SET_LOGOUT":
            return { ...state, loggedIn: false, user: {}, data:[]};
        case "SET_PENDING":
            return { ...state, pending:true };
        case "SET_DATA":
            return { ...state, data:actions.payload };
        case "SUCCESS":
            return { ...state, pending:false };
        default:
            return state;
    }
    };

export default AuthReducer;