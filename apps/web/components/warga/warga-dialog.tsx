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
import WargaForm from "./warga-form";
import { useState } from "react";
import { Member } from "@workspace/types";

export function WargaDialog({ children, onSubmit }: { children: React.ReactNode, onSubmit?: (member: Partial<Member>) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen}>
            <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
                {children}
            </div>
            <DialogContent className="sm:max-w-[425px]" onClose={() => setIsOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Warga</DialogTitle>
                    <DialogDescription>
                        {/* Make changes to your profile here. Click save when you're done. */}
                    </DialogDescription>
                </DialogHeader>
                <WargaForm onSubmit={(value) => {
                    setIsOpen(false);
                    onSubmit?.(value);
                }} />
            </DialogContent>
        </Dialog>
    )
}
