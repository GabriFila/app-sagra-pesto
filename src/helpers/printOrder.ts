import jsPDF from 'jspdf';
import { IStorageDish } from '../../types';

const printOrder = (courseNames: string[], storageDishes: IStorageDish[]) => {
  // prep useful data
  const today = new Date();
  const year = today.getFullYear();
  const date = `${year}/${today.getMonth() + 1}/${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}`;
  const listXStart = 30;
  // start x = 10

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
  doc.text(10, lastLine, `Ord. ${45}`);
  doc.text(50, lastLine, `Tot: €${24}`);
  doc.text(90, lastLine, `Coperti ${2}`);
  doc.text(140, lastLine, `${date} - ${time}`);
  lastLine += 10;
  doc.setTextColor('#000000');
  courseNames.forEach((courseName, i) => {
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(listXStart + 10, lastLine, `${courseName}`);
    lastLine += 7;
    doc.setFontType('normal');
    doc.setFontSize(14);
    storageDishes
      .filter(dish => dish.courseName === courseName)
      .forEach(({ storageQt, price, name }, j) => {
        doc.text(listXStart + 15, lastLine, `${name}`);
        doc.text(listXStart + 85, lastLine, `€ ${price.toFixed(2)}`);
        doc.text(listXStart + 120, lastLine, `${2}`);
        lastLine += 6;
      });
    lastLine += 4;
  });
  doc.autoPrint();
  doc.output('dataurlnewwindow');
};

export default printOrder;
