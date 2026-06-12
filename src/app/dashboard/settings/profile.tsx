"use client";
import { getUser } from "@/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { backend } from "@/api/axios"; // your axios instance
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Camera } from "lucide-react";

const initialData = { name: "", bio: "", username: "" };

export default function ProfileSettingsPage() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
  });

  const [avatar, setAvatar] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.data) {
      setForm({
        name: data.data.name || "",
        username: data.data.username || "",
        bio: data.data.bio || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const updateMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();

      // append text fields
      if (form.name) formData.append("name", form.name);
      if (form.username) formData.append("username", form.username);
      if (form.bio) formData.append("bio", form.bio);

      // append file if exists
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await backend.patch("/auth/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError(err) {},
  });

  const avatarPreview = avatar
    ? URL.createObjectURL(avatar)
    : data?.data?.avatar;

  const handleSubmit = () => {
    updateMutation.mutate();
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Profile Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update public identity, profile visibility, and anime preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            This information may be displayed publicly.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleFileChange}
            />

            <Avatar className="size-20 border border-border">
              <AvatarImage src={avatarPreview} />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <Button variant="outline" asChild>
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <Camera className="size-4" />
                  Upload avatar
                </label>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>Username</Label>

              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea name="bio" value={form.bio} onChange={handleChange} />
          </div>

          <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
