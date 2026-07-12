export type Branch = {
  id: string;
  code: string;
  name: string;
  city: string;
  region: string;
  manager: string;
  emissions: number; // tCO2e monthly
  energy: number; // kWh
  paper: number; // sheets
  rating: "A" | "B" | "C" | "D" | "E";
  esgScore: number; // 0-100
  trend: number; // % change vs prev month
};

export const branches: Branch[] = [
  { id: "b1", code: "MUM-001", name: "Mumbai Fort", city: "Mumbai", region: "West", manager: "Priya Shah", emissions: 12.4, energy: 18400, paper: 24000, rating: "B", esgScore: 78, trend: -4.2 },
  { id: "b2", code: "DEL-014", name: "Delhi Connaught", city: "Delhi", region: "North", manager: "Arjun Mehta", emissions: 18.9, energy: 27200, paper: 31000, rating: "C", esgScore: 64, trend: 2.1 },
  { id: "b3", code: "BLR-007", name: "Bangalore MG Road", city: "Bangalore", region: "South", manager: "Divya Rao", emissions: 8.2, energy: 12800, paper: 15400, rating: "A", esgScore: 91, trend: -8.5 },
  { id: "b4", code: "CHN-022", name: "Chennai T. Nagar", city: "Chennai", region: "South", manager: "Karthik Iyer", emissions: 14.1, energy: 21500, paper: 22800, rating: "B", esgScore: 74, trend: -1.4 },
  { id: "b5", code: "KOL-009", name: "Kolkata Park St", city: "Kolkata", region: "East", manager: "Riya Sen", emissions: 22.5, energy: 32000, paper: 40200, rating: "D", esgScore: 52, trend: 6.8 },
  { id: "b6", code: "HYD-018", name: "Hyderabad Banjara", city: "Hyderabad", region: "South", manager: "Anil Reddy", emissions: 10.3, energy: 15600, paper: 18700, rating: "A", esgScore: 86, trend: -5.2 },
  { id: "b7", code: "PUN-031", name: "Pune Koregaon", city: "Pune", region: "West", manager: "Sneha Kulkarni", emissions: 11.8, energy: 17300, paper: 20100, rating: "B", esgScore: 80, trend: -3.1 },
  { id: "b8", code: "AHM-045", name: "Ahmedabad CG Rd", city: "Ahmedabad", region: "West", manager: "Vikram Patel", emissions: 16.7, energy: 24800, paper: 28900, rating: "C", esgScore: 68, trend: 1.5 },
  { id: "b9", code: "JAI-052", name: "Jaipur MI Road", city: "Jaipur", region: "North", manager: "Neha Sharma", emissions: 13.2, energy: 19700, paper: 21400, rating: "B", esgScore: 72, trend: -2.0 },
  { id: "b10", code: "GOA-061", name: "Panaji Main", city: "Panaji", region: "West", manager: "Rohan D'Souza", emissions: 6.9, energy: 10200, paper: 12800, rating: "A", esgScore: 94, trend: -11.3 },
];

export const monthlyTrend = [
  { month: "Feb", emissions: 158, energy: 235000, paper: 268000 },
  { month: "Mar", emissions: 162, energy: 241000, paper: 261000 },
  { month: "Apr", emissions: 154, energy: 228000, paper: 254000 },
  { month: "May", emissions: 149, energy: 220000, paper: 246000 },
  { month: "Jun", emissions: 141, energy: 214000, paper: 238000 },
  { month: "Jul", emissions: 135, energy: 199000, paper: 235300 },
];

export const emissionsBreakdown = [
  { source: "Electricity", value: 82, color: "var(--color-chart-1)" },
  { source: "Business travel", value: 34, color: "var(--color-chart-2)" },
  { source: "Waste", value: 12, color: "var(--color-chart-3)" },
  { source: "Fleet & logistics", value: 7, color: "var(--color-chart-4)" },
];

export type EmissionEntry = {
  id: string;
  date: string;
  branch: string;
  source: "Electricity" | "Travel" | "Waste" | "Fleet";
  quantity: number;
  unit: string;
  co2e: number;
};

export const emissionEntries: EmissionEntry[] = [
  { id: "e1", date: "2026-07-10", branch: "Mumbai Fort", source: "Electricity", quantity: 4200, unit: "kWh", co2e: 3.44 },
  { id: "e2", date: "2026-07-09", branch: "Delhi Connaught", source: "Travel", quantity: 1240, unit: "km", co2e: 0.29 },
  { id: "e3", date: "2026-07-08", branch: "Bangalore MG Road", source: "Waste", quantity: 180, unit: "kg", co2e: 0.09 },
  { id: "e4", date: "2026-07-07", branch: "Kolkata Park St", source: "Electricity", quantity: 6800, unit: "kWh", co2e: 5.58 },
  { id: "e5", date: "2026-07-06", branch: "Pune Koregaon", source: "Fleet", quantity: 320, unit: "L", co2e: 0.83 },
  { id: "e6", date: "2026-07-05", branch: "Hyderabad Banjara", source: "Electricity", quantity: 3600, unit: "kWh", co2e: 2.95 },
];

export const energyDaily = Array.from({ length: 30 }).map((_, i) => {
  const base = 7200 + Math.sin(i / 3) * 800;
  const spike = i === 18 ? 3400 : 0;
  return {
    day: `Jul ${i + 1}`,
    consumption: Math.round(base + spike + (Math.random() - 0.5) * 400),
    target: 7000,
  };
});

export const anomalies = [
  { branch: "Kolkata Park St", metric: "Energy", value: "11,240 kWh", detected: "Jul 19, 03:12", severity: "high" as const },
  { branch: "Delhi Connaught", metric: "Energy", value: "9,180 kWh", detected: "Jul 14, 14:40", severity: "medium" as const },
  { branch: "Ahmedabad CG Rd", metric: "Paper", value: "1,820 sheets", detected: "Jul 09, 10:22", severity: "low" as const },
];

export const paperMonthly = [
  { month: "Feb", paper: 268000, digital: 92000 },
  { month: "Mar", paper: 261000, digital: 104000 },
  { month: "Apr", paper: 254000, digital: 118000 },
  { month: "May", paper: 246000, digital: 132000 },
  { month: "Jun", paper: 238000, digital: 149000 },
  { month: "Jul", paper: 235300, digital: 167000 },
];

export const greenRooms = [
  { id: "gr1", branch: "Mumbai Fort", room: "Server Room A", temp: 21.4, humidity: 48, occupancy: 2, status: "ok" as const },
  { id: "gr2", branch: "Delhi Connaught", room: "Server Room B", temp: 26.8, humidity: 62, occupancy: 4, status: "warn" as const },
  { id: "gr3", branch: "Bangalore MG Road", room: "Green Room", temp: 20.1, humidity: 45, occupancy: 1, status: "ok" as const },
  { id: "gr4", branch: "Kolkata Park St", room: "Server Room", temp: 29.4, humidity: 71, occupancy: 3, status: "alert" as const },
  { id: "gr5", branch: "Hyderabad Banjara", room: "Green Room", temp: 22.0, humidity: 50, occupancy: 0, status: "ok" as const },
  { id: "gr6", branch: "Pune Koregaon", room: "Server Room", temp: 23.6, humidity: 55, occupancy: 2, status: "ok" as const },
];

export const alertHistory = [
  { id: "a1", time: "2026-07-12 08:14", rule: "Energy spike > 30%", branch: "Kolkata Park St", channel: "SMS", recipients: 3, status: "sent" as const },
  { id: "a2", time: "2026-07-11 22:07", rule: "Server room temp > 28°C", branch: "Kolkata Park St", channel: "SMS", recipients: 2, status: "sent" as const },
  { id: "a3", time: "2026-07-10 15:33", rule: "Paper daily > 1500 sheets", branch: "Ahmedabad CG Rd", channel: "SMS", recipients: 1, status: "sent" as const },
  { id: "a4", time: "2026-07-09 11:02", rule: "Humidity > 65%", branch: "Delhi Connaught", channel: "SMS", recipients: 2, status: "pending" as const },
  { id: "a5", time: "2026-07-08 09:41", rule: "Monthly ESG score < 60", branch: "Kolkata Park St", channel: "SMS", recipients: 4, status: "sent" as const },
];

export const alertRules = [
  { id: "r1", name: "Energy spike > 30%", metric: "Energy", threshold: "+30% DoD", channel: "SMS", enabled: true },
  { id: "r2", name: "Server room temp > 28°C", metric: "Temperature", threshold: "> 28°C", channel: "SMS", enabled: true },
  { id: "r3", name: "Humidity > 65%", metric: "Humidity", threshold: "> 65%", channel: "SMS", enabled: true },
  { id: "r4", name: "Paper daily > 1500 sheets", metric: "Paper", threshold: "> 1500 /day", channel: "SMS", enabled: true },
  { id: "r5", name: "Monthly ESG score < 60", metric: "ESG", threshold: "< 60", channel: "SMS + Email", enabled: false },
];

export const users = [
  { id: "u1", name: "Ananya Iyer", email: "ananya.iyer@verdant.bank", role: "Admin", branch: "HQ", status: "active" as const },
  { id: "u2", name: "Rahul Menon", email: "rahul.menon@verdant.bank", role: "Branch Manager", branch: "Mumbai Fort", status: "active" as const },
  { id: "u3", name: "Priya Shah", email: "priya.shah@verdant.bank", role: "Branch Manager", branch: "Mumbai Fort", status: "active" as const },
  { id: "u4", name: "Sameer Khan", email: "sameer.khan@verdant.bank", role: "Auditor", branch: "HQ", status: "active" as const },
  { id: "u5", name: "Nikhil Rao", email: "nikhil.rao@verdant.bank", role: "Branch Manager", branch: "Bangalore MG Road", status: "inactive" as const },
];

export function totals() {
  const emissions = branches.reduce((a, b) => a + b.emissions, 0);
  const energy = branches.reduce((a, b) => a + b.energy, 0);
  const paper = branches.reduce((a, b) => a + b.paper, 0);
  const esg = Math.round(branches.reduce((a, b) => a + b.esgScore, 0) / branches.length);
  return { emissions, energy, paper, esg };
}
