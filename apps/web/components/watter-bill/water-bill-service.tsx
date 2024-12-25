'use client';
import config from "@/config";
import { Member, WaterBill } from "@workspace/types";
import memberService, {dbKey as memberDbKey} from '../warga/member-service';

const dbKey = `${config.localDbVersion}:watter-bills`;

export default {
    store: (value: Partial<WaterBill>) => {
        const model: Partial<WaterBill> = {
            id: Math.random().toString(36).substr(2, 9),
            ...value
        }
        const models = JSON.parse(localStorage.getItem(dbKey) || "[]");
        models.push(model);
        localStorage.setItem(dbKey, JSON.stringify(models));
    },
    findById: (id: string) => {
        const models = JSON.parse(localStorage.getItem(dbKey) || "[]");
        return models.find((member: WaterBill) => member.id === id);
    },
    find: async (query: string = "") => {
        let models: WaterBill[] = JSON.parse(localStorage.getItem(dbKey) || "[]");
        // assign member
        // models = models.filter((model: WaterBill) => model.name.includes(query));
        // models = await Promise.all(models.map(async (model) => {
        //     const member = 
        //     return member;
        // }))
        const members: Member[] = JSON.parse(localStorage.getItem(memberDbKey) || "[]");
        models = models.map((model) => {
            const member = members.find((member) => member.id === model.memberId);
            if(member) {
                model.member = member;
            }
            return model
        })

        // order by date
        models = models.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        return models;
    },
    update: (id: string, model: WaterBill) => {
        const models = JSON.parse(localStorage.getItem(dbKey) || "[]");
        const index = models.findIndex((model: WaterBill) => model.id === id);
        models[index] = model;
        localStorage.setItem(dbKey, JSON.stringify(models));
    },
    delete: (id: string) => {
        const models = JSON.parse(localStorage.getItem(dbKey) || "[]");
        const index = models.findIndex((model: WaterBill) => model.id === id);
        models.splice(index, 1);
        localStorage.setItem(dbKey, JSON.stringify(models));
    },
}