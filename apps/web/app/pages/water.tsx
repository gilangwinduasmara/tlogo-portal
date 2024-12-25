'use client';

import WaterBillOverview from "@/components/watter-bill/water-bill-overview";
import { WaterBillTable } from "@/components/watter-bill/water-bill-table";

export default function WaterPage(){
    return (
        <div>
            <WaterBillOverview />
            <WaterBillTable />
        </div>
    )
}