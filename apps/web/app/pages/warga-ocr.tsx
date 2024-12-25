'use client';

import { useMember } from "@/components/warga/member-provider";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Scanner = (props: {
    onResult: (result: string[] | null) => void
}) => {
    const { onResult } = props
    const [loading, setLoading] = useState(false)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            extractTextFromImage(file)
        }
    }

    const handleButtonSelectFile = () => {
        const input = document.querySelector('input[type="file"]')
        if (input instanceof HTMLInputElement) {
            input.click()
        }
    }

    const extractTextFromImage = async (file: File) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('attachment', file)
            const host = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000'
            const response = await axios.post(`${host}/ocr/members-name`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            })
            const names = response.data.data
            onResult(names);
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-3 w-full h-full flex flex-col justify-center items-center">
            <div
                className="text-orange-400"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.5} stroke="currentColor" className="size-[8rem]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
            </div>
            <div className="text-center">
                <h1 className="text-2xl font-bold">Input Nama Warga Pakai OCR</h1>
                <p className="text-gray-500">Klik tombol di bawah untuk menginput nama warga pakai OCR</p>
                <Button size={"lg"} variant={'outline'} onClick={handleButtonSelectFile} loading={loading}>
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                        Pilih File
                    </>
                </Button>
                {/* image only */}
                <input type="file" className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
        </div>
    )
}


const Editor = (props: {
    names: string[],
}) => {
    const { names } = props
    const [value, setValue] = useState<string[]>(names)
    const {addMember} = useMember()
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const router = useRouter()

    const handleSave = async () => {
        setLoading(true)
        let i = 0
        for (const name of value) {
            await addMember({
                name
            });
            i++
            setProgress(i / value.length * 100)
        }
        setLoading(false)
        router.replace('/warga')
    }
    return (
        <>
            <div className="p-3 bg-slate-200">
                <div className="overflow-y-auto max-h-screen pb-24 space-y-2 relative">
                    {
                        value.map((name, index) => (
                            <>
                                <div className="p-3 border-card bg-card flex justify-center gap-2 items-center">
                                    <Input
                                        className="bg-none border-none"
                                        value={name}
                                        onChange={(e) => {
                                            const newValue = [...value]
                                            newValue[index] = e.target.value
                                            setValue(newValue)
                                        }}
                                    />
                                    <Button
                                        variant={"destructive"}
                                        size={"sm"}
                                        onClick={() => {
                                            const newValue = [...value]
                                            newValue.splice(index, 1)
                                            setValue(newValue)
                                        }}
                                    >Delete</Button>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex justify-center">
                <div className="max-w-xl w-full flex justify-center p-3 bg-background border-t">
                    <Button className="w-full" onClick={handleSave} loading={loading}>
                        {loading ? `Menyimpan ${progress.toFixed(2)}%` : "Simpan"}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default function InputOcrWargaPage() {
    const [result, setResult] = useState<string[] | null>(null)
    if (result) {
        return (
            <Editor names={result} />
        )
    }
    return (
        <Scanner
            onResult={setResult}
        />
    )
}