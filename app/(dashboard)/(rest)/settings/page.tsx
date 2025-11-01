"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyIcon, PlusIcon, Trash2Icon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your workspace, API access, and platform preferences.
        </p>
      </div>

      <Tabs defaultValue="workspace" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Workspace Tab */}
        <TabsContent value="workspace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Info</CardTitle>
              <CardDescription>
                Details about your organization and usage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Workspace Name</Label>
                  <Input placeholder="Flowbit HQ" />
                </div>
                <div className="space-y-2">
                  <Label>Owner Email</Label>
                  <Input type="email" placeholder="you@flowbit.com" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Plan</Label>
                <Input disabled value="Pro (Monthly)" />
              </div>

              <Button>Update Workspace</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Access Tokens</CardTitle>
              <CardDescription>
                Manage API keys used for external integrations or CLI access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Server Key</p>
                  <p className="text-sm text-muted-foreground">
                    Used for programmatic access to the Flowbit API.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    readOnly
                    value="sk_live_4f8d9a8d27fa4b92"
                    className="w-[250px] truncate"
                  />
                  <Button size="icon" variant="outline">
                    <CopyIcon className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive">
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <Button className="flex items-center gap-2">
                <PlusIcon className="w-4 h-4" />
                Generate New Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Execution Settings */}
        <TabsContent value="executions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution Preferences</CardTitle>
              <CardDescription>
                Control how workflows are executed, retried, and logged.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Default Retry Attempts</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Execution Timeout (seconds)</Label>
                  <Input type="number" placeholder="300" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Execution Logging</Label>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label>Retain Logs for 30 Days</Label>
                <Switch defaultChecked />
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Notifications</CardTitle>
              <CardDescription>
                Receive alerts when executions fail or succeed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Email on Failure</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Email on Success</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Slack Alerts</Label>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Slack Webhook URL</Label>
                <Input placeholder="https://hooks.slack.com/services/..." />
              </div>
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription & Billing</CardTitle>
              <CardDescription>
                Manage your current plan, invoices, and payment methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Plan</Label>
                <Input disabled value="Pro - Monthly ($29/mo)" />
              </div>

              <div className="flex items-center justify-between">
                <Label>Auto-Renew</Label>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex justify-between">
                <Button variant="outline">View Invoices</Button>
                <Button variant="outline">Update Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
