// Core TypeScript Definitions for GoHighLevel 1:1 Recreation

export type Role = 'agency_admin' | 'agency_user' | 'account_admin' | 'account_user';

export interface Agency {
  id: string;
  name: string;
  whiteLabelDomain: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor?: string;
  stripeConnectedAccountId?: string;
  saasModeEnabled: boolean;
  rebillingMarkups: {
    smsMultiplier: number; // e.g. 2.0x
    emailMultiplier: number; // e.g. 2.5x
    voiceMultiplier: number; // e.g. 2.0x
    aiTokenMultiplier: number; // e.g. 3.0x
  };
}

export interface SubAccount {
  id: string;
  agencyId: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  timezone: string;
  currency: string;
  twiliPhoneSid?: string;
  mailgunDomain?: string;
  walletBalance: number; // in USD
  autoRechargeThreshold: number;
  autoRechargeAmount: number;
  stripeCustomerId?: string;
  activePlan: 'starter' | 'unlimited' | 'pro_saas';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  role: Role;
  agencyId: string;
  locationIds: string[];
}

export interface Contact {
  id: string;
  locationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  tags: string[];
  assignedToUserId?: string;
  dndSettings: {
    all: boolean;
    sms: boolean;
    email: boolean;
    calls: boolean;
    whatsapp: boolean;
  };
  attributionSource?: string;
  dateAdded: string;
  lastActivity: string;
  customFields: Record<string, any>;
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  probability: number; // 0 to 100
}

export interface Pipeline {
  id: string;
  locationId: string;
  name: string;
  stages: PipelineStage[];
}

export interface Opportunity {
  id: string;
  locationId: string;
  pipelineId: string;
  stageId: string;
  contactId: string;
  name: string;
  monetaryValue: number;
  status: 'open' | 'won' | 'lost' | 'abandoned';
  assignedToUserId?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export type Channel = 'sms' | 'email' | 'whatsapp' | 'facebook' | 'instagram' | 'gmb' | 'live_chat' | 'call';

export interface Message {
  id: string;
  conversationId: string;
  direction: 'inbound' | 'outbound';
  channel: Channel;
  senderName: string;
  senderPhoneOrEmail: string;
  body: string;
  attachments?: string[];
  status: 'sent' | 'delivered' | 'read' | 'failed';
  createdAt: string;
}

export interface Conversation {
  id: string;
  locationId: string;
  contactId: string;
  lastMessage: string;
  lastMessageAt: string;
  lastMessageChannel: Channel;
  unreadCount: number;
  isStarred: boolean;
  assignedUserId?: string;
}

export interface CalendarEvent {
  id: string;
  locationId: string;
  calendarId: string;
  contactId: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'cancelled' | 'showed' | 'noshow';
  appointmentNotes?: string;
}

export interface CalendarConfig {
  id: string;
  locationId: string;
  name: string;
  slug: string;
  type: 'simple' | 'round_robin' | 'class_booking' | 'collective';
  slotDurationMinutes: number;
  slotIntervalMinutes: number;
  assignedUserIds: string[];
}

export interface FunnelStep {
  id: string;
  name: string;
  slug: string;
  type: 'optin' | 'order_form' | 'upsell' | 'downsell' | 'thank_you';
  pageJson: string; // serialized JSON AST of sections, rows, columns, elements
  splitTestVariantJson?: string;
  conversionRate?: number;
}

export interface Funnel {
  id: string;
  locationId: string;
  name: string;
  domain?: string;
  steps: FunnelStep[];
  updatedAt: string;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  name: string;
  category: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Workflow {
  id: string;
  locationId: string;
  name: string;
  status: 'draft' | 'published';
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  updatedAt: string;
}
