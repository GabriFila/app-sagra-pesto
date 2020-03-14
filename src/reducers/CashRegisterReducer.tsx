import * as React from 'react';
import { IPrepCourse, IDish } from '../../types';

export enum ActionType {
  AddDish = 'AddDish',
  RemoveDish = 'RemoveDish',
  ResetOrder = 'ResetOrder'
}

export interface ICashRegisterReducerState {
  orderNum: number | undefined;
  courses: IPrepCourse[];
  dishes: IDish[];
}

export interface ICashRegisterAction {
  type: ActionType;
  payload?: {
    dishShortName: string;
  };
}

export const initialCashRegsiterState: ICashRegisterReducerState = {
  orderNum: undefined,
  courses: [],
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
      return initialCashRegsiterState;
    default:
      throw new Error();
  }
};

export default CashRegisterReducer;
