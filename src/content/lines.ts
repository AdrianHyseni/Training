export type LineStatus = "porting" | "authoring";

export interface LineInfo {
  id: string;
  code: string;
  name: string;
  tagline: string;
  status: LineStatus;
  statusLabel: string;
}

export const LINES: LineInfo[] = [
  {
    id: "enterprise-integration",
    code: "EI",
    name: "Enterprise Integration",
    tagline: "Patterns, event-driven architecture, API design & governance",
    status: "porting",
    statusLabel: "Porting in M1",
  },
  {
    id: "mulesoft",
    code: "MU",
    name: "MuleSoft",
    tagline: "Developer, architect, DataWeave, CI/CD, Flex Gateway",
    status: "porting",
    statusLabel: "Porting in M1",
  },
  {
    id: "cloud-integration",
    code: "CI",
    name: "Cloud Integration",
    tagline: "AWS & Azure messaging, APIs, orchestration, hybrid connectivity",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 5",
  },
  {
    id: "sap-btp",
    code: "SAP",
    name: "SAP BTP Integration Suite",
    tagline: "iFlows, adapters, API management, S/4HANA integration",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 6",
  },
  {
    id: "data-engineering",
    code: "DE",
    name: "Data Engineering",
    tagline: "Pipelines, streaming, dbt, Spark, Kafka",
    status: "porting",
    statusLabel: "Porting in M1",
  },
  {
    id: "data-engineering-cloud",
    code: "DC",
    name: "Data Engineering on AWS/Azure",
    tagline: "AWS & Azure data stacks, Microsoft Fabric",
    status: "porting",
    statusLabel: "Porting in M1",
  },
  {
    id: "postgresql",
    code: "PG",
    name: "PostgreSQL",
    tagline: "Indexing, internals, replication, pgvector — lab-heavy",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 4",
  },
  {
    id: "implementation-engineer",
    code: "IE",
    name: "Implementation Engineer",
    tagline: "Discovery, migration, cutover, troubleshooting, RCA",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 7",
  },
  {
    id: "forward-deployed",
    code: "FD",
    name: "Forward Deployed Engineer",
    tagline: "GenAI prototyping to production, customer discovery",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 3",
  },
  {
    id: "ai-engineer",
    code: "AI",
    name: "AI Engineer",
    tagline: "LLMs, RAG, agents, MCP, evaluation, LLMOps",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 1",
  },
  {
    id: "anthropic-training",
    code: "AT",
    name: "Anthropic Training",
    tagline: "Claude API, prompt engineering, Claude Code, agents",
    status: "authoring",
    statusLabel: "Authoring — M7 batch 2",
  },
];

export function getLine(id: string): LineInfo | undefined {
  return LINES.find((l) => l.id === id);
}
