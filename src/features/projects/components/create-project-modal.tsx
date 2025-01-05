"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CreateProjectform } from "./create-project-form";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";
export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectform onCancel={close} />
    </ResponsiveModal>
  );
};
