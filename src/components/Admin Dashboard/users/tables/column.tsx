"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type user = {
  id: string;
  email: string;
  role: "user" | "admin";
  no_hp: string;
  full_name: string;
  school: string;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<user>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "school",
    header: "School",
  },
];
