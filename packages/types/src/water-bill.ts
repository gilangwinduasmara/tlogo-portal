import { Member } from "./member";

type WaterBill = {
    id: string; // Unique identifier for the water bill
    initialReading: number; // Initial water meter reading
    finalReading: number; // Final water meter reading
    consumption: number; // Total water consumption (finalReading - initialReading)
    baseCharge: number; // Fixed base charge applied to all customers
    ratePerUnit: [number, number, number]; // Rates per unit for different consumption tiers
    additionalFees: number; // Additional fixed fees (e.g., maintenance or administrative fees)
    totalAmount: number; // Total bill amount after calculation
    usageBreakdown: {
        tier1Volume: number; // Volume of water used in the first tier (up to 10 units)
        tier1Rate: number; // Rate applied for the first tier
        tier2Volume: number; // Volume of water used in the second tier (11–20 units)
        tier2Rate: number; // Rate applied for the second tier
        tier3Volume: number; // Volume of water used in the third tier (21+ units)
        tier3Rate: number; // Rate applied for the third tier
        fixedFees: number; // Miscellaneous fixed fees
    };
    member: Member;
    memberId: string;
    date: Date;
};

export type { WaterBill };