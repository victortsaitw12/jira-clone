import React from "react";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceIdJoinClient } from "./client";

const WorkspaceIdJoinPage = async () => {
  const user = getCurrent();
  if (!user) redirect("/signin");

  return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
