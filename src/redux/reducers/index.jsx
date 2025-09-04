
/*mock*/
/* import authReducer from './mock/authReducer'; */

/*reañ*/
import authReducer from './authReducer';
import { combineReducers } from './combineReducer'; // Importamos el combineReducers personalizado

// Crear el rootReducer combinando el itemsReducer
const rootReducer = combineReducers({

  auth: authReducer,


  // drawer: drawerReducer,
});

export default rootReducer;
