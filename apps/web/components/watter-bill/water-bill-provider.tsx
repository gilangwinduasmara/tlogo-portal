import { WaterBill } from "@workspace/types";
import { createContext, ReactNode, useContext, useState } from "react";

import service from "./water-bill-service";

type WaterBillContextType = {
    list : WaterBill[];
    getList : () => void;
    store : (value: Partial<WaterBill>) => void;
    update : (id: string, value: WaterBill) => void;
    remove : (id: string) => void;
}

const context = createContext<WaterBillContextType | undefined>(undefined);

export const WaterBillProvider = ({children}: {children: ReactNode}) => {
    const [list, setList] = useState<WaterBill[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const getList = async () => {
        setLoading(true);
        const data = await service.find();
        console.log(data);
        setList(data);
    }

    const store = async (value: Partial<WaterBill>) => {
        await service.store(value);
        getList();
    }

    const update = async (id: string, value: WaterBill) => {}

    const remove = async (id: string) => {}


    return (
        <context.Provider value={{
            getList,
            list,
            store,
            update,
            remove,
        }}>
            {children}
        </context.Provider>
    )
}

export const useWaterBill = () => {
    const ctx = useContext(context);
    if (!ctx) {
        throw new Error("useWaterBill must be used within a WaterBillProvider");
    }
    return ctx;
}