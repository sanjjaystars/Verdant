import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { branches, users } from "@/lib/mock-data";
import { Plus, Shield } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Verdant" }] }),
  component: AdminPage,
});

const roleColor: Record<string, string> = {
  Admin: "bg-primary/15 text-primary",
  "Branch Manager": "bg-navy/10 text-navy",
  Auditor: "bg-warning/15 text-warning",
};

function AdminPage() {
  return (
    <AppShell title="Admin Panel" subtitle="Branches, users & roles, alert thresholds">
      <Tabs defaultValue="branches">
        <TabsList>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="users">Users & roles</TabsTrigger>
          <TabsTrigger value="thresholds">Alert thresholds</TabsTrigger>
        </TabsList>

        <TabsContent value="branches" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Branches</CardTitle>
                <CardDescription>Add, edit, and configure branch profiles</CardDescription>
              </div>
              <Button size="sm"><Plus className="mr-1.5 h-4 w-4" />Add branch</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead className="text-right">ESG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-xs">{b.code}</TableCell>
                      <TableCell className="font-medium">{b.name}</TableCell>
                      <TableCell>{b.region}</TableCell>
                      <TableCell>{b.manager}</TableCell>
                      <TableCell className="text-right font-semibold">{b.esgScore}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> Users & roles</CardTitle>
                <CardDescription>Admin · Branch Manager · Auditor</CardDescription>
              </div>
              <Button size="sm"><Plus className="mr-1.5 h-4 w-4" />Invite user</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell><Badge variant="secondary" className={roleColor[u.role]}>{u.role}</Badge></TableCell>
                      <TableCell>{u.branch}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className={u.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}>
                          {u.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert thresholds</CardTitle>
              <CardDescription>Global defaults — individual rules can override</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field label="Server room temperature max" value="28" unit="°C" />
              <Field label="Humidity max" value="65" unit="%" />
              <Field label="Energy day-over-day spike" value="30" unit="%" />
              <Field label="Paper daily usage max" value="1500" unit="sheets" />
              <Field label="Minimum ESG score" value="60" unit="/ 100" />
              <Field label="Emissions monthly cap" value="20" unit="tCO₂e" />
              <div className="md:col-span-2 flex justify-end"><Button>Save thresholds</Button></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Field({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Input defaultValue={value} />
        <span className="text-sm text-muted-foreground w-20">{unit}</span>
      </div>
    </div>
  );
}
