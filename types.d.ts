export interface IUserSagraRolesDoc {
  name: string;
  roles: string[];
}

export interface IStorage {
  storageCourses: IDish[];
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
  startingCourses: IDish[];
}

export interface IDish {
  shortName: string;
  qt: number;
}

export interface IStorageDish extends IDish {
  name: string;
  shortName: string;
  storageQt: number;
  price: number;
  isInMenu: boolean;
  isInstant: boolean;
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

export interface ICourse {
  name: string;
  kitchen: string;
  orderNum: number;
  status: string; // (wait,prep,ready,delivered)
  notes: string;
  dishes: IDish[];
}
