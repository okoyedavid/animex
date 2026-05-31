export type BackendRoute = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  auth: "required" | "optional";
  purpose: string;
  body?: string;
  response: string;
  securityNotes?: string[];
};

export const SETTINGS_BACKEND_ROUTES: BackendRoute[] = [
  {
    method: "GET",
    path: "/auth/me",
    auth: "required",
    purpose: "Return the authenticated user and lightweight account metadata.",
    response:
      "{ user: { _id, name, email, profile, status, emailVerifiedAt, createdAt, updatedAt, authProviders, lastPasswordChangeAt, twoFactorEnabled } }",
    securityNotes: [
      "Read the user from the verified access token/session, never from a user id supplied by the client.",
      "Do not return password hashes, refresh tokens, TOTP secrets, or backup-code hashes.",
    ],
  },
  {
    method: "POST",
    path: "/auth/logout",
    auth: "required",
    purpose: "Revoke the current refresh token/session and clear auth cookies.",
    response: "{ message: string }",
    securityNotes: [
      "Delete or revoke only the current session record.",
      "Clear access and refresh cookies with the same cookie options used when setting them.",
    ],
  },
  {
    method: "POST",
    path: "/auth/logout-all",
    auth: "required",
    purpose: "Revoke every session for the current user.",
    body: "{ password?: string, totpCode?: string }",
    response: "{ revokedCount: number, message: string }",
    securityNotes: [
      "Require recent authentication or a password/TOTP challenge.",
      "Keep the current request authenticated until the response is sent, then clear cookies.",
    ],
  },
  {
    method: "GET",
    path: "/users/me/security-overview",
    auth: "required",
    purpose:
      "Return dashboard metrics for account protection, sessions, alerts, and recent activity.",
    response:
      "{ securityScore, emailVerified, twoFactorEnabled, activeSessions, unreadSecurityAlerts, recentActivityCount, lastLoginAt, lastPasswordChangeAt }",
  },
  {
    method: "PATCH",
    path: "/users/me/profile",
    auth: "required",
    purpose: "Update public profile fields.",
    body: "{ name?: string, username?: string, bio?: string, profile?: string }",
    response: "{ user, message: string }",
    securityNotes: [
      "Validate length and allowed characters server-side.",
      "Rate-limit profile updates to reduce abuse.",
    ],
  },
  {
    method: "POST",
    path: "/users/me/avatar",
    auth: "required",
    purpose: "Upload or replace the user's profile image.",
    body: "multipart/form-data { avatar: File }",
    response: "{ profile: string, message: string }",
    securityNotes: [
      "Validate MIME type and file size.",
      "Re-encode uploaded images before storing or serving them.",
    ],
  },
  {
    method: "POST",
    path: "/users/me/email-change/request",
    auth: "required",
    purpose: "Start an email-change flow by sending a code to the new address.",
    body: "{ newEmail: string, password?: string }",
    response: "{ pendingEmail: string, expiresAt: string, message: string }",
    securityNotes: [
      "Require password or recent authentication before changing email.",
      "Store only a hash of the email-change OTP.",
      "Rate-limit by user id, current email, new email, and IP.",
    ],
  },
  {
    method: "POST",
    path: "/users/me/email-change/confirm",
    auth: "required",
    purpose: "Confirm the pending email change with the OTP/code.",
    body: "{ code: string }",
    response: "{ user, message: string }",
    securityNotes: [
      "Invalidate the code after one successful use.",
      "Send a security notification to the old email address.",
    ],
  },
  {
    method: "PATCH",
    path: "/users/me/password",
    auth: "required",
    purpose: "Change the current user's password.",
    body: "{ currentPassword: string, newPassword: string }",
    response: "{ message: string, changedAt: string }",
    securityNotes: [
      "Verify current password before changing it.",
      "Hash with Argon2id or bcrypt using a strong work factor.",
      "Revoke all other sessions after password change.",
      "Record a security event and send an alert email.",
    ],
  },
  {
    method: "GET",
    path: "/users/me/sessions",
    auth: "required",
    purpose: "List active sessions/devices for the authenticated user.",
    response:
      "{ sessions: [{ id, deviceName, browser, os, ipAddress, location, current, createdAt, lastActiveAt }] }",
    securityNotes: [
      "Mark current session by comparing the current refresh token/session id.",
      "Avoid exposing full precision location if unnecessary.",
    ],
  },
  {
    method: "DELETE",
    path: "/users/me/sessions/:sessionId",
    auth: "required",
    purpose: "Revoke one session by id.",
    response: "{ message: string }",
    securityNotes: [
      "Ensure the session belongs to the current user.",
      "Allow revoking the current session, then clear cookies.",
    ],
  },
  {
    method: "DELETE",
    path: "/users/me/sessions",
    auth: "required",
    purpose: "Revoke all sessions except the current one.",
    body: "{ keepCurrent?: boolean }",
    response: "{ revokedCount: number, message: string }",
    securityNotes: ["Require recent authentication for this bulk action."],
  },
  {
    method: "GET",
    path: "/users/me/security-events",
    auth: "required",
    purpose: "Return audit log events for the current user.",
    response:
      "{ events: [{ id, type, status, device, ipAddress, location, createdAt, metadata }] }",
    securityNotes: [
      "Store append-only security events for login, logout, password, email, 2FA, and destructive actions.",
      "Paginate this endpoint once the log grows.",
    ],
  },
  {
    method: "POST",
    path: "/users/me/2fa/totp/setup",
    auth: "required",
    purpose: "Create a pending TOTP secret and return the QR provisioning URI.",
    body: "{ password?: string }",
    response: "{ otpauthUrl: string, manualEntryKey: string, expiresAt: string }",
    securityNotes: [
      "Require password or recent authentication.",
      "Encrypt the pending TOTP secret at rest.",
      "Do not enable 2FA until the user verifies a valid TOTP code.",
    ],
  },
  {
    method: "POST",
    path: "/users/me/2fa/totp/verify",
    auth: "required",
    purpose: "Verify the first TOTP code and enable authenticator-app 2FA.",
    body: "{ code: string }",
    response: "{ twoFactorEnabled: true, backupCodes: string[], message: string }",
    securityNotes: [
      "Hash backup codes before storing them.",
      "Show raw backup codes only once.",
    ],
  },
  {
    method: "POST",
    path: "/users/me/2fa/totp/disable",
    auth: "required",
    purpose: "Disable TOTP 2FA.",
    body: "{ password?: string, code?: string }",
    response: "{ twoFactorEnabled: false, message: string }",
    securityNotes: ["Require password, TOTP, backup code, or recent authentication."],
  },
  {
    method: "POST",
    path: "/users/me/2fa/backup-codes",
    auth: "required",
    purpose: "Regenerate recovery backup codes.",
    body: "{ password?: string, code?: string }",
    response: "{ backupCodes: string[], message: string }",
    securityNotes: [
      "Invalidate all previous backup codes.",
      "Show raw backup codes only once.",
    ],
  },
  {
    method: "GET",
    path: "/users/me/notification-preferences",
    auth: "required",
    purpose: "Return saved notification preferences.",
    response:
      "{ preferences: { securityAlerts, newLoginAlerts, passwordChangeAlerts, weeklySummary, watchlistUpdates, productUpdates, marketingEmails } }",
  },
  {
    method: "PATCH",
    path: "/users/me/notification-preferences",
    auth: "required",
    purpose: "Update notification preferences.",
    body: "{ preferences: Partial<NotificationPreferences> }",
    response: "{ preferences, message: string }",
    securityNotes: [
      "Consider making critical security alerts non-disableable.",
      "Audit changes to security-notification preferences.",
    ],
  },
  {
    method: "GET",
    path: "/users/me/export",
    auth: "required",
    purpose: "Create or download an export of user profile, watchlist, sessions, and security events.",
    response: "application/json or { exportUrl: string, expiresAt: string }",
    securityNotes: [
      "Require recent authentication.",
      "Make export URLs short-lived and scoped to the user.",
    ],
  },
  {
    method: "POST",
    path: "/users/me/delete/request",
    auth: "required",
    purpose: "Start account deletion with a confirmation challenge.",
    body: "{ password?: string, reason?: string }",
    response: "{ confirmationRequired: true, expiresAt: string, message: string }",
    securityNotes: [
      "Require password or recent authentication.",
      "Send a confirmation email before final deletion.",
    ],
  },
  {
    method: "DELETE",
    path: "/users/me",
    auth: "required",
    purpose: "Delete or soft-delete the authenticated user account.",
    body: "{ confirmationText: string, password?: string, code?: string }",
    response: "{ message: string }",
    securityNotes: [
      "Require confirmation text, password, and 2FA if enabled.",
      "Prefer soft delete first, then permanent deletion after a retention window.",
      "Revoke all sessions and clear cookies.",
    ],
  },
];

export const SECURITY_EVENT_TYPES = [
  "login.success",
  "login.failed",
  "logout",
  "session.revoked",
  "password.changed",
  "email.change.requested",
  "email.changed",
  "2fa.enabled",
  "2fa.disabled",
  "backup_codes.generated",
  "profile.updated",
  "notifications.updated",
  "data.exported",
  "account.deletion_requested",
  "account.deleted",
] as const;
