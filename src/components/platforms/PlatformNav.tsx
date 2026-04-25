'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, InstagramIcon } from '@/components/icons/PlatformIcons';

type Platform = 'linkedin' | 'twitter' | 'reddit' | 'instagram';

interface PlatformTab {
  id: Platform;
  label: string;
  color: string;
  icon: React.ReactNode;
  href: string;
}

const platforms: PlatformTab[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
    icon: <LinkedinIcon size={16} />,
    href: '/platforms/linkedin',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    color: '#000000',
    icon: <TwitterIcon size={16} />,
    href: '/platforms/twitter',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    color: '#FF4500',
    icon: <MessageCircle size={16} />,
    href: '/platforms/reddit',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    color: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    icon: <InstagramIcon size={16} />,
    href: '/platforms/instagram',
  },
];

interface PlatformNavProps {
  postCounts?: Record<Platform, number>;
}

export function PlatformNav({ postCounts = {} }: PlatformNavProps) {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        padding: '4px',
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        width: 'fit-content',
      }}
    >
      {platforms.map((platform) => {
        const isActive = pathname === platform.href;
        const count = postCounts[platform.id] || 0;

        return (
          <Link
            key={platform.id}
            href={platform.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: isActive ? '#ffffff' : 'transparent',
              color: isActive ? platform.color : '#6b7280',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {platform.icon}
            </span>
            <span>{platform.label}</span>
            {count > 0 && (
              <span
                style={{
                  padding: '2px 8px',
                  backgroundColor: isActive ? platform.color + '20' : '#e5e7eb',
                  color: isActive ? platform.color : '#6b7280',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}