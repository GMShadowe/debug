"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteComment } from "@/app/actions/bugs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Icon } from "@/components/ui/icon";
import { relativeTime } from "@/lib/format";
import { TrashIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Comment } from "@/types";

/**
 * Delete is confirmed, and it is not undoable.
 *
 * A note has no revision history, so a stray click destroys the only copy. One
 * extra click on a rare, irreversible action is cheaper than losing what someone
 * wrote. The control only renders for the author; anyone else would just be
 * offered a button that RLS refuses.
 */
export function CommentItem({
  comment,
  canDelete,
}: {
  comment: Comment;
  canDelete: boolean;
}) {
  // AlertDialogAction is a plain Button, not a Close — the dialog has to be
  // dismissed by hand or it stays open behind the toast.
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function onDelete() {
    setOpen(false);
    startTransition(async () => {
      const result = await deleteComment(comment.id);
      if ("error" in result) {
        toast.error(result.error);
      } else {
        toast.success("Note deleted");
      }
    });
  }

  return (
    <li
      className={cn(
        "group relative rounded-md border border-border bg-card px-3 py-2.5 transition-opacity",
        pending && "pointer-events-none opacity-50"
      )}
    >
      <p className="text-[11px] text-ink-tertiary">
        {relativeTime(comment.created_at)}
      </p>
      <p className="mt-1 whitespace-pre-wrap pr-7 text-[13px] text-ink-muted">
        {comment.body}
      </p>

      {canDelete ? (
        <AlertDialog onOpenChange={setOpen} open={open}>
          <AlertDialogTrigger
            render={
              <button
                aria-label="Delete note"
                // Fades in on hover for a fine pointer, but is always present
                // for touch and keyboard — a control you cannot reach is not a
                // control. focus-visible brings it back for tab users.
                className="absolute top-2 right-2 grid size-6 cursor-pointer place-items-center rounded-sm text-ink-tertiary opacity-100 transition-[opacity,background-color,color] duration-150 ease-out hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:opacity-0 md:group-hover:opacity-100"
                disabled={pending}
                type="button"
              >
                <Icon className="size-3.5" icon={TrashIcon} />
              </button>
            }
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this note?</AlertDialogTitle>
              <AlertDialogDescription>
                This cannot be undone. The note is removed for everyone on the
                project.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} variant="destructive">
                Delete note
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </li>
  );
}
