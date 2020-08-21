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
  AddPerson = 'AddPerson',
  RemovePerson = 'RemovePerson',
  SetPeople = 'SetPeople',
  ResetState = 'ResetOrder',
  OrderReceived = 'OrderReceived',
  ChangeNote = 'ChangeNotes',
  ChangeOrderNote = 'ChangeOrderNote',
  SendOrder = 'SendOrder',
  InstantOrderCreated = 'InstantOrderCreated',
  TriggerError = 'TriggerError'
}

export interface ICashRegisterReducerState {
  orderNum: number | undefined;
  orderNote: string;
  courses: IOrderCourse[];
  people: number;
  revenue: number;
  waitingOrderRes: boolean;
  waitingToEndOrder: boolean;
  isError: boolean;
}

export interface ICashRegisterAction {
  type: ActionType;
  payload?: {
    dishShortName?: string;
    price?: number;
    courseName?: string;
    kitchen?: string;
    note?: string;
    people?: number;
    orderNum?: number;
  };
}

export const initialCashRegsiterState: ICashRegisterReducerState = {
  orderNum: undefined,
  orderNote: '',
  people: 0,
  courses: [],
  revenue: 0,
  waitingOrderRes: false,
  waitingToEndOrder: false,
  isError: false
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
      note: ''
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
  newState.revenue += price;
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
          if (dish.shortName === shortName) {
            dish.qt--;
            newState.revenue -= dish.price;
          }
          return dish;
        });
        course.dishes = course.dishes.filter(dish => dish.qt > 0);
      }
      return course;
    })
    .filter(course => course.dishes.length > 0);
  return newState;
};

const changeNote = (
  prevState: ICashRegisterReducerState,
  courseName: string,
  kitchen: string,
  note: string
): ICashRegisterReducerState => {
  const newState = { ...prevState };
  if (!isCourseAlreadyInOrder(newState.courses, courseName))
    newState.courses.push({
      kitchen,
      courseName,
      dishes: [],
      note: note
    });
  else
    newState.courses.map(course => {
      if (course.courseName === courseName) course.note = note;
      return course;
    });
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
    case ActionType.ChangeNote:
      return changeNote(
        state,
        action.payload.courseName,
        action.payload.kitchen,
        action.payload.note
      );
    case ActionType.ChangeOrderNote:
      return { ...state, orderNote: action.payload.note };
    case ActionType.SendOrder:
      return { ...state, waitingOrderRes: true };
    case ActionType.SetPeople:
      return { ...state, people: action.payload.people };
    case ActionType.OrderReceived:
      return {
        ...state,
        orderNum: action.payload.orderNum,
        waitingOrderRes: false,
        waitingToEndOrder: true
      };
    case ActionType.AddPerson:
      return {
        ...state,
        people: state.people + 1
      };
    case ActionType.RemovePerson:
      return { ...state, people: state.people - 1 };
    case ActionType.InstantOrderCreated:
      return {
        ...state,
        waitingOrderRes: false,
        waitingToEndOrder: true
      };
    case ActionType.TriggerError:
      return {
        ...state,
        isError: true
      };
    case ActionType.ResetState:
      return {
        orderNum: undefined,
        orderNote: '',
        people: 0,
        courses: [],
        revenue: 0,
        waitingOrderRes: false,
        waitingToEndOrder: false,
        isError: false
      };
    default:
      throw new Error();
  }
};

export default CashRegisterReducer;
