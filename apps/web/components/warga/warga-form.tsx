'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import service from '@/components/warga/member-service';
import { useState } from "react";
import { useMember } from "./member-provider";

const formSchema = z.object({
    name: z.string(),
});

type WargaFormProps = {
    model?: Member;
    onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

export default function WargaForm(props: WargaFormProps) {
    const { model, onSubmit: onSubmitProps } = props;
    const [submitting, setSubmitting] = useState(false);
    const {
        addMember,
        getList,
    } = useMember();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: model,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        
        // member, optional Member
        setSubmitting(true);
        try {
            const isUpdate = !!model;
            if(isUpdate) {
                service.update(model!.id, {
                    ...model,
                    ...values
                });
            }else {
                const result = await addMember(values);
                props.onSubmit?.(result);
            }
        }catch(e) {
            console.error(e);
        }finally {
            getList();
            setSubmitting(false);
        }
        
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }: any) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input placeholder="nama" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button loading={submitting} type="submit">Save changes</Button>
                </div>
            </form>
        </Form>
    )
}