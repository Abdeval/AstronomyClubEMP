import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";


export default function ConfirmDeletionDialog({
  isDeleteDialogOpen,
  onOpenChange,
  onDelete,
  item
}:{
    isDeleteDialogOpen: boolean;
    onOpenChange: (value: boolean) => void;
    onDelete: () => void;
    item: string
}) {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-cu">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this {item}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {item}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onDelete()
              toast(`${item} is deleted...`)
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/60"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
