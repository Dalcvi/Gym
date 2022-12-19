import { Benefit } from "../../../admin-dashboard-page/benefits-table/benefits-table.types";

export type PricingItemProps = {
    title: string;
    availableBenefits: Benefit[];
    origPrice: number;
    curPrice: number;
    allBenefits: Benefit[];
    onActivateClick?: () => void;
    onDeleteClick?: () => void;
    onEditClick?: () => void;
}