import type { SeverityLevel } from '../../styles/theme';

export type AudienceMode = 'everyone' | 'people' | 'groups';

export type CommMember = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type CommGroup = {
  id: string;
  name: string;
  memberIds: string[];
};

export type Communication = {
  id: string;
  title: string;
  body: string;
  severity: SeverityLevel;
  author: string;
  authorInitials: string;
  createdAt: string;
  audienceMode: AudienceMode;
  recipientIds: string[];
  groupIds: string[];
  groupNames: string[];
  seenCount: number;
};

/** Demo members you can pick as recipients */
export const commMembers: CommMember[] = [
  { id: 'm1', name: 'Madhu Sharma', email: 'madhu@midna.com', role: 'Admin' },
  { id: 'm2', name: 'Priya Nair', email: 'priya@midna.com', role: 'MLA Member' },
  { id: 'm3', name: 'Arjun Dev', email: 'arjun@midna.com', role: 'Counsellor' },
  { id: 'm4', name: 'Riya Saravanan', email: 'riya@midna.com', role: 'MLA Member' },
  { id: 'm5', name: 'Suresh Kumar', email: 'suresh@midna.com', role: 'Counsellor' },
  { id: 'm6', name: 'Lakshmi Venkat', email: 'lakshmi@midna.com', role: 'MLA Member' },
  { id: 'm7', name: 'Gopal Menon', email: 'gopal@midna.com', role: 'Senior Mentor' },
  { id: 'm8', name: 'Neha Gupta', email: 'neha@midna.com', role: 'Counsellor' },
];

const seedGroups: CommGroup[] = [
  { id: 'g1', name: 'Kerala MLAs', memberIds: ['m2', 'm6'] },
  { id: 'g2', name: 'HO Staff', memberIds: ['m1', 'm3', 'm5'] },
  { id: 'g3', name: 'All Counsellors', memberIds: ['m3', 'm5', 'm8'] },
];

const seedCommunications: Communication[] = [
  {
    id: 'c1',
    title: 'Tomorrow is a Holiday!',
    body: 'Let us make a promise that we would not let the hard sacrifices of our brave freedom fighters go in vain. Happy Republic Day!',
    severity: 'low',
    author: 'HR Team',
    authorInitials: 'HR',
    createdAt: '14 Jan 2026 · 10:30 AM',
    audienceMode: 'everyone',
    recipientIds: [],
    groupIds: [],
    groupNames: [],
    seenCount: 18,
  },
  {
    id: 'c2',
    title: 'System maintenance window',
    body: 'A brief maintenance window is planned this weekend. Dashboard access may be intermittent between 2:00 AM and 4:00 AM. Please plan scans accordingly.',
    severity: 'high',
    author: 'Ops Team',
    authorInitials: 'OT',
    createdAt: '02 Mar 2026 · 09:15 AM',
    audienceMode: 'everyone',
    recipientIds: [],
    groupIds: [],
    groupNames: [],
    seenCount: 6,
  },
  {
    id: 'c3',
    title: 'New billing summary live',
    body: 'Your year-to-date and all-time billing figures are now reflected on the dashboard KPIs. Reach out to accounts if any number looks off.',
    severity: 'medium',
    author: 'Accounts',
    authorInitials: 'AC',
    createdAt: '01 Jul 2026 · 11:00 AM',
    audienceMode: 'groups',
    recipientIds: ['m1', 'm3', 'm5'],
    groupIds: ['g2'],
    groupNames: ['HO Staff'],
    seenCount: 11,
  },
];

type StoreState = {
  groups: CommGroup[];
  communications: Communication[];
};

let state: StoreState = {
  groups: [...seedGroups],
  communications: [...seedCommunications],
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getCommunicationsState(): StoreState {
  return state;
}

export function subscribeCommunications(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function formatCommDate(date = new Date()): string {
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function audienceLabel(item: Communication): string {
  if (item.audienceMode === 'everyone') return 'Everyone';
  if (item.audienceMode === 'groups') {
    if (item.groupNames.length === 0) return 'Groups';
    if (item.groupNames.length === 1) return `Group · ${item.groupNames[0]}`;
    return `${item.groupNames.length} groups · ${item.groupNames.join(', ')}`;
  }
  const n = item.recipientIds.length;
  return `${n} member${n === 1 ? '' : 's'}`;
}

export function publishCommunication(input: {
  title: string;
  body: string;
  severity: SeverityLevel;
  audienceMode: AudienceMode;
  recipientIds: string[];
  groupIds: string[];
}): Communication {
  const selectedGroups = state.groups.filter((g) => input.groupIds.includes(g.id));
  const recipientIds =
    input.audienceMode === 'groups'
      ? [...new Set(selectedGroups.flatMap((g) => g.memberIds))]
      : input.audienceMode === 'people'
        ? [...input.recipientIds]
        : [];

  const created: Communication = {
    id: `c-${Date.now()}`,
    title: input.title.trim(),
    body: input.body.trim(),
    severity: input.severity,
    author: 'You',
    authorInitials: 'YO',
    createdAt: formatCommDate(),
    audienceMode: input.audienceMode,
    recipientIds,
    groupIds: selectedGroups.map((g) => g.id),
    groupNames: selectedGroups.map((g) => g.name),
    seenCount: 0,
  };

  state = {
    ...state,
    communications: [created, ...state.communications],
  };
  emit();
  return created;
}

export function createGroup(name: string, memberIds: string[]): CommGroup {
  const group: CommGroup = {
    id: `g-${Date.now()}`,
    name: name.trim(),
    memberIds: [...memberIds],
  };
  state = {
    ...state,
    groups: [group, ...state.groups],
  };
  emit();
  return group;
}

export function deleteGroup(groupId: string): void {
  state = {
    ...state,
    groups: state.groups.filter((g) => g.id !== groupId),
  };
  emit();
}
