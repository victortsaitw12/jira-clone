"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateWorkspaceform } from "./create-workspace-form";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";
export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceform onCancel={close} />
    </ResponsiveModal>
  );
};
