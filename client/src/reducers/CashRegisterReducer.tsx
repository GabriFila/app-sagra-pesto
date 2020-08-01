import * as React from 'react';
import { IOrderCourse } from '../../../types';

const isDishAlreadyInOrder = (courses: IOrderCourse[], shortName: string) =>
  courses.some(course =>
    course.dishes.some(dish => dish.shortName === shortName)
  );
const isCourseAlreadyInOrder = (courses: IOrderCourse[], courseName: string) =>
  courses.some(course => course.courseName === courseName);

export enum ActionType {
  AddDish = 'AddDish',
  RemoveDish = 'RemoveDish',
  ResetOrder = 'ResetOrder',
  SendOrder = 'SendOrder',
  ChangeNotes = 'ChangeNotes'
}

export interface ICashRegisterReducerState {
  orderNum: number | undefined;
  courses: IOrderCourse[];
}

export interface ICashRegisterAction {
  type: ActionType;
  payload?: {
    dishShortName?: string;
    price?: number;
    courseName?: string;
    kitchen?: string;
    notes?: string;
  };
}

export const initialCashRegsiterState: ICashRegisterReducerState = {
  orderNum: undefined,
  courses: []
};

const addDish = (
  prevState: ICashRegisterReducerState,
  shortName: string,
  price: number,
  courseName: string,
  kitchen: string
): ICashRegisterReducerState => {
  const newState = { ...prevState };
  if (!isCourseAlreadyInOrder(newState.courses, courseName))
    newState.courses.push({
      kitchen,
      courseName,
      dishes: [{ shortName, price, qt: 1 }],
      notes: ''
    });
  else if (isDishAlreadyInOrder(newState.courses, shortName))
    newState.courses.map(course => {
      if (course.courseName === courseName)
        course.dishes.map(dish => {
          if (dish.shortName === shortName) dish.qt++;
          return dish;
        });
      return course;
    });
  else
    newState.courses.map(course => {
      if (course.courseName === courseName)
        course.dishes.push({
          shortName,
          price,
          qt: 1
        });
      return course;
    });
  console.log(newState);
  return newState;
};

const changeNote = (
  prevState: ICashRegisterReducerState,
  courseName: string,
  kitchen: string,
  notes: string
): ICashRegisterReducerState => {
  const newState = { ...prevState };
  if (!isCourseAlreadyInOrder(newState.courses, courseName))
    newState.courses.push({
      kitchen,
      courseName,
      dishes: [],
      notes
    });
  else
    newState.courses.map(course => {
      if (course.courseName === courseName) course.notes = notes;
      return course;
    });
  console.log(newState);
  return newState;
};

const removeDish = (
  prevState: ICashRegisterReducerState,
  shortName: string,
  courseName: string
): ICashRegisterReducerState => {
  const newState = { ...prevState };

  newState.courses = newState.courses
    .map(course => {
      if (course.courseName === courseName) {
        course.dishes.map(dish => {
          if (dish.shortName === shortName) dish.qt--;
          return dish;
        });
        course.dishes = course.dishes.filter(dish => dish.qt > 0);
      }
      return course;
    })
    .filter(course => course.dishes.length > 0);
  console.log(newState);
  return newState;
};

const CashRegisterReducer: React.Reducer<
  ICashRegisterReducerState,
  ICashRegisterAction
> = (state, action) => {
  switch (action.type) {
    case ActionType.AddDish:
      return addDish(
        state,
        action.payload.dishShortName,
        action.payload.price,
        action.payload.courseName,
        action.payload.kitchen
      );
    case ActionType.RemoveDish:
      return removeDish(
        state,
        action.payload.dishShortName,
        action.payload.courseName
      );
    case ActionType.ResetOrder:
      return { orderNum: undefined, courses: [] };
    case ActionType.ChangeNotes:
      return changeNote(
        state,
        action.payload.courseName,
        action.payload.kitchen,
        action.payload.notes
      );
    default:
      throw new Error();
  }
};

export default CashRegisterReducer;
