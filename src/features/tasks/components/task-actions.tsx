import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";
interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}
export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "This action cannot be undone.",
    "destructive"
  );
  const { open } = useEditTaskModal();
  const { mutate, isPending } = useDeleteTask();
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      mutate({ param: { taskId: id } });
    }
  };
  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };
  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };
  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="mr-2 size-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
          >
            <TrashIcon className="mr-2 size-4 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
