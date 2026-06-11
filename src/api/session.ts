import { backend } from "./axios";

type SessionData = {
  city: string | null;
  country: string | null;
  createdAt: string;
  currentAuthSessionId: string;
  deviceName: string | null;
  expiresAt: string;
  id: string;
  ipAddress: string | null;
  isCurrentIpMatch: boolean;
  isCurrentSession: boolean;
  lastSeenAt: string;
  region: string | null;
  revokedAt: string | null;
  userAgent: string | null;
  userId: string;
  userSessionId: string;
};

type SessionDataWithUnknown = {
  [K in keyof SessionData]: SessionData[K] extends string | null
    ? string
    : SessionData[K];
};

type SessionResponse = Promise<{
  data: SessionDataWithUnknown[] | null;
  message: string;
  success: boolean;
}>;

function replaceNullWithUnknown(data: SessionData): SessionDataWithUnknown {
  return {
    city: data.city ?? "Unknown",
    country: data.country ?? "Unknown",
    createdAt: data.createdAt,
    currentAuthSessionId: data.currentAuthSessionId,
    deviceName: data.deviceName ?? "Unknown",
    expiresAt: data.expiresAt,
    id: data.id,
    ipAddress: data.ipAddress ?? "Unknown",
    isCurrentIpMatch: data.isCurrentIpMatch,
    isCurrentSession: data.isCurrentSession,
    lastSeenAt: data.lastSeenAt,
    region: data.region ?? "Unknown",
    revokedAt: data.revokedAt,
    userAgent: data.userAgent ?? "Unknown",
    userId: data.userId,
    userSessionId: data.userSessionId,
  };
}

function replaceNullsInSessions(
  sessions: SessionData[],
): SessionDataWithUnknown[] {
  return sessions.map((session) => replaceNullWithUnknown(session));
}

async function revokeSession(sessionID: string | null) {
  const params = sessionID ? sessionID : "";

  const response = await backend.delete(`/auth/me/sessions/${params}`);

  const { data, message } = response.data;

  return {
    data,
    success: true,
    message,
  };
}

export type { SessionData, SessionDataWithUnknown, SessionResponse };
export { replaceNullWithUnknown, replaceNullsInSessions, revokeSession };
