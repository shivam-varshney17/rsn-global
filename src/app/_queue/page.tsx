'use client';

import { useState } from 'react';
import { ContentCard } from '@/components/queue/ContentCard';
import { ContentDetailPanel } from '@/components/queue/ContentDetailPanel';
import { NewIdeaModal } from '@/components/queue/NewIdeaModal';
import { Plus, Kanban } from 'lucide-react';

// Types
interface ContentItem {
  id: string;
  title: string;
  preview: string;
  fullContent: string;
  platforms: ('LinkedIn' | 'Twitter' | 'Reddit' | 'Instagram')[];
  skeleton: string;
  stage: 'Draft' | 'Review' | 'Approved' | 'Scheduled' | 'Published';
  assignee: string;
  createdAt: string;
  ideaId: string;
  scheduledFor?: string;
}

type Stage = ContentItem['stage'];

// Mock data
const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'AI SDR Agent Success Story',
    preview: 'We replaced our $200K SDR team with an AI agent. Here\'s the exact setup that generated $340K in pipeline within 90 days...',
    fullContent: `We replaced our $200K SDR team with an AI agent.

Claude + n8n + Apollo.
Setup took 3 hours. Runs 24/7.

Results after 90 days:
- 1,000 personalized emails/day
- 18% reply rate
- $340K pipeline generated

No cold callers. No SDR salaries. No ramp time.

The agent outperforms because it reads every prospect's LinkedIn, 10-K, and recent news before writing the first line.

Humans can't do that at scale. AI can.`,
    platforms: ['LinkedIn', 'Twitter', 'Instagram'],
    skeleton: 'Replacement Stack',
    stage: 'Review',
    assignee: 'Shivam',
    createdAt: '2026-04-20T10:00:00Z',
    ideaId: 'idea-1',
  },
  {
    id: '2',
    title: 'n8n Workflow Automation Stack',
    preview: 'After 6 months testing automation tools, here\'s what\'s actually production-ready: The complete n8n + AI stack for solo founders...',
    fullContent: `After 6 months testing automation tools, here's what's actually production-ready.

The stack that survived:
- n8n for workflow orchestration
- Claude for strategic decisions
- MiniMax for bulk content
- Supabase for data persistence

This combination runs my entire content operation. No bloated agencies. No expensive tools. Just results.`,
    platforms: ['LinkedIn', 'Twitter'],
    skeleton: 'Arsenal Drop',
    stage: 'Draft',
    assignee: 'Shivam',
    createdAt: '2026-04-22T14:30:00Z',
    ideaId: 'idea-2',
  },
  {
    id: '3',
    title: 'Revenue System Launch',
    preview: 'This system made me $47K last month. No sales calls. No cold outreach. Just an automated pipeline that runs while I sleep...',
    fullContent: `This system made me $47K last month.

No sales calls. No cold outreach. Just an automated pipeline that runs while I sleep.

The setup:
1. Content attracts prospects organically
2. AI qualifies and personalizes at scale
3. Calendly handles booking
4. Zapier connects everything

$47K in MRR from content that was created once and repurpose four ways.`,
    platforms: ['LinkedIn', 'Twitter', 'Reddit', 'Instagram'],
    skeleton: 'Revenue Proof',
    stage: 'Approved',
    assignee: 'Shivam',
    createdAt: '2026-04-18T09:00:00Z',
    ideaId: 'idea-3',
  },
  {
    id: '4',
    title: 'Hot Take: Agencies Are Dead',
    preview: 'Hot take: The traditional marketing agency model is dead. Here\'s why in 4 words - they can\'t compete with AI...',
    fullContent: `Hot take: The traditional marketing agency model is dead.

Here's why in 4 words: they can't compete with AI.

An AI agent:
- Works 24/7 without sick days
- Personalizes at scale
- Costs 1/10th the price
- Gets better every week

The agency model was built for a pre-AI world. That world is gone.`,
    platforms: ['Twitter', 'LinkedIn'],
    skeleton: 'Contrarian Hot Take',
    stage: 'Scheduled',
    assignee: 'Shivam',
    createdAt: '2026-04-15T16:00:00Z',
    ideaId: 'idea-4',
    scheduledFor: '2026-04-26T08:00:00Z',
  },
  {
    id: '5',
    title: 'Tool Stack Formula',
    preview: 'Claude + n8n + Apollo = your entire outbound pipeline. Here\'s the exact formula that replaced our $200K sales team...',
    fullContent: `Claude + n8n + Apollo = your entire outbound pipeline.

The formula:
- Claude: strategic brain, writes personalized outreach
- n8n: automation layer, connects all tools
- Apollo: prospect data, enrichment, email delivery

Setup time: 3 hours.
Daily maintenance: 0.
Results: $340K pipeline in 90 days.

This is the tool stack formula that works.`,
    platforms: ['LinkedIn', 'Twitter', 'Reddit'],
    skeleton: 'Tool Stack Formula',
    stage: 'Published',
    assignee: 'Shivam',
    createdAt: '2026-04-10T11:00:00Z',
    ideaId: 'idea-5',
  },
  {
    id: '6',
    title: 'Framework Education: 5 Levels of AI Adoption',
    preview: 'Here\'s the cheat sheet for where you are in the AI adoption curve: Level 1 - ChatGPT user. Level 5 - AI runs your business...',
    fullContent: `Here's the cheat sheet for where you are in the AI adoption curve:

Level 1: ChatGPT user - you ask questions
Level 2: Prompt engineer - you craft effective prompts
Level 3: Workflow builder - you connect AI to tools
Level 4: System designer - AI runs entire processes
Level 5: AI-first business - AI is your competitive advantage

Which level are you at? Most founders are at Level 2. The ones winning are at Level 4+.`,
    platforms: ['LinkedIn', 'Twitter', 'Instagram'],
    skeleton: 'Framework Education',
    stage: 'Draft',
    assignee: 'Shivam',
    createdAt: '2026-04-23T08:00:00Z',
    ideaId: 'idea-6',
  },
];

const STAGES: Stage[] = ['Draft', 'Review', 'Approved', 'Scheduled', 'Published'];

const stageColors: Record<Stage, string> = {
  Draft: '#6b7280',
  Review: '#f59e0b',
  Approved: '#10b981',
  Scheduled: '#3b82f6',
  Published: '#8b5cf6',
};

const platformColors: Record<string, string> = {
  LinkedIn: '#0a66c2',
  Twitter: '#000000',
  Reddit: '#ff4500',
  Instagram: '#e4405f',
};

export default function QueuePage() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isNewIdeaOpen, setIsNewIdeaOpen] = useState(false);
  const [content, setContent] = useState<ContentItem[]>(mockContent);

  const advanceStage = (item: ContentItem) => {
    const stageIndex = STAGES.indexOf(item.stage);
    if (stageIndex < STAGES.length - 1) {
      const newStage = STAGES[stageIndex + 1];
      setContent((prev) =>
        prev.map((c) => (c.id === item.id ? { ...c, stage: newStage } : c))
      );
      if (selectedContent?.id === item.id) {
        setSelectedContent({ ...selectedContent, stage: newStage });
      }
    }
  };

  const handleDelete = (id: string) => {
    setContent((prev) => prev.filter((c) => c.id !== id));
    if (selectedContent?.id === id) {
      setSelectedContent(null);
    }
  };

  const getContentByStage = (stage: Stage) =>
    content.filter((item) => item.stage === stage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header
        style={{
          padding: '16px 24px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Kanban size={24} color="#6366f1" />
          <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
            Content Queue
          </h1>
        </div>
        <button
          onClick={() => setIsNewIdeaOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          <Plus size={18} />
          New Idea
        </button>
      </header>

      {/* Kanban Board */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflowX: 'auto',
          padding: '24px',
          gap: '16px',
        }}
      >
        {STAGES.map((stage) => (
          <div
            key={stage}
            style={{
              flex: '0 0 300px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              maxHeight: 'calc(100vh - 140px)',
            }}
          >
            {/* Column Header */}
            <div
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid',
                borderColor: stageColors[stage],
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: stageColors[stage],
                  }}
                />
                <span style={{ fontWeight: '600', color: '#374151' }}>{stage}</span>
              </div>
              <span
                style={{
                  backgroundColor: '#e5e7eb',
                  color: '#6b7280',
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '2px 8px',
                  borderRadius: '10px',
                }}
              >
                {getContentByStage(stage).length}
              </span>
            </div>

            {/* Cards */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {getContentByStage(stage).map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  platformColors={platformColors}
                  stageColors={stageColors}
                  onClick={() => setSelectedContent(item)}
                  isSelected={selectedContent?.id === item.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      <ContentDetailPanel
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
        onAdvance={advanceStage}
        onDelete={handleDelete}
        stages={STAGES}
        stageColors={stageColors}
        platformColors={platformColors}
      />

      {/* New Idea Modal */}
      <NewIdeaModal
        isOpen={isNewIdeaOpen}
        onClose={() => setIsNewIdeaOpen(false)}
        platformColors={platformColors}
      />
    </div>
  );
}