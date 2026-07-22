"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/shared/container";
import { stores } from "@/lib/mock/stores";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("Amina Kader");
  const [title, setTitle] = useState("Founder, Lumière Parfums");
  const [bio, setBio] = useState("Building fragrance experiences that feel like a signature, not a purchase.");

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <h1 className="text-2xl font-medium">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">Your personal information across Basalt.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarFallback className="text-lg">AK</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">{title}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-name">Full name</Label>
                <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-title">Title</Label>
                <Input id="profile-title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-bio">Bio</Label>
                <Textarea id="profile-bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
              <div>
                <Button onClick={() => toast.success("Profile updated")}>Save changes</Button>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-5">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 text-sm font-medium">Overview</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Stores</span>
                <span>{stores.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member since</span>
                <span>Aug 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span>Professional</span>
              </div>
            </div>
          </section>

          <Button variant="outline" className="gap-1.5" onClick={() => router.push("/")}>
            <LogOut className="size-4" strokeWidth={1.5} />
            Sign out
          </Button>
        </div>
      </div>
    </Container>
  );
}
