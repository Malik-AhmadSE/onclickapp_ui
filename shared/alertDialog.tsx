import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/ui/alert-dialog"
import { Button } from "@/shared/ui/button"
import { Trash2Icon } from "lucide-react"

export function AlertDialogDelete() {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-[#666D80]">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent  >
                <AlertDialogHeader className="flex justify-between items-center">
                    <AlertDialogTitle>Delete Entery?</AlertDialogTitle> 
                    <AlertDialogCancel  className="border-0 shadow-none! bg-transparent!  
                   "><img src="Close-button.svg" alt="" /></AlertDialogCancel>
                </AlertDialogHeader>
                 <AlertDialogDescription>
                        Are you sure you want to delete this entry?      
                    </AlertDialogDescription>
                     <AlertDialogDescription>
                        This action will permanently remove the entry and it will not be included in reports.
                    </AlertDialogDescription>
                <AlertDialogFooter className="flex justify-end">
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
