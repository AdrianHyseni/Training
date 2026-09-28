"use client";

import { useState, type ReactNode, isValidElement } from "react";
import { MermaidDiagram } from "@/components/mdx/mermaid-diagram";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
  return "";
}

export function CodeBlock({ children, className }: { children?: ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);
  const language = /language-(\w+)/.exec(className ?? "")?.[1] ?? "text";
  const code = extractText(children).replace(/\n$/, "");

  if (language === "mermaid") {
    return <MermaidDiagram chart={code} />;
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — nothing to fall back to
    }
  }

  return (
    <div className="group relative my-4 overflow-hidden rounded-station border border-border bg-surface-raised">
      <div className="flex items-center justify-between border-b border-border px-4 py-1.5">
        <span className="font-mono text-xs text-text-muted">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded px-2 py-1 text-xs text-text-muted transition hover:bg-border hover:text-text"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
