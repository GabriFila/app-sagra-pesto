export interface IStorage {
  courses: IStorageCourse[];
}
export interface IStorageCourse {
  name: string;
  kitchen: string;
  dishes: IStorageDish[];
  isInstant: boolean;
}
export interface IStorageDish {
  name: string;
  shortName: string;
  storageQt: number;
  price: number;
  inMenu: boolean;
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
  startingCourses: IStartingCourses[];
}

export interface IStartingCourses {
  name: string;
  dishes: IDish[];
}

export interface IOrder {
  orderNum: number;
  status: string; // (pending, active, completed, deleted)
  waiterName: string; // display name of waiter
  waiterId: string; // id of waiter to link
  table: number;
  revenue: number;
  notes: string;
}

export interface ICourse extends IStartingCourses {
  orderNum: number;
  kitchen: string;
  status: string; // (wait,prep,ready,delivered)
  notes: string;
}

export interface IDish {
  shortName: string;
  qt: number;
}

export interface IUserSagraRolesDoc {
  name: string;
  roles: string[];
}
