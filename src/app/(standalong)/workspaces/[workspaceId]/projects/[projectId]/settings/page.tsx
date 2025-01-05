import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { getProject } from "@/features/projects/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";

interface ProjectIdSettingsPageProps {
  params: {
    projectId: string;
  };
}

async function ProjectIdSettingsPage({ params }: ProjectIdSettingsPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValue = await getProject({ projectId: params.projectId });
  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValue={initialValue} />
    </div>
  );
}

export default ProjectIdSettingsPage;
