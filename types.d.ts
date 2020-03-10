export interface IStorage {
  storageCourses: IStorageCourse[];
}

export interface IStorageDish {
  name: string;
  shortName: string;
  storageQt: number;
  price: number;
  isInMenu: boolean;
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
  startingCourses: IStartingCourse[];
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

export interface IStartingCourse {
  name: string;
  dishes: IDish[];
}

export interface IPrepCourse extends IStartingCourse {
  kitchen: string;
  notes: string;
}

export interface ICourse extends IPrepCourse {
  orderNum: number;
  status: string; // (wait,prep,ready,delivered)
}

export interface IStorageCourse extends IStartingCourse {
  kitchen: string;
  dishes: IStorageDish[];
  isInstant: boolean;
}

export interface IDish {
  shortName: string;
  qt: number;
}

export interface IUserSagraRolesDoc {
  name: string;
  roles: string[];
}
