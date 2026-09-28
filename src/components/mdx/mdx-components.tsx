import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/components/mdx/code-block";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      id={typeof props.children === "string" ? slugify(props.children) : undefined}
      className="mt-10 scroll-mt-24 font-heading text-2xl font-bold"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      id={typeof props.children === "string" ? slugify(props.children) : undefined}
      className="mt-8 scroll-mt-24 font-heading text-xl font-semibold"
      {...props}
    />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-text" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-1.5 pl-6" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-1.5 pl-6" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => <a className="text-accent underline underline-offset-2 hover:no-underline" {...props} />,
  strong: (props) => <strong className="font-semibold text-text" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-4 rounded-station border border-accent/30 bg-accent/[0.06] px-4 py-3 text-sm [&>p]:mt-0"
      {...props}
    />
  ),
  table: (props) => (
    <div className="mt-4 overflow-x-auto rounded-station border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-surface-raised text-left" {...props} />,
  th: (props) => <th className="border-b border-border px-3 py-2 font-heading font-semibold" {...props} />,
  td: (props) => <td className="border-b border-border px-3 py-2 align-top" {...props} />,
  pre: (props) => {
    const child = props.children as { props?: { children?: React.ReactNode; className?: string } } | undefined;
    return <CodeBlock className={child?.props?.className}>{child?.props?.children}</CodeBlock>;
  },
  code: (props) => {
    if (typeof props.className === "string") {
      // Block code: rendered by the parent <pre> override via CodeBlock.
      return <code {...props} />;
    }
    return <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />;
  },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
