"use client"
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { DropFilterData } from "../module/(dashboard)/imports/importHistory/data/dropFilterData";
import { Button } from "@/shared/ui/button";


export default function FilterDropDown({setFilter, data}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-7 w-20 rounded-[4px]"> <img src="../Funnel.svg" alt="" />
                    <p className="text-[#666D80] ">Filter</p></Button>
            </DropdownMenuTrigger>
             <DropdownMenuSeparator />
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-[#666D80]">Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {
                        data.map((item,index)=>(
                                <DropdownMenuItem
                                onClick={()=>setFilter(item.title)}
                                 key={index}>{item.title}</DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}