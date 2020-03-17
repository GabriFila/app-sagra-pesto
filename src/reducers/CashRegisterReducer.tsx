import * as React from 'react';
import { ICourseDish } from '../../types';

export enum ActionType {
  AddDish = 'AddDish',
  RemoveDish = 'RemoveDish',
  ResetOrder = 'ResetOrder'
}

export interface ICashRegisterReducerState {
  orderNum: number | undefined;
  dishes: ICourseDish[];
}

export interface ICashRegisterAction {
  type: ActionType;
  payload?: {
    dishShortName: string;
  };
}

export const initialCashRegsiterState: ICashRegisterReducerState = {
  orderNum: undefined,
  dishes: []
};

const addDish = (
  prevState: ICashRegisterReducerState,
  dishShortName: string
): ICashRegisterReducerState => {
  const newState = { ...prevState };
  const isDishAlreadyInOrder = newState.dishes.some(
    dish => dish.shortName === dishShortName
  );

  if (isDishAlreadyInOrder)
    newState.dishes.find(dish => dish.shortName === dishShortName).qt++;
  else newState.dishes.push({ shortName: dishShortName, qt: 1 });
  return newState;
};

const removeDish = (
  prevState: ICashRegisterReducerState,
  dishShortName: string
): ICashRegisterReducerState => {
  const newState = { ...prevState };
  const isDishAlreadyInOrder = newState.dishes.some(
    dish => dish.shortName === dishShortName
  );

  if (isDishAlreadyInOrder)
    newState.dishes.find(dish => dish.shortName === dishShortName).qt--;

  return newState;
};

const CashRegisterReducer: React.Reducer<
  ICashRegisterReducerState,
  ICashRegisterAction
> = (state, action) => {
  switch (action.type) {
    case ActionType.AddDish:
      return addDish(state, action.payload.dishShortName);
    case ActionType.RemoveDish:
      return removeDish(state, action.payload.dishShortName);
    case ActionType.ResetOrder:
      return { orderNum: undefined, courses: [], dishes: [] };
    default:
      throw new Error();
  }
};

export default CashRegisterReducer;
