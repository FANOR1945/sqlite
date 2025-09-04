// reducers/authReducer.js
const savedSession = JSON.parse(localStorage.getItem('user'));

const initialAuthState = {
  user: savedSession?.user || null,
  isAuthenticated: savedSession?.isAuthenticated || false,
  roles: savedSession?.roles || [],
  loading: false,
  error: null,
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        roles: action.payload.roles,
        loading: false,
        error: null,
      };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        roles: [],
        loading: false,
        error: action.payload,
      };

    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, roles: [], loading: false, error: null };

    case 'SESSION_EXPIRED':
      return { ...state, user: null, isAuthenticated: false, roles: [], loading: false, error: 'La sesión ha expirado.' };

    default:
      return state;
  }
};

export default authReducer;
