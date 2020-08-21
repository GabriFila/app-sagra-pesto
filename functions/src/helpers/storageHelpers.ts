import { IStorageCourse, IInstantOrderCourse, IDish } from '../../../types';

export const removeCoursesFromStorage = (
  newCourses: IInstantOrderCourse[],
  storageCourses: IStorageCourse[]
) => {
  let newStorageCourses = [...storageCourses];
  newCourses.forEach(course => {
    course.dishes.forEach(dish => {
      newStorageCourses = storageCourses.map(storageCourse => {
        if (storageCourse.courseName === course.courseName)
          storageCourse.dishes.map(storageDish => {
            if (dish.shortName === storageDish.shortName)
              storageDish.qt -= dish.qt;
            return dish;
          });
        return storageCourse;
      });
    });
  });
  return newStorageCourses;
};

export const addDishesToStorage = (
  oldDishes: IDish[],
  storageCourses: IStorageCourse[],
  courseName: string
) => {
  let newStorageCourses = [...storageCourses];
  oldDishes.forEach(dish => {
    newStorageCourses = storageCourses.map(storageCourse => {
      if (storageCourse.courseName === courseName)
        storageCourse.dishes.map(storageDish => {
          if (dish.shortName === storageDish.shortName)
            storageDish.qt += dish.qt;
          return dish;
        });
      return storageCourse;
    });
  });
  return newStorageCourses;
};
