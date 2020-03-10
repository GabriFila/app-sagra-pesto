import * as React from 'react';
import { ICourse } from '../../types';

enum ActionType {
  AddDish = 'AddDish',
  RemoveDish = 'RemoveDish'
}

export interface ICashRegisterReducerState {
  orderNum: number | undefined;
  courses: ICourse[];
}

interface IAction {
  type: ActionType;
  payload: {
    dishShortName: string;
  };
}

const initialState: ICashRegisterReducerState = {
  orderNum: undefined,
  courses: []
};

const addDish = (
  prevState: ICashRegisterReducerState,
  dishShortName: string
): ICashRegisterReducerState => {
  const newState = { ...prevState };
  newState.courses
    .find(course =>
      course.dishes.some(dish => dish.shortName === dishShortName)
    )
    .dishes.find(dish => dish.shortName === dishShortName).qt++;

  return newState;
};

const CashRegisterReducer: React.Reducer<ICashRegisterReducerState, IAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionType.AddDish:
      return addDish(state, action.payload.dishShortName);
    default:
      throw new Error();
  }
};

export default CashRegisterReducer;
// const ComplexState = () => {
//   const [state, dispatch] = React.useReducer<React.Reducer<IState, IAction>>(CashRegisterReducer, initialState);

//   return (
//     <div>
//       <div>Count: {state.count}</div>
//       <button onClick={
//         () => dispatch({type: ActionType.AddDish, payload: { count: 1 } })
//       }>+</button>
//       <button onClick={
//         () => dispatch({type: ActionType.RemoveDish, payload: { count: 1 }})
//       }>-</button>
//     </div>
//   );
