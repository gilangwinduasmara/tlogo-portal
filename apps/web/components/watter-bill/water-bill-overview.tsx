'use client';

import { ReactNode, useEffect, useMemo } from "react";
import { useWaterBill } from "./water-bill-provider";


type OverviewCardProps = {
    title: ReactNode;
    value: ReactNode;
    growth?: ReactNode;
}
const OverviewCard = (props: OverviewCardProps) => {
    const { title, value, growth } = props;
    return (
        <div className="bg-card border shadow-sm rounded p-3">
            <div className="text-foreground text-sm">{title}</div>
            <div className="text-xl font-bold">{value}</div>
            <div className="text-sm">
                {growth && (growth)}
            </div>
        </div>
    )
}

export default function WaterBillOverview() {
    const {
        list,
        getList
    } = useWaterBill();

    useEffect(() => {
        getList
    }, [])

    const currentMonthTotalAmmoutSum = useMemo(() => {
        return list
            .filter((item) => {
                const date = new Date(item.date);
                return date.getMonth() === new Date().getMonth();
            })
            .reduce((acc, item) => acc + item.totalAmount, 0)
    }, [list])

    const currentMonthtotalConsumptionSum = useMemo(() => {
        return list.reduce((acc, item) => acc + item.consumption, 0)
    }, [list])
    

    const lastMonthTotalAmmoutSum = useMemo(() => {
        return list
            .filter((item) => {
                const date = new Date(item.date);
                return date.getMonth() === new Date().getMonth() - 1;
            })
            .reduce((acc, item) => acc + item.totalAmount, 0)
    }, [list])

    const lastMonthtotalConsumptionSum = useMemo(() => {
        return list
            .filter((item) => {
                const date = new Date(item.date);
                return date.getMonth() === new Date().getMonth() - 1;
            })
            .reduce((acc, item) => acc + item.consumption, 0)
    }, [list])

    const revenueGrowth = useMemo(() => {
        return (((currentMonthTotalAmmoutSum - lastMonthTotalAmmoutSum) / lastMonthTotalAmmoutSum) * 100)
    }, [currentMonthTotalAmmoutSum, lastMonthTotalAmmoutSum])

    const consumptionGrowth = useMemo(() => {
        return (((currentMonthtotalConsumptionSum - lastMonthtotalConsumptionSum) / lastMonthtotalConsumptionSum) * 100)
    }, [currentMonthtotalConsumptionSum, lastMonthtotalConsumptionSum])

    return (
        <div>
            <div className="grid grid-cols-2 gap-3">
                <OverviewCard 
                    title="Total Revenue"
                    value={`Rp. ${currentMonthTotalAmmoutSum}`}
                    growth={(
                        <>
                            <span style={{ color: revenueGrowth > 0 ? 'green' : 'red' }}>
                                {revenueGrowth > 0 ? '+' : ''}{revenueGrowth.toFixed(2)}%
                            </span>
                            <span className="text-xs ml-1 text-foreground/40">dari bulan lalu</span>
                        </>
                    )}
                />
                <OverviewCard 
                    title="Penggunaan Air"
                    value={`${currentMonthtotalConsumptionSum} m3`}
                    growth={(
                        <>
                            <span
                                style={{ color: consumptionGrowth > 0 ? 'green' : 'red' }}
                            >
                                {consumptionGrowth > 0 ? '+' : ''}{consumptionGrowth.toFixed(2)}%
                            </span>
                            <span className="text-xs ml-1 text-foreground/40">dari bulan lalu</span>
                        </>
                    )}
                />
            </div>
        </div>
    );
}