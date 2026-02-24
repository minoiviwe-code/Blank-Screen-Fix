
import { Pool, PoolType, PoolStatus, MemberTier, User } from './types';

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
