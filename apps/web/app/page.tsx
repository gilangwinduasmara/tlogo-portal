import DeleteDb from "@/components/delete-db"
import PwaInstaller from "@/components/pwa-installer"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-3">
      <div className="max-w-md p-4 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl space-y-3">
        <div className="text-center">
          <div className="font-bold">
            Welcome to Tlogo Portal 👋
          </div>
          <div className="text-foreground/30 text-xs">(Admin Area)</div>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="w-full space-y-3">
          {/* <PwaInstaller>
            <Button variant={"secondary"} size={"lg"} className="w-full">
              📲 Install App
            </Button>
          </PwaInstaller> */}
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
              💧 Water Bill
            </Link>
          </Button>
          <Button variant={"secondary"} size={"lg"} className="w-full" disabled>
            <div>
              😡 Aduan Warga
            </div>
            <div className="text-xs text-foreground/60">(Coming soon)</div>
          </Button>
          <Button variant={"secondary"} size={"lg"} className="w-full" disabled>
            📰 Warta Tlogo
            <div className="text-xs text-foreground/60">(Coming soon)</div>
          </Button>
          <div
            className="border-t border-gray-200"
          ></div>
          <DeleteDb>
            <Button variant={"destructive"} size={"lg"} className="w-full">
              🗑️ Hapus DB
            </Button>
          </DeleteDb>
        </div>
      </div>
      <div className="text-xs text-foreground/60 mt-3">
        Powered by <Link href="https://promager.com" className="text-purple-800" target="_blank">Promager.com</Link>
      </div>
    </div>
  )
}
