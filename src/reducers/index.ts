import {combineReducers} from 'redux';
import {login, loginReducer} from '../features/Login/slice';
// (이전상태, 액션) => 다음상태
const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    default: {
      const combinedReducer = combineReducers({
        [login]: loginReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
