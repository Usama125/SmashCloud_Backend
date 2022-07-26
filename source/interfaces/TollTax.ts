import { Document } from 'mongoose'

export default interface ITollTax extends Document {
    entry_point: string
    exit_point: string
    number_plate: string
    entry_date: string
    exit_date: string
    is_exit: boolean
    deleted_at: string
}