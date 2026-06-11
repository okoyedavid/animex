import type { UserNotification } from "@/api/audit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Bell, Check, Loader } from "lucide-react";

type NotificationItemProps = {
  notification: UserNotification;
  isMarkingRead: boolean;
  onMarkRead: (notificationId: string) => void;
};

export default function NotificationItem({
  notification,
  isMarkingRead,
  onMarkRead,
}: NotificationItemProps) {
  const isRead = notification.readAt !== null;

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-surface p-4">
      <div className="flex min-w-0 gap-3">
        <Bell className="mt-1 size-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{notification.title}</p>
            {!isRead && (
              <Badge className="rounded-md">New</Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {notification.message}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {formatDate(notification.createdAt)}
          </p>
        </div>
      </div>

      {!isRead && (
        <Button
          variant="outline"
          size="sm"
          disabled={isMarkingRead}
          onClick={() => onMarkRead(notification._id)}
        >
          {isMarkingRead ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <Check className="size-4" />
          )}
          Mark read
        </Button>
      )}
    </div>
  );
}
