import { Users, VenetianMask, HelpCircle } from "lucide-react";
import type { Role } from "@/lib/gameLogic";

const AVATAR_COLORS = [
  "#6366F1", "#EC4899", "#14B8A6", "#F59E0B", "#8B5CF6",
  "#0EA5E9", "#EF4444", "#22C55E", "#F97316", "#06B6D4",
];

export function PlayerAvatar({
  name,
  id,
  size = 32,
  muted = false,
}: {
  name: string;
  id: number;
  size?: number;
  muted?: boolean;
}) {
  const color = muted ? "#94A3B8" : AVATAR_COLORS[id % AVATAR_COLORS.length];
  const initial = (name.trim()[0] ?? "?").toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
        background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 80%, black))`,
      }}
    >
      {initial}
    </span>
  );
}

const ROLE_STYLE: Record<Role, { cls: string; Icon: typeof Users }> = {
  Burger: { cls: "text-burger bg-burger/15 border-burger/45", Icon: Users },
  Undercover: { cls: "text-undercover bg-undercover/15 border-undercover/45", Icon: VenetianMask },
  "Mister White": { cls: "text-misterwhite bg-misterwhite/15 border-misterwhite/45", Icon: HelpCircle },
};

export const roleTextClass = (role: Role) =>
  role === "Burger" ? "text-burger" : role === "Undercover" ? "text-undercover" : "text-misterwhite";

export const roleSurfaceClass = (role: Role) =>
  role === "Burger"
    ? "bg-burger/10 border-burger/40"
    : role === "Undercover"
      ? "bg-undercover/10 border-undercover/40"
      : "bg-misterwhite/10 border-misterwhite/40";

export function RoleIcon({ role, className }: { role: Role; className?: string }) {
  const { Icon } = ROLE_STYLE[role];
  return <Icon className={className} />;
}

export function RoleBadge({ role, large = false }: { role: Role; large?: boolean }) {
  const { cls, Icon } = ROLE_STYLE[role];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-black uppercase tracking-wider ${cls} ${
        large ? "px-3.5 py-1.5 text-sm" : "px-2 py-0.5 text-[10px]"
      }`}
    >
      <Icon className={large ? "w-4 h-4" : "w-3 h-3"} />
      {role}
    </span>
  );
}
