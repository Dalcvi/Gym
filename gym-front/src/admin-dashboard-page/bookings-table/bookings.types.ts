import { GymUser } from "../users-table/users-table.types";

export type Booking = {
    id: number;
    dateFrom: string;
    dateTo: string;
    client: GymUser;
    trainer: GymUser;
}