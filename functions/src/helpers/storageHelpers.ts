import { IStorageCourse, IInstantOrderCourse } from '../../../types';

export const removeDishesFromStorage = (
  newCourses: IInstantOrderCourse[],
  storageCourses: IStorageCourse[]
) => {
  newCourses.forEach(course => {
    course.dishes.forEach(dish => {
      storageCourses.map(storageCourse => {
        if (storageCourse.courseName === course.courseName)
          storageCourse.dishes.map(storageDish => {
            if (dish.shortName === storageDish.shortName)
              storageDish.qt -= dish.qt;
            return dish;
          });
        return course;
      });
    });
  });
  return storageCourses;
};
