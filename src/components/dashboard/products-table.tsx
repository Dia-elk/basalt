"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Product, ProductStatus } from "@/lib/mock/products";
import { cn } from "@/lib/utils";

const statusVariant: Record<ProductStatus, "secondary" | "outline" | "destructive"> = {
  active: "secondary",
  draft: "outline",
  "out-of-stock": "destructive",
};
const statusLabel: Record<ProductStatus, string> = {
  active: "Active",
  draft: "Draft",
  "out-of-stock": "Out of stock",
};

export function ProductsTable({
  products,
  onEdit,
  onDelete,
}: {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4">Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead dir="ltr">Price</TableHead>
            <TableHead dir="ltr">Stock</TableHead>
            <TableHead className="w-10 pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="group">
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <div
                    className="size-9 shrink-0 rounded-lg"
                    style={{ background: `linear-gradient(135deg, ${product.accent}, ${product.accent}66)` }}
                  />
                  <span className="font-medium">{product.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant[product.status]}>{statusLabel[product.status]}</Badge>
              </TableCell>
              <TableCell className="font-mono text-xs" dir="ltr">
                ${product.price}
              </TableCell>
              <TableCell className="font-mono text-xs" dir="ltr">
                <span className={cn(product.stock === 0 && "text-destructive", product.stock > 0 && product.stock < 10 && "text-warning")}>
                  {product.stock}
                </span>
              </TableCell>
              <TableCell className="pr-4">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        className="flex size-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100 data-[popup-open]:opacity-100"
                        aria-label={`Actions for ${product.name}`}
                      />
                    }
                  >
                    <MoreHorizontal className="size-4" strokeWidth={1.5} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(product)}>
                      <Pencil className="size-3.5" strokeWidth={1.5} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => onDelete(product)}>
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
