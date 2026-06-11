"use client";

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/api/audit";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCheck, Loader } from "lucide-react";
import { toast } from "sonner";
import NotificationItem from "./notification-item";

const notificationsQueryKey = ["notifications"];

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: notificationsQueryKey,
    queryFn: getNotifications,
  });

  const markReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: notificationsQueryKey });
      toast.success(response.message);
    },
    onError: () => toast.error("Failed to mark notification as read."),
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: notificationsQueryKey });
      toast.success(response.message);
    },
    onError: () => toast.error("Failed to mark all notifications as read."),
  });

  const notifications = data?.data ?? [];
  const unreadCount = notifications.filter(
    (notification) => notification.readAt === null,
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review account and security notifications.
        </p>
      </div>

      <Card>
        <CardHeader className="gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>
              {unreadCount === 0
                ? "You have no unread notifications."
                : `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={
              isLoading || unreadCount === 0 || markAllReadMutation.isPending
            }
            onClick={() => markAllReadMutation.mutate()}
          >
            {markAllReadMutation.isPending ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <CheckCheck className="size-4" />
            )}
            Mark all read
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-28 w-full" />
            ))
          ) : isError ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              Failed to load notifications.
            </div>
          ) : notifications.length ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                isMarkingRead={
                  markReadMutation.isPending &&
                  markReadMutation.variables === notification._id
                }
                onMarkRead={markReadMutation.mutate}
              />
            ))
          ) : (
            <div className="rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
              No notifications found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
