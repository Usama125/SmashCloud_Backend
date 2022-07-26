import mongoose, { Schema } from 'mongoose';
import ITollTax from '../interfaces/TollTax';

const TollTaxSchema: Schema = new Schema(
    {
        entry_point: {
            type: String,
            required: true
        },
        exit_point: {
            type: String,
            default: ""
        },
        number_plate: {
            type: String,
            required: true
        },
        entry_date: {
            type: String,
            required: true
        },
        exit_date: {
            type: String,
            default: ""
        },
        is_exit: {
            type: Boolean,
            default: false,
        },
        deleted_at: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITollTax>('TollTax', TollTaxSchema);
