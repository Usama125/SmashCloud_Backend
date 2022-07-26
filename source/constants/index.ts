
const BASE_PRICE = 20;
const PRICE_PER_KM = 0.2;
const WEEK_END_PRICE = 1.5;
const WEEKLY_DISCOUNT = 10;
const SPEACIAL_HOLIDAY_DISCOUNT = 50;

const INTERCHANGE = {
    zero: 0,
    ns: 5,
    ph4: 10,
    ferozpur: 17,
    lakecity: 24,
    raiwand: 29,
    bahria: 34
}

const NATIONAL_HOLIDAYS = [
    '14th Aug',
    '23th Mar',
    '25th Dec'
]

const WEEKEND_DAYS = [
    'Sat',
    'Sun'
]

const EVEN_DAYS = [
    'Mon',
    'Wed'
]

const ODD_DAYS = [
    'Tue',
    'Thu'
]

export {
  INTERCHANGE,
  NATIONAL_HOLIDAYS,
  BASE_PRICE,
  PRICE_PER_KM,
  WEEK_END_PRICE,
  WEEKLY_DISCOUNT,
  SPEACIAL_HOLIDAY_DISCOUNT,
  WEEKEND_DAYS,
  EVEN_DAYS,
  ODD_DAYS
}