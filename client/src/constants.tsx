
import { Pool, PoolType, PoolStatus, MemberTier, User } from './types';

export const POOL_TYPE_IMAGES: Record<string, { url: string; alt: string }> = {
  [PoolType.STOKVEL]: {
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    alt: 'Community gathering representing traditional Stokvel'
  },
  [PoolType.FAMILY_RESERVE]: {
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
    alt: 'Family togetherness and legacy'
  },
  [PoolType.SME_WHOLESALE]: {
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    alt: 'Small business collaboration'
  },
  [PoolType.CROWD_ASSET]: {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    alt: 'Shared community infrastructure'
  },
  [PoolType.ROTATING]: {
    url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140840e?auto=format&fit=crop&q=80&w=800',
    alt: 'Rotating savings circle'
  },
  [PoolType.DAILY]: {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    alt: 'Daily savings community'
  },
  [PoolType.WEEKLY]: {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    alt: 'Weekly contribution group'
  },
  [PoolType.FORTNIGHT]: {
    url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    alt: 'Bi-weekly savings meeting'
  },
  [PoolType.MONTHLY]: {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    alt: 'Monthly financial planning'
  },
  [PoolType.SAVINGS]: {
    url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    alt: 'Collective savings'
  },
  [PoolType.INVESTMENT]: {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    alt: 'Joint investment pool'
  },
};

export const getPoolImage = (poolId: string): { url: string; alt: string } => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800', alt: 'Community gathering' },
    { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', alt: 'Family togetherness' },
    { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', alt: 'Team collaboration' },
    { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', alt: 'Group unity' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', alt: 'Business meeting' },
    { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800', alt: 'Community celebration' },
  ];
  const index = parseInt(poolId.replace(/\D/g, '')) % images.length;
  return images[index] || images[0];
};

export const COMMUNITY_IMAGES = {
  hero: {
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
    alt: 'Ubuntu community gathering'
  },
  trust: {
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    alt: 'Trust and collaboration'
  },
  governance: {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    alt: 'Community governance'
  },
  prosperity: {
    url: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80&w=800',
    alt: 'Collective prosperity'
  }
};

export const COLORS = {
  primary: '#2D302E', 
  accent: '#8CA082', // Sage (Growth/Life)
  accentSecondary: '#E6D5C3', // Warm Sand
  ubuntuGold: '#D4AF37', // Gold (Honor/Value)
  terracotta: '#C07B5B', // Warm Earth (Community)
  background: '#FDFCFB', 
  darkSurface: '#1A1C1B',
  glass: 'rgba(255, 255, 255, 0.7)',
  status: {
    healthy: '#5C7A67',
    warning: '#D4AF37',
    critical: '#B36A5E'
  }
};

export const MOCK_USER: User & { upcomingContributions: number; pendingPayouts: number; ubuntuScoreValue: number } = {
  id: 'u1',
  name: 'Thabo',
  walletBalance: 2300,
  totalSavings: 15750.00,
  upcomingContributions: 3,
  pendingPayouts: 2500.00,
  ubuntuScoreValue: 842,
  shieldEnabled: true,
  managedEnabled: false,
  rainyDayBalance: 425.00,
  shieldActiveMonths: 4,
  isVerified: true, 
  trustScore: {
    score: 842,
    rating: 'Exceptional',
    metrics: {
      contributionVelocity: 95,
      communityVouching: 88,
      governanceParticipation: 92,
      altruismFactor: 75
    }
  }
};

export const MOCK_POOLS: Pool[] = [
  {
    id: 'p1',
    name: 'Johannesburg Elite Stokvel',
    type: PoolType.STOKVEL,
    contributionAmount: 2500,
    nextDueDate: '15 Oct 2025',
    rotationPosition: 4,
    totalMembers: 12,
    status: PoolStatus.HEALTHY,
    currentCycle: 2,
    totalPoolValue: 30000,
    members: []
  },
  {
    id: 'p-family',
    name: 'Madiba Legacy Fund',
    type: PoolType.FAMILY_RESERVE,
    contributionAmount: 1200,
    nextDueDate: '25 Oct 2025',
    rotationPosition: 0,
    totalMembers: 5,
    status: PoolStatus.HEALTHY,
    currentCycle: 1,
    totalPoolValue: 12400,
    members: []
  },
  {
    id: 'p-asset',
    name: 'Soweto Solar Initiative',
    type: PoolType.CROWD_ASSET,
    contributionAmount: 850,
    nextDueDate: '01 Nov 2025',
    rotationPosition: 0,
    totalMembers: 20,
    status: PoolStatus.HEALTHY,
    currentCycle: 1,
    totalPoolValue: 15000,
    targetAsset: {
      name: 'Industrial Solar Power Kit',
      targetPrice: 45000,
      currentProgress: 15000,
      imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400'
    },
    members: []
  }
];

export const MOCK_MEMBERS = [
  { id: 'm1', name: 'Lindiwe M.', email: 'lindi@example.com', tier: MemberTier.GOLD, status: 'Paid', penalties: 0, total: 15000, ubuntuScore: 920, trustMetrics: { contributionVelocity: 98, communityVouching: 90, governanceParticipation: 100, altruismFactor: 80 }, successionDesignee: 'Kelebogile M. (Daughter)' },
  { id: 'm2', name: 'Sipho K.', email: 'sipho@example.com', tier: MemberTier.SILVER, status: 'Paid', penalties: 0, total: 12500, ubuntuScore: 810, trustMetrics: { contributionVelocity: 85, communityVouching: 82, governanceParticipation: 88, altruismFactor: 60 } },
  { id: 'm3', name: 'Zanele T.', email: 'zanele@example.com', tier: MemberTier.BRONZE, status: 'Late', penalties: 1, total: 4500, ubuntuScore: 680, trustMetrics: { contributionVelocity: 60, communityVouching: 70, governanceParticipation: 75, altruismFactor: 40 }, vouchedBy: 'Thabo' }
];

export const MOCK_CONTRIBUTIONS = [
  { id: 'c1', memberName: 'Thabo', date: '15 Sep 2025', amount: 2500, status: 'On Time' },
  { id: 'c2', memberName: 'Lindiwe M.', date: '14 Sep 2025', amount: 2500, status: 'On Time' },
  { id: 'c3', memberName: 'Zanele T.', date: '18 Sep 2025', amount: 2500, status: 'Late' }
];
