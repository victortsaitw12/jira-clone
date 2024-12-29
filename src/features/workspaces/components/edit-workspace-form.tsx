"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateWorkspaceSchema } from "../schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { DottedSeperator } from "@/components/dotted-seperator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface editWorkspacefromProps {
  onCancel?: () => void;
  initialValue: Workspace;
}
export const EditWorkspaceform = ({
  onCancel,
  initialValue,
}: editWorkspacefromProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();
  const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
    useResetInviteCode();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "This action cannot be undone.",
    "destructive"
  );
  const [ResetDialog, confirmReset] = useConfirm(
    "Reset invite link",
    "This will invalidate the current invite link",
    "destructive"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValue,
      image: initialValue.imageUrl ?? "",
    },
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    resetInviteCode(
      { param: { workspaceId: initialValue.$id } },
      {
        onSuccess: () => {
          // router.push("/");
          window.location.href = "/"; // hard reload to refresh the cache
        },
      }
    );
  };

  const handleResetInviteCode = async () => {
    const ok = await confirmReset();
    if (!ok) return;
    deleteWorkspace(
      { param: { workspaceId: initialValue.$id } },
      {
        onSuccess: () => {
          router.refresh(); // refetch the data
        },
      }
    );
  };

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };
    mutate(
      { form: finalValues, param: { workspaceId: initialValue.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const fullInviteLink = `${window.location.origin}/workspaces/${initialValue.$id}/join/${initialValue.inviteCode}`;
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(fullInviteLink).then(() => {
      toast.success("Invite link copied to clipboard");
    });
  };
  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValue.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="font-bold text-xl">
            {initialValue.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeperator />
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter workspace name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] rounded-md overflow-hidden relative">
                            <Image
                              alt="logo"
                              fill
                              className="object-cover"
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEG, max 1MB
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg,.png,.svg,.jpeg"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              size="xs"
                              variant="destructive"
                              className="w-fit mt-2"
                              disabled={isPending}
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="xs"
                              variant="teritary"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                              disabled={isPending}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeperator className="py-7" />
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button size="lg" type="submit" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <Button
                  className="size-12"
                  variant="secondary"
                  onClick={handleCopyInviteLink}
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <DottedSeperator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending || isResettingInviteCode}
              onClick={handleResetInviteCode}
            >
              Reset Invite Link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will remove all
              associated data
            </p>
            <DottedSeperator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending || isDeletingWorkspace}
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
