import jsPDF from 'jspdf';
import { IOrderCourse, IStorageCourse } from '../../../types';

const printOrder = (
  storageCourses: IStorageCourse[],
  courses: IOrderCourse[],
  orderNum: number,
  revenue: number,
  people: number
) => {
  // prep useful data
  const today = new Date();
  const year = today.getFullYear();
  const date = `${year}/${today.getMonth() + 1}/${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}`;
  const listXStart = 30;

  const doc = new jsPDF();

  doc.setFontType('bold');
  doc.setTextColor('#4caf50');
  doc.setFontSize(30);
  let lastLine = 22; // initial line
  doc.text(10, lastLine, 'CNGEI - Sagra del pesto 2020');
  lastLine += 12;
  doc.setTextColor('#ff5722');
  doc.setFontType('normal');
  doc.setFontSize(20);
  doc.text(10, lastLine, `Ord. ${orderNum || 0}`);
  doc.text(50, lastLine, `Tot: €${revenue || 0}`);
  doc.text(90, lastLine, `Coperti ${people || 0}`);
  doc.text(140, lastLine, `${date} - ${time}`);
  lastLine += 10;
  doc.setTextColor('#000000');
  storageCourses.forEach(({ courseName, dishes }) => {
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(listXStart, lastLine, `${courseName}`);
    lastLine += 7;
    doc.setFontType('normal');
    doc.setFontSize(14);
    dishes.forEach(({ qt, price, name, shortName }) => {
      const orderQt = courses
        .find(course => course.courseName === courseName)
        ?.dishes.find(dish => dish.shortName === shortName)?.qt;
      doc.text(listXStart + 15, lastLine, `${name}`);
      doc.text(listXStart + 85, lastLine, `€ ${price.toFixed(2)}`);
      doc.text(listXStart + 120, lastLine, `${orderQt || '-'}`);
      lastLine += 6;
    });
    lastLine += 4;
  });
  doc.autoPrint();
  doc.output('dataurlnewwindow');
};

export default printOrder;
