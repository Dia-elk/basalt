"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Customer } from "@/lib/mock/customers";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function CustomersTable({
  customers,
  onEdit,
  onDelete,
}: {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4">Customer</TableHead>
            <TableHead>Location</TableHead>
            <TableHead dir="ltr">Orders</TableHead>
            <TableHead dir="ltr">Total spent</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-10 pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="group cursor-pointer" onClick={() => onEdit(customer)}>
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{initials(customer.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{customer.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{customer.location}</TableCell>
              <TableCell dir="ltr">{customer.orders}</TableCell>
              <TableCell className="font-mono text-xs" dir="ltr">
                ${customer.totalSpent.toLocaleString()}
              </TableCell>
              <TableCell className="text-muted-foreground" dir="ltr">
                {customer.joined}
              </TableCell>
              <TableCell className="pr-4">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="flex size-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100 data-[popup-open]:opacity-100"
                        aria-label={`Actions for ${customer.name}`}
                      />
                    }
                  >
                    <MoreHorizontal className="size-4" strokeWidth={1.5} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(customer);
                      }}
                    >
                      <Pencil className="size-3.5" strokeWidth={1.5} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(customer);
                      }}
                    >
                      <Trash2 className="size-3.5" strokeWidth={1.5} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
