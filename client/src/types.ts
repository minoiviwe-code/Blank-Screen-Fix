
export enum PoolType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  FORTNIGHT = 'fortnightly',
  MONTHLY = 'monthly',
  STOKVEL = 'Stokvel',
  SAVINGS = 'Savings',
  INVESTMENT = 'Investment',
  ROTATING = 'Rotating (ROSCA)',
  FAMILY_RESERVE = 'Family Wealth Reserve',
  SME_WHOLESALE = 'SME Bulk-Buying',
  CROWD_ASSET = 'Crowd-Asset Investment'
}

export enum PoolStatus {
  HEALTHY = 'Healthy',
  WARNING = 'Warning',
  CRITICAL = 'Critical'
}

export enum MemberTier {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}

export interface TrustScore {
  score: number; // 0 to 1000
  rating: 'Exceptional' | 'Good' | 'Fair' | 'Poor';
  metrics: {
    contributionVelocity: number; // 0-100
    communityVouching: number; // 0-100
    governanceParticipation: number; // 0-100
    altruismFactor: number; // 0-100 (Emergency fund supports)
  };
}

export interface AdvanceRequest {
  id: string;
  userId: string;
  userName: string;
  poolId: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Disbursed' | 'Rejected';
  tier: string;
  requestedAt: string;
}

export interface Pool {
  id: string;
  name: string;
  type: PoolType;
  contributionAmount: number;
  nextDueDate: string;
  rotationPosition: number;
  totalMembers: number;
  status: PoolStatus;
  currentCycle: number;
  totalPoolValue: number;
  targetAsset?: {
    name: string;
    targetPrice: number;
    currentProgress: number;
    imageUrl: string;
  };
  members: PoolMember[];
}

export interface PoolMember {
  id: string;
  name: string;
  email: string;
  position: number;
  tier: MemberTier;
  status: 'Paid' | 'Late' | 'Pending' | 'Defaulted';
  penalties: number;
  totalContributed: number;
  trustScore?: number;
  rainyDayBalance: number;
  isManagedAccount: boolean;
  shieldEnabled: boolean;
  shieldActiveMonths: number;
  vouchedBy?: string; // ID of the member who vouched for them
  successionDesignee?: string; // Name of the family member to inherit trust score
}

export interface User {
  id: string;
  name: string;
  walletBalance: number;
  totalSavings: number;
  trustScore: TrustScore;
  shieldEnabled: boolean;
  managedEnabled: boolean;
  rainyDayBalance: number;
  shieldActiveMonths: number;
  isVerified: boolean; // FICA verification status
}

export interface ConstitutionClause {
  id: string;
  title: string;
  content: string;
}

export interface ConstitutionCustomization {
  poolName: string;
  purpose: string;
  poolType: PoolType;
  contributionAmount: string;
  contributionSchedule: string;
  latePaymentPolicy: string;
  disputeResolution: string;
  votingThreshold: string;
  governanceEvents: string;
  outcomeExecution: string;
  remittanceTerms: string;
  popiaConsent: boolean;
  authorizedSignatories: string;
  clauses: ConstitutionClause[];
  shieldEnabled: boolean;
  managedEnabled: boolean;
}
