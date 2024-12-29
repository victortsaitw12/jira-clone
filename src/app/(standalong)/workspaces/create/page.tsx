import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { CreateWorkspaceform } from "@/features/workspaces/components/create-workspace-form";

const WorkspaceCreatePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceform />
    </div>
  );
};

export default WorkspaceCreatePage;
