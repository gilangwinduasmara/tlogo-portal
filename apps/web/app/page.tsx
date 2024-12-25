import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="max-w-md p-4 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl space-y-3">
        <div className="text-center font-bold">
          Welcome to Tlogo Portal 👋
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="w-full space-y-3">
          <Button variant={"secondary"} size={"lg"} className="w-full" asChild>
            <Link
              href="/warga"
            >
              🧑 Warga
            </Link>
          </Button>
          <Button variant={"secondary"} size={"lg"} className="w-full" asChild>
            <Link
              href="/water"
            >
              💧Water Bill
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
