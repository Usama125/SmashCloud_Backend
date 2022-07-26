import moment from "moment";
import { NATIONAL_HOLIDAYS } from "../constants";

const isEvenAndOdd = async (numberPlate: any) => {
  let number = numberPlate.split("-")[1];
  return number % 2 === 0 ? true : false
}

const todayIsNationHoliday = () => {
  let today = moment().format("Do MMM");
  return NATIONAL_HOLIDAYS.includes(today);
}

const getDayOfTheWeek = (date: any) => {
  return moment(date, 'YYYY/MM/DD').format('ddd');
}

export {
  isEvenAndOdd,
  todayIsNationHoliday,
  getDayOfTheWeek
}