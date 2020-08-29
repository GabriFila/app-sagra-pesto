import React, { createContext, useReducer, useEffect } from 'react';
import CashRegisterReducer, {
  ICashRegisterReducerState,
  ICashRegisterAction,
  initialCashRegsiterState,
  ActionType
} from '../reducers/CashRegisterReducer';

interface ICashRegisterContext {
  state: ICashRegisterReducerState;
  dispatch: React.Dispatch<ICashRegisterAction>;
}

export const CashRegisterContext = createContext<ICashRegisterContext>({
  state: initialCashRegsiterState,
  dispatch: null
});

const CashRegisterContextProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(
    CashRegisterReducer,
    initialCashRegsiterState
  );
  useEffect(() => {
    // to reset courses in state when context is created, don't know why it doesn't do it on its own
    dispatch({ type: ActionType.ResetState });
  }, []);

  return (
    <CashRegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </CashRegisterContext.Provider>
  );
};

const withCashRegisterContext = (
  BaseComponent: React.FunctionComponent<any>
) => (props: any) => (
  <CashRegisterContextProvider>
    <BaseComponent {...props} />
  </CashRegisterContextProvider>
);

export default withCashRegisterContext;
