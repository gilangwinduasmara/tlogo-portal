import WaterPage from "@/app/pages/water";
import { AppBar } from "../components/app-bar";
export default function Water() {
    return (
        <div>
            <AppBar title="Water Bill" href="/"/>
            <div className="p-3">
                <WaterPage/>
            </div>
        </div>
    )
}