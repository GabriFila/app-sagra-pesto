export interface IUserSagraRolesDoc {
  name: string;
  roles: string[];
}

export interface IStorage {
  storageCourses: IStorageCourse[];
}

export interface IStorageCourse extends ICourse {
  dishes: IStorageDish[];
  isInstant: boolean;
}

export interface ICourse {
  courseName: string;
  kitchen: string;
}

export interface IInstantOrderCourse extends ICourse {
  dishes: IDish[];
}
export interface IOrderCourse extends ICourse {
  dishes: IOrderDish[];
  note: string;
}

export interface IService {
  start: firebase.firestore.Timestamp | null;
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
}

export type OrderStatus = "pending" | "active" | "completed" | "deleted";
export interface IOrder {
  orderNum: number;
  status: OrderStatus;
  waiterName: string; // display name of waiter
  waiterId: string; // id of waiter to link
  tableNum: number;
  revenue: number;
  note?: string;
}

export interface IDBOrder extends IOrder {
  orderId: string;
}

export type CourseStatus = "wait" | "prep" | "ready" | "delivered" | "deleted";
export interface IDBCourse extends ICourse {
  courseId?: string;
  dishes: IDish[];
  orderNum: number;
  status: CourseStatus;
  note: string;
  tableNum: number;
}

interface IInstantOrder {
  revenue: number;
  courses: IInstantOrderCourse[];
}
