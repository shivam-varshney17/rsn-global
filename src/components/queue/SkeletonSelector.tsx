'use client';

interface SkeletonSelectorProps {
  selected: string;
  onSelect: (skeleton: string) => void;
  platformColors: Record<string, string>;
}

const skeletons = [
  { name: 'Replacement Stack', description: 'This tool replaces your expensive [role/team]' },
  { name: 'Product Intro', description: 'Introducing [product] — what it does and why it matters' },
  { name: 'Revenue Proof', description: 'This system made me $[amount] — here\'s the exact mechanism' },
  { name: 'Arsenal Drop', description: 'After testing N tools, here\'s what\'s actually production-ready' },
  { name: 'System Drop', description: 'The complete [system] that runs my entire operation' },
  { name: 'Contrarian Hot Take', description: 'Unpopular opinion: [controversial claim]' },
  { name: 'Tool Stack Formula', description: '[Tool A] + [Tool B] + [Tool C] = [result]' },
  { name: 'Framework Education', description: 'The 5 levels of [skill/maturity] — here\'s the cheat sheet' },
  { name: 'Founder Arc', description: 'I almost quit. Here\'s what happened instead.' },
  { name: 'Short Raw', description: '1-4 lines. No CTA. Pure insight.' },
];

export function SkeletonSelector({ selected, onSelect, platformColors }: SkeletonSelectorProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {skeletons.map((skeleton) => {
        const isSelected = selected === skeleton.name;
        return (
          <button
            key={skeleton.name}
            onClick={() => onSelect(skeleton.name)}
            style={{
              padding: '12px 14px',
              backgroundColor: isSelected ? '#ede9fe' : '#f9fafb',
              border: '2px solid',
              borderColor: isSelected ? '#7c3aed' : 'transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.borderColor = '#d1d5db';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = 'transparent';
              }
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: isSelected ? '#7c3aed' : '#111827',
                marginBottom: '4px',
              }}
            >
              {skeleton.name}
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                color: '#6b7280',
                lineHeight: '1.4',
              }}
            >
              {skeleton.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}