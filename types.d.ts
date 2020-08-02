export interface IUserSagraRolesDoc {
  name: string;
  roles: string[];
}

export interface IStorage {
  storageCourses: IStorageCourse[];
}

export interface IStorageCourse extends ICourse {
  dishes: IStorageDish[];
}

export interface ICourse {
  courseName: string;
  kitchen: string;
}
export interface IOrderCourse extends ICourse {
  dishes: IOrderDish[];
  note: string;
}

export interface IService {
  start: Date | null;
  end: Date | null;
  totalRevenue: number;
  totalInstantRevenue: number;
  totalPeople: number; // total number of people
  lastOrderNum: number; // progressive counter for orders
  totalInstantOrders: number;
  totalOrders: number;
  startingDishes: IDish[];
}
interface IDish {
  shortName: string;
  qt: number;
}
export interface IOrderDish extends IDish {
  price: number;
}

export interface IStorageDish extends IOrderDish {
  name: string;
  isInMenu: boolean;
  isInstant: boolean;
}

export interface IOrder {
  people: number;
  orderNum: number;
  status: string; // (pending, active, completed, deleted)
  waiterName: string; // display name of waiter
  waiterId: string; // id of waiter to link
  table: number;
  revenue: number;
  note?: string;
  // TODO implement notes in UI
}

export interface IDBCourse extends ICourse {
  dishes: IDish[];
  orderNum: number;
  status: string; // (wait,prep,ready,delivered)
  note: string;
}
