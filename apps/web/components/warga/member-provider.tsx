import { Member } from "@workspace/types";
import { createContext, ReactNode, useContext, useState } from "react";

import service from "./member-service";

type WargaContextType = {
    list : Member[];
    getList : () => void;
    addMember : (member: Omit<Member, 'id'>) => Promise<Member>;
    updateMember : (member: Member) => void;
    deleteMember : (id: string) => void;
}

const context = createContext<WargaContextType | undefined>(undefined);

export const MemberProvider = ({children}: {children: ReactNode}) => {
    const [list, setList] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const getList = async () => {
        setLoading(true);
        const data = await service.find();
        setList(data);
    }

    const addMember = async (member: Omit<Member, 'id'>) => {
        const result = await service.store(member);
        getList();
        return result;
    }

    const updateMember = async (member: Member) => {}

    const deleteMember = async (id: string) => {}



    return (
        <context.Provider value={{
            getList,
            list,
            addMember,
            updateMember,
            deleteMember
        }}>
            {children}
        </context.Provider>
    )
}

export const useMember = () => {
    const ctx = useContext(context);
    if (!ctx) {
        throw new Error("useMember must be used within a MemberProvider");
    }
    return ctx;
}