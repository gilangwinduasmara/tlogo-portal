'use client';
import config from "@/config";
import { Member } from "@workspace/types";

export const dbKey = `${config.localDbVersion}:members`;

export default {
    store: (value: Omit<Member, 'id'>) => {
        const member: Member = {
            id: Math.random().toString(36).substr(2, 9),
            ...value
        }
        const members = JSON.parse(localStorage.getItem(dbKey) || "[]");
        members.push(member);
        localStorage.setItem(dbKey, JSON.stringify(members));
        return member;
    },
    findById: (id: string) => {
        const members = JSON.parse(localStorage.getItem(dbKey) || "[]");
        return members.find((member: Member) => member.id === id);
    },
    find: async (query: string = "") => {
        const members = JSON.parse(localStorage.getItem(dbKey) || "[]");
        return members.filter((member: Member) => member.name.includes(query));
    },
    update: (id: string, member: Member) => {
        const members = JSON.parse(localStorage.getItem(dbKey) || "[]");
        const index = members.findIndex((member: Member) => member.id === id);
        members[index] = member;
        localStorage.setItem(dbKey, JSON.stringify(members));
    },
    delete: (id: string) => {
        const members = JSON.parse(localStorage.getItem(dbKey) || "[]");
        const index = members.findIndex((member: Member) => member.id === id);
        members.splice(index, 1);
        localStorage.setItem(dbKey, JSON.stringify(members));
    }
}