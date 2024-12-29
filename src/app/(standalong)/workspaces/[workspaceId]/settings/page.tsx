import { getCurrent } from "@/features/auth/queries";
import { EditWorkspaceform } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";
import React from "react";
import { getWorkspace } from "@/features/workspaces/queries";

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/signin");

  const initialValue = await getWorkspace({ workspaceId: params.workspaceId });
  if (!initialValue) redirect(`/workspaces/${params.workspaceId}`);
  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceform initialValue={initialValue} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
