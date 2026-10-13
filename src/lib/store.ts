import { create } from "zustand";
import { Agency, SubAccount, User, Contact, Pipeline, Opportunity, Conversation, Message, CalendarConfig, CalendarEvent, Funnel, Workflow } from "@/types";
import { mockAgency, mockSubAccounts, mockUsers, mockContacts, mockPipeline, mockOpportunities, mockConversations, mockMessages, mockCalendars, mockCalendarEvents, mockFunnels, mockWorkflows } from "./mockData";

interface AppState {
  // Navigation & Multi-Tenancy
  agency: Agency;
  subAccounts: SubAccount[];
  activeLocationId: string;
  isAgencyView: boolean;
  currentUser: User;
  sidebarCollapsed: boolean;
  
  // UI Dialog States
  quickActionOpen: boolean;
  dialerOpen: boolean;
  globalSearchOpen: boolean;
  
  // Softphone state
  dialerNumber: string;
  callActive: boolean;
  callDuration: number;
  
  // Data
  contacts: Contact[];
  pipeline: Pipeline;
  opportunities: Opportunity[];
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  calendars: CalendarConfig[];
  calendarEvents: CalendarEvent[];
  funnels: Funnel[];
  workflows: Workflow[];
  
  // Actions
  setActiveLocation: (locationId: string) => void;
  toggleAgencyView: (enabled?: boolean) => void;
  toggleSidebar: () => void;
  setQuickActionOpen: (open: boolean) => void;
  setDialerOpen: (open: boolean) => void;
  setGlobalSearchOpen: (open: boolean) => void;
  setDialerNumber: (num: string) => void;
  startCall: () => void;
  endCall: () => void;
  
  // CRM Actions
  addContact: (contact: Omit<Contact, "id" | "dateAdded" | "lastActivity">) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  
  // Pipeline Actions
  updateOpportunityStage: (opportunityId: string, newStageId: string) => void;
  addOpportunity: (opportunity: Omit<Opportunity, "id" | "createdAt" | "updatedAt">) => void;
  
  // Conversation Actions
  sendMessage: (conversationId: string, text: string, channel?: string) => void;
  markConversationRead: (conversationId: string) => void;
  
  // Calendar Actions
  bookAppointment: (event: Omit<CalendarEvent, "id">) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  agency: mockAgency,
  subAccounts: mockSubAccounts,
  activeLocationId: "loc_dental",
  isAgencyView: false,
  currentUser: mockUsers[0],
  sidebarCollapsed: false,
  
  quickActionOpen: false,
  dialerOpen: false,
  globalSearchOpen: false,
  
  dialerNumber: "",
  callActive: false,
  callDuration: 0,
  
  contacts: mockContacts,
  pipeline: mockPipeline,
  opportunities: mockOpportunities,
  conversations: mockConversations,
  messages: mockMessages,
  calendars: mockCalendars,
  calendarEvents: mockCalendarEvents,
  funnels: mockFunnels,
  workflows: mockWorkflows,
  
  setActiveLocation: (locationId: string) => {
    set({ activeLocationId: locationId, isAgencyView: false });
  },
  
  toggleAgencyView: (enabled) => {
    set((state) => ({ isAgencyView: enabled !== undefined ? enabled : !state.isAgencyView }));
  },
  
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },
  
  setQuickActionOpen: (open) => set({ quickActionOpen: open }),
  setDialerOpen: (open) => set({ dialerOpen: open }),
  setGlobalSearchOpen: (open) => set({ globalSearchOpen: open }),
  setDialerNumber: (num) => set({ dialerNumber: num }),
  
  startCall: () => set({ callActive: true, callDuration: 0 }),
  endCall: () => set({ callActive: false, callDuration: 0 }),
  
  addContact: (contactData) => {
    const newContact: Contact = {
      ...contactData,
      id: `cnt_${Date.now()}`,
      dateAdded: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };
    set((state) => ({ contacts: [newContact, ...state.contacts] }));
  },
  
  updateContact: (id, updates) => {
    set((state) => ({
      contacts: state.contacts.map((c) => (c.id === id ? { ...c, ...updates, lastActivity: new Date().toISOString() } : c)),
    }));
  },
  
  deleteContact: (id) => {
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    }));
  },
  
  updateOpportunityStage: (opportunityId, newStageId) => {
    set((state) => ({
      opportunities: state.opportunities.map((opp) =>
        opp.id === opportunityId
          ? {
              ...opp,
              stageId: newStageId,
              status: newStageId === "stg_won" ? "won" : newStageId === "stg_lost" ? "lost" : "open",
              updatedAt: new Date().toISOString(),
            }
          : opp
      ),
    }));
  },
  
  addOpportunity: (oppData) => {
    const newOpp: Opportunity = {
      ...oppData,
      id: `opp_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ opportunities: [...state.opportunities, newOpp] }));
  },
  
  sendMessage: (conversationId, text, channel = "sms") => {
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId,
      direction: "outbound",
      channel: channel as any,
      senderName: "Team",
      senderPhoneOrEmail: "+1 (512) 843-2019",
      body: text,
      status: "delivered",
      createdAt: new Date().toISOString(),
    };
    
    set((state) => {
      const existing = state.messages[conversationId] || [];
      return {
        messages: {
          ...state.messages,
          [conversationId]: [...existing, newMsg],
        },
        conversations: state.conversations.map((c) =>
          c.id === conversationId
            ? { ...c, lastMessage: text, lastMessageAt: new Date().toISOString(), unreadCount: 0 }
            : c
        ),
      };
    });
  },
  
  markConversationRead: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
    }));
  },
  
  bookAppointment: (eventData) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `evt_${Date.now()}`,
    };
    set((state) => ({
      calendarEvents: [...state.calendarEvents, newEvent],
    }));
  },
}));
