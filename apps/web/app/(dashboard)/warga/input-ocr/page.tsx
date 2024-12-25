'use client';

import InputOcrWargaPage from "@/app/pages/warga-ocr";
import { AppBar } from "../../components/app-bar";

export default function Page() {
    return (
        <div className="h-full">
            <AppBar title="Kelola Warga" href="/warga"/>
            <InputOcrWargaPage />
        </div>
    )
}