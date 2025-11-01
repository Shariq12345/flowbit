"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2Icon, MailIcon, PlusIcon, ShieldCheckIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function TeamPage() {
  return (
    <div className="flex flex-col space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Team Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your team members, roles, and invitations for this workspace.
        </p>
      </div>

      {/* Invite new member */}
      <Card>
        <CardHeader>
          <CardTitle>Invite a Team Member</CardTitle>
          <CardDescription>
            Send an email invite to join your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input placeholder="teammate@flowbit.com" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select defaultValue="member">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" /> Send Invite
          </Button>
        </CardContent>
      </Card>

      {/* Active Members */}
      <Card>
        <CardHeader>
          <CardTitle>Active Members</CardTitle>
          <CardDescription>Current members of your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Example Members */}
              <TableRow>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/avatars/alex.png" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Alex Rivera</p>
                    <p className="text-sm text-muted-foreground">
                      alex@flowbit.com
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Admin</Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </TableCell>
                <TableCell>2h ago</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jamie McConnell</p>
                    <p className="text-sm text-muted-foreground">
                      jamie@flowbit.com
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Member</Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </TableCell>
                <TableCell>1d ago</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Invites */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Invites</CardTitle>
          <CardDescription>
            Invites waiting to be accepted by new team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Invited On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>newuser@flowbit.com</TableCell>
                <TableCell>Viewer</TableCell>
                <TableCell>Oct 20, 2025</TableCell>
                <TableCell>
                  <Badge variant="outline">Pending</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="icon" variant="outline">
                    <MailIcon className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Define what each role in your workspace can do.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-muted-foreground" />
                Admin
              </p>
              <p className="text-sm text-muted-foreground">
                Full access to all resources and settings.
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Member</p>
              <p className="text-sm text-muted-foreground">
                Can create and manage workflows but not billing.
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Viewer</p>
              <p className="text-sm text-muted-foreground">
                Read-only access to workflows and execution history.
              </p>
            </div>
            <Switch />
          </div>

          <Separator />

          <Button variant="outline">Save Role Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
