import { Benefit } from "../benefits-table/benefits-table.types";

export type Plan = {
    id: number;
    title: string;
    originalPrice: number;
    currentPrice: number;
    benefits: Benefit[];
}