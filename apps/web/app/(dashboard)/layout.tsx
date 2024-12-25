export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex min-h-screen justify-center bg-gray-100">
            <div className="w-full w-xl md:max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
                <div className="w-full space-y-4">  
                    {children}
                </div>
            </div>
        </div>
    )
}