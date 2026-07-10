"use client";

import { useState } from "react";

import { InstallTabs } from "@/components/install/install-tabs";
import { CodeBlock } from "@/components/install/snippet";
import { Step } from "@/components/install/step";
import { ApiKeyField } from "@/components/settings/api-key-field";
import { maskApiKey } from "@/lib/format";

/**
 * Steps 1 and 2 share one reveal state.
 *
 * The key appears three times on this page. Masking only the first field while
 * printing the key in full in the `.env` line and the script tag below it makes
 * the mask theatre — anyone shoulder-surfing just reads the next block. One eye
 * unmasks all three; Copy always yields the real key regardless.
 */
export function InstallGuide({ apiKey }: { apiKey: string }) {
  const [revealed, setRevealed] = useState(false);
  const shown = revealed ? apiKey : maskApiKey(apiKey);

  return (
    <>
      <Step
        description="Publishable, like a Stripe or Sentry public key. It ships in your client bundle, so it is not a secret — restrict it by origin in Settings rather than hiding it."
        n={1}
        title="Your project key"
      >
        <ApiKeyField
          apiKey={apiKey}
          onRevealedChange={setRevealed}
          revealed={revealed}
        />
        <p className="mt-3 mb-2 text-[12px] text-ink-tertiary">
          In a framework, read it from the environment:
        </p>
        <CodeBlock
          display={`NEXT_PUBLIC_LUMEN_KEY=${shown}`}
          filename=".env.local"
          value={`NEXT_PUBLIC_LUMEN_KEY=${apiKey}`}
        />
      </Step>

      <Step
        description="Pick whichever matches your stack. Both post to the same endpoint."
        n={2}
        title="Add the reporter"
      >
        <InstallTabs apiKey={apiKey} displayKey={shown} />
      </Step>
    </>
  );
}
