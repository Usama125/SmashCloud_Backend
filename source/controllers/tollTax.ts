import { NextFunction, Request, Response } from 'express';
import calculateTax from '../functions/calculateTax';
import makeResponse, { sendErrorResponse } from '../functions/makeResponse';
import TollTax from '../models/TollTax';

const NAMESPACE = "TOLL_TAX";

const enterToRingRoad = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { number_plate } = req.body;

        let alreadyExistVehicle = await TollTax.findOne({
            deleted_at: "",
            number_plate,
            is_exit: false
        })

        if (alreadyExistVehicle) {
            return makeResponse(res, 400, "Vehicle already exists", [], true);
        }

        const result = await new TollTax({ ...req.body }).save();

        return makeResponse(res, 200, "SUCCESS", result, false);

    } catch (err) {
        // @ts-ignore
        return makeResponse(res, 400, err.message, result, true);
    }
};

const exitFromRingRoad = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { exit_point, number_plate, exit_date } = req.body;

        const filter = {
            deleted_at: "",
            number_plate,
            is_exit: false
        }
        
        let checkvehicalExist = await TollTax.findOne(filter)

        if (!checkvehicalExist) {
            return makeResponse(res, 400, "Vehicle not exists", [], true);
        }

        const { entry_point, entry_date } = JSON.parse(JSON.stringify(checkvehicalExist));

        let calculatedresult = await calculateTax(entry_point, exit_point, number_plate, entry_date, exit_date);

        let update = { exit_point, exit_date, is_exit: true }

        await TollTax.findOneAndUpdate(filter, update, { upsert: true });

        return makeResponse(res, 200, "SUCCESS", calculatedresult, false);

    } catch (err) {
        // @ts-ignore
        return makeResponse(res, 400, err.message, [], true);

    }
};

export default {
    enterToRingRoad,
    exitFromRingRoad
};
