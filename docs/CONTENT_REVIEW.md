# Content review

Every claim across published modules that still needs human verification, per `CLAUDE.md`'s accuracy rules. Generated from each module's `module.yaml` `verify` list — regenerate with:

```bash
pnpm exec tsx src/content/list-verify-items.ts
```

## How to use this

1. Open the linked source for each item below and confirm the claim is still accurate.
2. If it's still correct, update the module's `lastReviewed` date.
3. If it changed, fix the lesson content, then update `verify` and `lastReviewed`.
4. If a whole module is stale (`lastReviewed` over 12 months old), `pnpm content:validate` flags it as a warning automatically.

## Open items (as of 2026-09-28)

### RAG Systems: Retrieval-Augmented Generation in Production (`ai-engineer/ai-rag-systems`)
Last reviewed: 2026-09-28

- [ ] Anthropic's Contextual Retrieval technique (prepending LLM-generated chunk context before embedding and BM25 indexing) reduced retrieval failure rate by 35% alone, 49% combined with BM25, and 67% combined with BM25 and reranking, on Anthropic's internal evaluation. — [source](https://www.anthropic.com/news/contextual-retrieval)
- [ ] Specific prompt-caching and embedding-model parameters (context window sizes, cache TTLs, model names) referenced for retrieval pipelines change over time. — [source](https://docs.claude.com/en/docs_site_map.md)

### Claude API Fundamentals (`anthropic-training/claude-api-fundamentals`)
Last reviewed: 2026-09-28

- [ ] Current Claude model IDs, context window sizes, and pricing change frequently — confirm the exact model ID and limits before quoting them to a class or putting them in production code. — [source](https://platform.claude.com/docs/en/models/overview)
- [ ] Exact numeric rate limits (requests/tokens per minute) and monthly spend caps per usage tier are subject to change and vary by organization tier — verify current values before citing a number. — [source](https://platform.claude.com/docs/en/api/rate-limits)
- [ ] The list of official Anthropic SDK languages and their installation instructions may expand or change. — [source](https://platform.claude.com/docs/en/cli-sdks-libraries/overview)

### Messaging and Events on AWS and Azure (`cloud-integration/aws-azure-messaging`)
Last reviewed: 2026-09-28

- [ ] SQS visibility timeout range (0–43,200 seconds / 12 hours) and default (30 seconds) — [source](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
- [ ] SQS redrive policy fields (maxReceiveCount, deadLetterTargetArn) and default maxReceiveCount behavior — [source](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)
- [ ] SQS FIFO queue guarantees (exactly-once processing within a message group, ordering per message group ID) — [source](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html)
- [ ] EventBridge schema registry auto-discovery and code binding generation — [source](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-schema-registry.html)
- [ ] Azure Service Bus topics/subscriptions and SQL filter/rule capabilities — [source](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview)
- [ ] Azure Event Grid push delivery model and supported event sources/handlers — [source](https://learn.microsoft.com/en-us/azure/event-grid/overview)
- [ ] Azure Service Bus dead-letter queue behavior and max delivery count — [source](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues)

### Data Pipelines and Streaming Fundamentals (`data-engineering/de-pipelines-streaming`)
Last reviewed: 2026-09-28

- [ ] Apache Kafka's exactly-once semantics (idempotent producers + transactions) were introduced in Kafka 0.11 and remain the mechanism for end-to-end exactly-once processing. — [source](https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/)
- [ ] Current Kafka delivery-guarantee configuration options and defaults (acks, isolation.level, enable.auto.commit). — [source](https://docs.confluent.io/kafka/design/delivery-semantics.html)

### Data Engineering on AWS and Azure: Comparing the Stacks (`data-engineering-cloud/dec-aws-azure-stacks`)
Last reviewed: 2026-09-28

- [ ] AWS Glue Data Catalog feature set (e.g. IAM-based authorization for S3 Tables/Iceberg, crawler behavior, supported formats) changes frequently — confirm current capabilities before teaching specifics. — [source](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html)
- [ ] Amazon Redshift Spectrum and Redshift Serverless pricing, limits, and integration details with the Glue Data Catalog. — [source](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html)
- [ ] AWS Lake Formation's fine-grained access control model (row/column/cell-level permissions, supported engines) evolves; verify current scope. — [source](https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html)
- [ ] Microsoft Fabric is a fast-moving, unified SaaS platform (OneLake, Lakehouse, Warehouse, Data Factory, Real-Time Intelligence); specific workload names, capacity/SKU model, and pricing change often — verify against current docs before citing specifics. — [source](https://learn.microsoft.com/en-us/fabric/get-started/microsoft-fabric-overview)
- [ ] Azure Synapse Analytics vs. Microsoft Fabric positioning (Microsoft's guidance on which to use for new projects) may shift as Fabric matures. — [source](https://learn.microsoft.com/en-us/fabric/get-started/microsoft-fabric-overview)
- [ ] Azure Data Lake Storage Gen2 specific limits (namespace, throughput, redundancy options) and OneLake's relationship to ADLS Gen2. — [source](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction)

### Enterprise Integration Patterns Fundamentals (`enterprise-integration/ei-patterns`)
Last reviewed: 2026-09-28

- [ ] The Enterprise Integration Patterns catalog (Hohpe & Woolf) describes 65 named patterns for messaging-based integration. — [source](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)

### Forward Deployed Engineering: Role and Problem Discovery (`forward-deployed/fde-role-and-discovery`)
Last reviewed: 2026-09-28

- [ ] Palantir coined the "forward deployed engineer" title in the early 2010s and used it as the primary post-sale engineering role for intelligence-community and commercial customers. — [source](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1)
- [ ] Anthropic hires Forward Deployed Engineers on its Applied AI team to embed with strategic customers and ship production applications built on Claude. — [source](https://job-boards.greenhouse.io/anthropic/jobs/5302966008)

### MuleSoft API-Led Connectivity & Integration Patterns (`mulesoft/mule-api-led-connectivity`)
Last reviewed: 2026-09-28

- [ ] The current name, structure, and passing score of MuleSoft's developer certification exams (e.g. any "MCD" exam codes and levels) — [source](https://training.mulesoft.com/certification)
- [ ] Current Anypoint Platform component names and pricing/tiering for API Manager, Exchange, and CloudHub (these are renamed and re-tiered periodically) — [source](https://www.mulesoft.com/platform/enterprise-integration)

### SAP Cloud Integration: Building iFlows (`sap-btp/sap-cpi-iflows`)
Last reviewed: 2026-09-28

- [ ] The exact list, configuration options, and naming of adapters available in SAP Cloud Integration (SOAP, IDoc, OData, SFTP, HTTP, JMS, and others), including any version- or tenant-specific limits. — [source](https://help.sap.com/docs/cloud-integration/sap-cloud-integration/connectivity-adapters)
- [ ] The exact steps and header names (e.g. SAPJMSRetries, SAP_MarkMessageAsFailed) for configuring exception subprocess retry with the JMS adapter, since these are implementation details that can change between releases. — [source](https://help.sap.com/docs/integration-suite/sap-integration-suite/sap-cloud-integration-handles-retry)
- [ ] Current SAP Integration Suite / Cloud Integration certification names and exam codes. — [source](https://training.sap.com/certification/)

### Not listed above

`data-engineering-cloud`'s module lists no separate `implementation-engineer` or `postgresql` items — `implementation-engineer/ie-discovery-to-cutover` is intentionally vendor-neutral methodology with an empty `verify` list, and `postgresql/pg-indexing` (the reference/demo module built before the content batch) also has an empty `verify` list since its claims are durable Postgres concepts, not volatile specifics.
