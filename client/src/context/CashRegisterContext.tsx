import React, { createContext, useReducer } from 'react';
import CashRegisterReducer, {
  ICashRegisterReducerState,
  ICashRegisterAction,
  initialCashRegsiterState
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
  const initialState = initialCashRegsiterState;
  const [state, dispatch] = useReducer(CashRegisterReducer, initialState);

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
