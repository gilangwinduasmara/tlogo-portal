import { WaterBill } from "./water-bill";

type Member = {
    id: string;
    name: string;
    waterBills?: WaterBill
}

export type { Member }