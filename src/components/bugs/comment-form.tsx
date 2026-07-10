"use client";

import { useRef, useTransition } from "react";
import { toast } from "sonner";

import { addComment } from "@/app/actions/bugs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function CommentForm({ bugId }: { bugId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await addComment(bugId, formData);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      formRef.current?.reset();
    });
  }

  return (
    <form action={onSubmit} className="space-y-2" ref={formRef}>
      <label className="sr-only" htmlFor="comment-body">
        Add a note
      </label>
      <textarea
        className="min-h-20 w-full rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-ink-tertiary focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface-app"
        id="comment-body"
        name="body"
        placeholder="Leave a note for your team…"
        required
      />
      <div className="flex justify-end">
        <Button disabled={pending} size="sm" type="submit">
          {pending ? <Spinner className="size-3.5" /> : null}
          Comment
        </Button>
      </div>
    </form>
  );
}
