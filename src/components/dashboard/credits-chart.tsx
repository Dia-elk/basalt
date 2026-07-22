"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function CreditsChart({ data }: { data: { date: string; credits: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="creditsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--success)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          interval={Math.ceil(data.length / 6)}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} width={36} />
        <Tooltip
          contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
          labelStyle={{ color: "var(--foreground)" }}
          formatter={(value) => [`${value} credits`, "Used"]}
        />
        <Area type="monotone" dataKey="credits" stroke="var(--success)" strokeWidth={2} fill="url(#creditsFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
