"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { HeaderDropData } from "@/data/headerDropData"
import { useState } from "react"


export default function HeaderDropDown() {
    const [value , setValue] = useState(HeaderDropData[0].title)
    return (
        <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="border-none shadow-none" >
                <SelectValue>{value}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                   {
                    HeaderDropData.map((item)=>(
                         <SelectItem key={item.id} value={item.title}>{item.title}</SelectItem>
                    ))
                   }                  
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}