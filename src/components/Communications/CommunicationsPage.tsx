import { useMemo, useState, useSyncExternalStore, type CSSProperties } from 'react';
import {
  colors,
  radius,
  spacing,
  typography,
  severityTokens,
  type SeverityLevel,
} from '../../styles/theme';
import { NotificationButton } from '../Layout/NotificationButton';
import { ProfileAvatarButton } from '../Layout/ProfileAvatarButton';
import {
  audienceLabel,
  commMembers,
  createGroup,
  deleteGroup,
  getCommunicationsState,
  publishCommunication,
  subscribeCommunications,
  type AudienceMode,
} from './communicationsData';

const theme = colors.light;

type CommunicationsPageProps = {
  onOpenMobileMenu?: () => void;
  onOpenProfile?: () => void;
};

type TabId = 'compose' | 'groups' | 'sent';

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function useCommunicationsStore() {
  return useSyncExternalStore(subscribeCommunications, getCommunicationsState, getCommunicationsState);
}

export function CommunicationsPage({ onOpenMobileMenu, onOpenProfile }: CommunicationsPageProps) {
  const { groups, communications } = useCommunicationsStore();
  const [tab, setTab] = useState<TabId>('compose');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('medium');
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('everyone');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [peopleQuery, setPeopleQuery] = useState('');
  const [composeError, setComposeError] = useState('');
  const [composeNotice, setComposeNotice] = useState('');

  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [groupError, setGroupError] = useState('');

  const filteredPeople = useMemo(() => {
    const q = peopleQuery.trim().toLowerCase();
    if (!q) return commMembers;
    return commMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q)
    );
  }, [peopleQuery]);

  const togglePerson = (id: string) => {
    setSelectedPeople((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectedGroup = (id: string) => {
    setSelectedGroupIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleGroupMember = (id: string) => {
    setGroupMembers((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handlePublish = () => {
    setComposeNotice('');
    if (!title.trim() || !body.trim()) {
      setComposeError('Add a title and message before publishing.');
      return;
    }
    if (audienceMode === 'people' && selectedPeople.length === 0) {
      setComposeError('Select at least one person, or choose Everyone / groups.');
      return;
    }
    if (audienceMode === 'groups' && selectedGroupIds.length === 0) {
      setComposeError('Select at least one group, or create one first.');
      return;
    }

    publishCommunication({
      title,
      body,
      severity,
      audienceMode,
      recipientIds: selectedPeople,
      groupIds: audienceMode === 'groups' ? selectedGroupIds : [],
    });

    setTitle('');
    setBody('');
    setSeverity('medium');
    setAudienceMode('everyone');
    setSelectedPeople([]);
    setSelectedGroupIds([]);
    setComposeError('');
    setComposeNotice('Published — it will show on the dashboard notice board.');
    setTab('sent');
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      setGroupError('Enter a group name.');
      return;
    }
    if (groupMembers.length === 0) {
      setGroupError('Select at least one member for the group.');
      return;
    }
    const created = createGroup(groupName, groupMembers);
    setGroupName('');
    setGroupMembers([]);
    setGroupError('');
    setSelectedGroupIds((prev) => [...prev, created.id]);
    setComposeNotice(`Group “${created.name}” created. You can broadcast to it from Compose.`);
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'compose', label: 'Compose' },
    { id: 'groups', label: 'Groups' },
    { id: 'sent', label: 'Sent' },
  ];

  return (
    <section className="page-section comm-page">
      <div className="page-header">
        <div className="page-title-block" style={{ minWidth: 0, flex: 1 }}>
          <h1
            className="page-title"
            style={{
              margin: 0,
              fontSize: typography.roles.pageTitle.fontSize,
              lineHeight: typography.roles.pageTitle.lineHeight,
              fontWeight: typography.roles.pageTitle.fontWeight,
              letterSpacing: typography.roles.pageTitle.letterSpacing,
              color: theme['text-primary'],
            }}
          >
            Communications
          </h1>
          <p className="page-subtitle" style={{ margin: '6px 0 0', fontSize: 14, color: theme['text-secondary'] }}>
            Broadcast notices to everyone, selected people, or groups — not a chat.
          </p>
        </div>
        <div className="page-header-actions">
          <button type="button" className="btn-icon mobile-menu-btn" aria-label="Open menu" onClick={onOpenMobileMenu}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <NotificationButton />
          <ProfileAvatarButton onClick={onOpenProfile} />
        </div>
      </div>

      <div className="comm-tabs" role="tablist" aria-label="Communications sections">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`comm-tab${tab === item.id ? ' is-active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {composeNotice && (
        <p
          role="status"
          style={{
            margin: `0 0 ${spacing[4]}`,
            padding: '10px 14px',
            borderRadius: radius.md,
            background: theme['success-bg'],
            color: theme.success,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {composeNotice}
        </p>
      )}

      {tab === 'compose' && (
        <div className="comm-compose-grid">
          <div className="dash-card" style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: theme['text-primary'] }}>New notice</h2>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: theme['text-secondary'] }}>Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Holiday announcement"
                style={fieldStyle}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: theme['text-secondary'] }}>Message</span>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write the notice members will see on their dashboard…"
                rows={6}
                style={{
                  borderRadius: radius.md,
                  border: `1px solid ${theme.divider}`,
                  background: theme['bg-surface'],
                  color: theme['text-primary'],
                  fontSize: 14,
                  padding: 12,
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box',
                  width: '100%',
                  resize: 'vertical',
                  minHeight: 120,
                  lineHeight: 1.5,
                }}
              />
            </label>

            <div>
              <span style={{ fontSize: 12, fontWeight: 600, color: theme['text-secondary'] }}>Priority</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {(['low', 'medium', 'high'] as SeverityLevel[]).map((level) => {
                  const tone = severityTokens[level];
                  const selected = severity === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSeverity(level)}
                      style={{
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        padding: '7px 14px',
                        borderRadius: radius.pill,
                        background: selected ? tone.bg : theme['bg-muted'],
                        color: selected ? tone.text : theme['text-secondary'],
                        boxShadow: selected ? `inset 0 0 0 1px ${tone.icon}` : 'none',
                      }}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            {composeError && (
              <p role="alert" style={{ margin: 0, fontSize: 13, color: theme.error }}>
                {composeError}
              </p>
            )}

            <div className="comm-compose-actions" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
              <button
                type="button"
                className="btn-pill-secondary"
                style={{ height: 36, fontSize: 13, padding: '8px 14px' }}
                onClick={() => {
                  setTitle('');
                  setBody('');
                  setComposeError('');
                }}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn-pill-primary"
                style={{ height: 36, fontSize: 13, padding: '8px 16px' }}
                onClick={handlePublish}
              >
                Publish notice
              </button>
            </div>
          </div>

          <div className="dash-card" style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: theme['text-primary'] }}>Who receives this?</h2>
            <p style={{ margin: 0, fontSize: 13, color: theme['text-muted'] }}>
              Pick everyone, specific people, or one or more groups.
            </p>

            <div className="comm-audience-options">
              {(
                [
                  { id: 'everyone' as const, label: 'Everyone', hint: 'All members see it on dashboard' },
                  { id: 'people' as const, label: 'Selected people', hint: 'Choose members below' },
                  { id: 'groups' as const, label: 'Groups', hint: 'Pick one or more saved groups' },
                ] as const
              ).map((option) => {
                const selected = audienceMode === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAudienceMode(option.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 2,
                      textAlign: 'left',
                      padding: '12px 14px',
                      borderRadius: radius.md,
                      border: selected ? `2px solid ${theme.primary}` : `1px solid ${theme.divider}`,
                      background: selected ? theme['primary-soft'] : theme['bg-surface'],
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      color: 'inherit',
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 700, color: theme['text-primary'] }}>{option.label}</span>
                    <span style={{ fontSize: 12, color: theme['text-muted'] }}>{option.hint}</span>
                  </button>
                );
              })}
            </div>

            {audienceMode === 'people' && (
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: theme['bg-muted'],
                    borderRadius: radius.md,
                    padding: '8px 12px',
                    marginBottom: 10,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={theme['text-muted']} strokeWidth="1.8">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <input
                    value={peopleQuery}
                    onChange={(e) => setPeopleQuery(e.target.value)}
                    placeholder="Search people"
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: 13,
                      fontFamily: 'inherit',
                      color: theme['text-primary'],
                    }}
                  />
                </label>
                <p style={{ margin: '0 0 8px', fontSize: 12, color: theme['text-muted'] }}>
                  {selectedPeople.length} selected
                </p>
                <div className="comm-card-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {filteredPeople.map((member) => {
                    const checked = selectedPeople.includes(member.id);
                    return (
                      <label
                        key={member.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '8px 10px',
                          borderRadius: radius.md,
                          background: checked ? theme['primary-soft'] : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePerson(member.id)}
                          style={{ accentColor: theme.primary }}
                        />
                        <span
                          aria-hidden="true"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: theme['bg-muted'],
                            color: theme.primary,
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: 11,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {initials(member.name)}
                        </span>
                        <span style={{ minWidth: 0 }}>
                          <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme['text-primary'] }}>
                            {member.name}
                          </span>
                          <span style={{ display: 'block', fontSize: 11, color: theme['text-muted'] }}>
                            {member.role}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {audienceMode === 'groups' && (
              <div>
                {groups.length === 0 ? (
                  <p style={{ margin: 0, fontSize: 13, color: theme['text-muted'] }}>
                    No groups yet. Create one under the Groups tab.
                  </p>
                ) : (
                  <>
                    <p style={{ margin: '0 0 8px', fontSize: 12, color: theme['text-muted'] }}>
                      {selectedGroupIds.length} group{selectedGroupIds.length === 1 ? '' : 's'} selected
                    </p>
                    <div className="comm-card-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {groups.map((group) => {
                        const checked = selectedGroupIds.includes(group.id);
                        return (
                          <label
                            key={group.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '10px 12px',
                              borderRadius: radius.md,
                              background: checked ? theme['primary-soft'] : 'transparent',
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleSelectedGroup(group.id)}
                              style={{ accentColor: theme.primary }}
                            />
                            <span style={{ minWidth: 0, flex: 1 }}>
                              <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme['text-primary'] }}>
                                {group.name}
                              </span>
                              <span style={{ display: 'block', fontSize: 11, color: theme['text-muted'] }}>
                                {group.memberIds.length} member{group.memberIds.length === 1 ? '' : 's'}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'groups' && (
        <div className="comm-compose-grid">
          <div className="dash-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: `${spacing[5]} ${spacing[6]}`, borderBottom: `1px solid ${theme.divider}` }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: theme['text-primary'] }}>Saved groups</h2>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: theme['text-muted'] }}>
                Reuse recipient lists for broadcasts.
              </p>
            </div>
            {groups.length === 0 ? (
              <p style={{ padding: spacing[6], margin: 0, fontSize: 14, color: theme['text-muted'] }}>
                No groups yet.
              </p>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {groups.map((group) => (
                  <li
                    key={group.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      padding: `${spacing[4]} ${spacing[6]}`,
                      borderBottom: `1px solid ${theme.divider}`,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: theme['text-primary'] }}>{group.name}</div>
                      <div style={{ fontSize: 12, color: theme['text-muted'], marginTop: 2 }}>
                        {group.memberIds.length} member{group.memberIds.length === 1 ? '' : 's'} ·{' '}
                        {group.memberIds
                          .map((id) => commMembers.find((m) => m.id === id)?.name)
                          .filter(Boolean)
                          .slice(0, 3)
                          .join(', ')}
                        {group.memberIds.length > 3 ? '…' : ''}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-pill-secondary"
                      style={{ height: 32, fontSize: 12, padding: '6px 12px' }}
                      onClick={() => deleteGroup(group.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dash-card" style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: theme['text-primary'] }}>Create group</h2>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: theme['text-secondary'] }}>Group name</span>
              <input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Kerala MLAs"
                style={fieldStyle}
              />
            </label>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, color: theme['text-secondary'] }}>Members</span>
              <div className="comm-card-scroll" style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {commMembers.map((member) => {
                  const checked = groupMembers.includes(member.id);
                  return (
                    <label
                      key={member.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 10px',
                        borderRadius: radius.md,
                        background: checked ? theme['primary-soft'] : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleGroupMember(member.id)}
                        style={{ accentColor: theme.primary }}
                      />
                      <span style={{ fontSize: 13, fontWeight: 600, color: theme['text-primary'] }}>{member.name}</span>
                      <span style={{ fontSize: 11, color: theme['text-muted'], marginLeft: 'auto' }}>{member.role}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {groupError && (
              <p role="alert" style={{ margin: 0, fontSize: 13, color: theme.error }}>
                {groupError}
              </p>
            )}
            <button
              type="button"
              className="btn-pill-primary"
              style={{ height: 36, fontSize: 13, padding: '8px 16px', alignSelf: 'flex-end' }}
              onClick={handleCreateGroup}
            >
              Save group
            </button>
          </div>
        </div>
      )}

      {tab === 'sent' && (
        <div className="dash-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: `${spacing[5]} ${spacing[6]}`, borderBottom: `1px solid ${theme.divider}` }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: theme['text-primary'] }}>Sent notices</h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: theme['text-muted'] }}>
              {communications.length} broadcast{communications.length === 1 ? '' : 's'} · shown on dashboard for recipients
            </p>
          </div>
          {communications.length === 0 ? (
            <p style={{ padding: spacing[8], margin: 0, textAlign: 'center', color: theme['text-muted'] }}>
              Nothing sent yet.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {communications.map((item) => {
                const tone = severityTokens[item.severity];
                return (
                  <li
                    key={item.id}
                    style={{
                      padding: `${spacing[5]} ${spacing[6]}`,
                      borderBottom: `1px solid ${theme.divider}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          color: tone.text,
                          background: tone.bg,
                          borderRadius: radius.pill,
                          padding: '4px 10px',
                          flexShrink: 0,
                        }}
                      >
                        {item.severity}
                      </span>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: theme['text-primary'] }}>{item.title}</div>
                        <p
                          style={{
                            margin: '6px 0 0',
                            fontSize: 13,
                            lineHeight: 1.5,
                            color: theme['text-secondary'],
                          }}
                        >
                          {item.body}
                        </p>
                        <div style={{ marginTop: 10, fontSize: 12, color: theme['text-muted'] }}>
                          {item.author} · {item.createdAt} · {audienceLabel(item)} · Seen {item.seenCount}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

const fieldStyle: CSSProperties = {
  height: 40,
  borderRadius: radius.md,
  border: `1px solid ${theme.divider}`,
  background: theme['bg-surface'],
  color: theme['text-primary'],
  fontSize: 14,
  padding: '0 12px',
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
  width: '100%',
};
