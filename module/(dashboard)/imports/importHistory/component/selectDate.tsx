import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { SelectData } from "../data/selectDateData"
import { useState } from "react"


export default function SelectDate() {
    const [value, setValue] = useState(SelectData[0].date)
    return (
        <Select value={value} onValueChange={setValue} >
            <SelectTrigger className="border-none shadow-none">
                <SelectValue>{value}</SelectValue>
            </SelectTrigger>

            <SelectContent>
               {
                SelectData.map((item)=>(
                     <SelectItem key={item.id} value={item.date}>{item.date}</SelectItem>
                ))
               }
            </SelectContent>
        </Select>
    )
}