'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { WaterBill } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import service from '@/components/watter-bill/water-bill-service';
import { useEffect, useMemo, useState } from "react";
import { useWaterBill } from "./water-bill-provider";
import { useMember } from "../warga/member-provider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { WargaDialog } from "../warga/warga-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { cn, formatCurrency } from "@workspace/ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@workspace/ui/components/calendar";

const formSchema = z.object({
    initialReading: z.coerce.number().int().positive(),
    finalReading: z.coerce.number().int().positive(),
    // cannot be "no-data"
    memberId: z.string().nonempty(),
    date: z.date(),
});

type WaterBillFormProps = {
    model?: WaterBill;
    onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

export default function WaterBillForm(props: WaterBillFormProps) {
    const { model, onSubmit: onSubmitProps } = props;
    const [submitting, setSubmitting] = useState(false);
    const {
        store,
    } = useWaterBill();

    const {
        list: members,
        getList: getMembers,
    } = useMember();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: model,
        shouldUnregister: false,
    })

    const waterBill: Partial<WaterBill> = useMemo(() => {
        const initialReading = form.watch('initialReading');
        const finalReading = form.watch('finalReading');
        const consumption = finalReading - initialReading;
        const ratePerUnit: [number, number, number] = [2000, 2500, 3000];
        const baseCharge = 3000;
        const additionalFees = 1000;


        const tier1Volume = Math.min(consumption, 10);
        const tier2Volume = Math.min(Math.max(consumption - 10, 0), 10);
        const tier3Volume = Math.max(consumption - 20, 0);

        const tier1Rate = ratePerUnit[0] ?? 0;
        const tier2Rate = ratePerUnit[1] ?? 0;
        const tier3Rate = ratePerUnit[2] ?? 0;

        const totalAmount = baseCharge + (tier1Volume * tier1Rate) + (tier2Volume * tier2Rate) + (tier3Volume * tier3Rate) + additionalFees;

        const bill: Partial<WaterBill> = {
            memberId: form.watch('memberId'),
            initialReading,
            finalReading,
            consumption,
            additionalFees,
            totalAmount,
            baseCharge,
            usageBreakdown: {
                tier1Volume,
                tier1Rate,
                tier2Volume,
                tier2Rate,
                tier3Volume,
                tier3Rate,
                fixedFees: additionalFees,
            },
            ratePerUnit,
            date: form.watch('date'),
        }
        return bill;
    }, [form.watch('initialReading'), form.watch('finalReading'), form.watch('memberId'), form.watch('date')]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        // member, optional Member
        setSubmitting(true);
        try {
            const isUpdate = !!model;
            if (isUpdate) {
                service.update(model!.id, {
                    ...model,
                    ...values
                });
            } else {
                store(waterBill);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
            onSubmitProps?.(values);
        }

    }

    useEffect(() => {
        getMembers();
    }, [])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="memberId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pelanggan</FormLabel>
                            <div className="flex items-center gap-3">
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <SelectTrigger className="">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {members.map((member) => (
                                                <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                                            ))}
                                            {
                                                members && members?.length == 0 &&
                                                <>
                                                    <SelectItem value={"null"}>Belum ada pelanggan</SelectItem>
                                                </>
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <WargaDialog onSubmit={(member) => {
                                    setTimeout(() => {
                                        if (member.id) {
                                            form.setValue("memberId", member.id, { shouldValidate: true });
                                        }
                                        form.clearErrors();
                                    }, 200);
                                }}>
                                    <Button type="button">+</Button>
                                </WargaDialog>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Tanggal</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="initialReading"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormLabel>Angka Awal</FormLabel>
                                <FormControl>
                                    <Input placeholder="Angka Awal" {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="finalReading"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormLabel>Angka Akhir</FormLabel>
                                <FormControl>
                                    <Input placeholder="Angka Akhir" {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {
                    form.formState.isValid &&
                    <div className="bg-gray-100 p-4 rounded-lg text-foreground/60 text-sm">
                        <div className="flex justify-between">
                            <div className="font-semibold">Penggunaan 1</div>
                            <div className="font-normal">{waterBill.usageBreakdown?.tier1Volume} x {waterBill.usageBreakdown?.tier1Rate} = {formatCurrency((waterBill.usageBreakdown?.tier1Volume ?? 0) * (waterBill.usageBreakdown?.tier1Rate ?? 0))}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="font-semibold">Penggunaan 2</div>
                            <div className="font-normal">{waterBill.usageBreakdown?.tier2Volume} x {waterBill.usageBreakdown?.tier2Rate} = {formatCurrency((waterBill.usageBreakdown?.tier2Volume ?? 0) * (waterBill.usageBreakdown?.tier2Rate ?? 0))}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="font-semibold">Penggunaan 3</div>
                            <div className="font-normal">{waterBill.usageBreakdown?.tier3Volume} x {waterBill.usageBreakdown?.tier3Rate} = {formatCurrency((waterBill.usageBreakdown?.tier3Volume ?? 0) * (waterBill.usageBreakdown?.tier3Rate ?? 0))}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="font-semibold">Lain-lain (Biaya Pelayanan)</div>
                            <div className="font-normal">{formatCurrency(waterBill.usageBreakdown?.fixedFees ?? 0)}</div>
                        </div>
                        <div className="flex justify-between text-foreground mt-3">
                            <div className="font-semibold">Total Tagihan</div>
                            <div className="font-bold">{formatCurrency(waterBill.totalAmount ?? 0)}</div>
                        </div>
                    </div>
                }


                <div className="flex justify-end">
                    <Button loading={submitting} type="submit" disabled={!form.formState.isValid}>Save changes</Button>
                </div>
            </form>
        </Form>
    )
}