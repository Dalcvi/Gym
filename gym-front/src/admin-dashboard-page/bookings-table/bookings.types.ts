import { User } from "../../user";

export type Booking = {
    id: number;
    dateFrom: string;
    dateTo: string;
    client: User;
    trainer: User;
}