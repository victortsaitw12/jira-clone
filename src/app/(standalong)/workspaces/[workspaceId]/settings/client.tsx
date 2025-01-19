"use client";
import { EditWorkspaceform } from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
export const WorkspaceIdSettingsClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: initialValue, isLoading } = useGetWorkspace({ workspaceId });
  if (isLoading) return <PageLoader />;
  if (!initialValue) return <PageError message="Workspace not found" />;
  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceform initialValue={initialValue} />
    </div>
  );
};
