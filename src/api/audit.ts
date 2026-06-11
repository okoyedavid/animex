import { backend } from "./axios";

export type AuditEvent = {
  _id: string;
  eventId: string;
  eventType: string;
  category: string;
  outcome: string;
  severity: string;
  reason: string | null;
  userId: string;
  authSessionId: string | null;
  userSessionId: string | null;
  requestId: string | null;
  deviceName: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  emailHash: string | null;
  createdAt: string;
};

export type UserNotification = {
  _id: string;
  auditEventId: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  severity: string;
  readAt: string | null;
  createdAt: string;
};

type ApiResult<T> = {
  data: T;
  message: string;
  success: boolean;
};

type ApiRecord = Record<string, unknown>;

function getRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" ? (value as ApiRecord) : {};
}

function getArray(payload: unknown, key: string): ApiRecord[] {
  const body = getRecord(payload);
  const nestedData = getRecord(body.data);
  const candidates = [body[key], body.data, nestedData[key]];
  const value = candidates.find(Array.isArray);

  return Array.isArray(value) ? (value as ApiRecord[]) : [];
}

function getMessage(payload: unknown, fallback: string) {
  const message = getRecord(payload).message;
  return typeof message === "string" ? message : fallback;
}

export async function getAuditEvents(): Promise<ApiResult<AuditEvent[]>> {
  const response = await backend.get("/auth/me/audit-events");

  return {
    data: getArray(response.data, "events") as AuditEvent[],
    message: getMessage(response.data, "Audit events loaded."),
    success: true,
  };
}

export async function getNotifications(): Promise<
  ApiResult<UserNotification[]>
> {
  const response = await backend.get("/auth/me/notifications");

  return {
    data: getArray(response.data, "notifications") as UserNotification[],
    message: getMessage(response.data, "Notifications loaded."),
    success: true,
  };
}

export async function markAllNotificationsAsRead(): Promise<ApiResult<null>> {
  const response = await backend.patch("/auth/me/notifications/read-all");

  return {
    data: null,
    message: getMessage(response.data, "All notifications marked as read."),
    success: true,
  };
}

export async function markNotificationAsRead(
  notificationId: string,
): Promise<ApiResult<null>> {
  const response = await backend.patch(
    `/auth/me/notifications/${encodeURIComponent(notificationId)}/read`,
  );

  return {
    data: null,
    message: getMessage(response.data, "Notification marked as read."),
    success: true,
  };
}
