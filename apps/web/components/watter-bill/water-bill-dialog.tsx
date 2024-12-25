'use client';

import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import WaterBillForm from "./water-bill-form";
import { useState } from "react";

export function WaterBillDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen}>
            <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
                {children}
            </div>
            <DialogContent className="sm:max-w-[425px]" onClose={() => setIsOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Water Bill</DialogTitle>
                    <DialogDescription>
                        {/* Make changes to your profile here. Click save when you're done. */}
                    </DialogDescription>
                </DialogHeader>
                <WaterBillForm onSubmit={() => {
                    setIsOpen(false);
                }} />
            </DialogContent>
        </Dialog>
    )
}
