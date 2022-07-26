import { BASE_PRICE, EVEN_DAYS, INTERCHANGE, ODD_DAYS, PRICE_PER_KM, SPEACIAL_HOLIDAY_DISCOUNT, WEEKEND_DAYS, WEEKLY_DISCOUNT, WEEK_END_PRICE } from "../constants";
import { getDayOfTheWeek, isEvenAndOdd, todayIsNationHoliday } from "./helper";

const calculateTax = async (entry_point: string, exit_point: string, number_plate: string, entry_date: string, exit_date: string) => {
    let calculatedAmount;
    let discount = 0;
    let totalDistanceTraveled;

    // @ts-ignore
    let entryInterchange = INTERCHANGE[entry_point];
    // @ts-ignore
    let exitInterchange = INTERCHANGE[exit_point];
    

    if(entryInterchange < exitInterchange){
        totalDistanceTraveled =  exitInterchange - entryInterchange;
    }else {
        totalDistanceTraveled =  entryInterchange - exitInterchange;
    }

    calculatedAmount = Math.ceil(PRICE_PER_KM * totalDistanceTraveled);

    let isEven = await isEvenAndOdd(number_plate);

    if (WEEKEND_DAYS.includes(getDayOfTheWeek(exit_date))) {
        calculatedAmount = Math.ceil(calculatedAmount * WEEK_END_PRICE);
    }

    if ((EVEN_DAYS.includes(getDayOfTheWeek(entry_date)) && isEven) || (ODD_DAYS.includes(getDayOfTheWeek(entry_date)) && !isEven)) {
        discount += WEEKLY_DISCOUNT;
    }

    if (todayIsNationHoliday()) {
        discount += SPEACIAL_HOLIDAY_DISCOUNT
    }

    let subTotal = BASE_PRICE + calculatedAmount;
    let percentageValue = Math.ceil(discount > 0 ? (subTotal / 100) * discount : 0);
    let finalAmount = subTotal - percentageValue;

    return {
        base_rate: BASE_PRICE,
        distance_cost: calculatedAmount,
        sub_total: subTotal,
        discount: percentageValue,
        total_charged: finalAmount
    }
}

export default calculateTax