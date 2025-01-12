"use client";

import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
export const TaskViewSwitcher = () => {
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" });
  const { open } = useCreateTaskModal();
  const workspaceId = useWorkspaceId();
  const [{ projectId, status, assigneeId, dueDate }] = useTaskFilters();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    status,
    assigneeId,
    dueDate,
  });
  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="w-full flex-1 border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row jusitfy-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanbab">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeperator className="my-4" />
        <DataFilters />
        <DottedSeperator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg flex flex-col items-center justify-center h-[200px]">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              Table
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              Kanban
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Calendar
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
