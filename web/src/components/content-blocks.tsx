import type { ContentBlock } from "@/lib/content/pages";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="mt-8 space-y-6 text-[var(--color-ink)]">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i} className="leading-relaxed text-[var(--color-muted)]">
              {block.text}
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2 key={i} className="pt-2 text-2xl font-semibold tracking-tight">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 text-[var(--color-muted)]">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <dl key={i} className="space-y-4">
            {block.items.map((item) => (
              <div key={item.q}>
                <dt className="font-medium">{item.q}</dt>
                <dd className="mt-1 text-[var(--color-muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
        );
      })}
    </div>
  );
}
