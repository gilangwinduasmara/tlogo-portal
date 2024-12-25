import WargaPage from "@/app/pages/warga";
import { AppBar } from "../components/app-bar";
export default function Water() {
    return (
        <div>
            <AppBar title="Kelola Warga" href="/"/>
            <div className="p-3">
                <WargaPage/>
            </div>
        </div>
    )
}