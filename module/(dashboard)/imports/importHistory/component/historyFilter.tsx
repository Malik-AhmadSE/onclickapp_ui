import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { DropFilterData } from "../data/dropFilterData";
import { Button } from "@/shared/ui/button";

export default function FilterDropDown({setDropFilter}) {
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
                        DropFilterData.map((item,index)=>(
                                <DropdownMenuItem
                                onClick={()=>setDropFilter(item.title)}
                                 key={index}>{item.title}</DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}