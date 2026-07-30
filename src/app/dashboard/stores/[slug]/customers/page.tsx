"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Plus, Search, Users, Repeat, Wallet, DollarSign } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { CustomersTable } from "@/components/dashboard/customers-table";
import { CustomerSheet } from "@/components/dashboard/customer-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { getStoreCustomers, saveStoreCustomers, createCustomer, type Customer } from "@/lib/mock/customers";
import { getStoreOrders } from "@/lib/mock/orders";
import type { Store } from "@/lib/mock/stores";

export default function StoreCustomersPage() {
  const { slug } = useParams<{ slug: string }>();
  return <StoreScopedPage slug={slug}>{(store) => <CustomersWorkspace store={store} />}</StoreScopedPage>;
}

function CustomersWorkspace({ store }: { store: Store }) {
  const [customers, setCustomers] = useState<Customer[]>(() => getStoreCustomers(store));
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const orders = useMemo(() => getStoreOrders(store), [store]);

  const persist = (next: Customer[]) => {
    setCustomers(next);
    saveStoreCustomers(store.slug, next);
  };

  const filtered = useMemo(
    () =>
      customers.filter(
        (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
      ),
    [customers, search]
  );

  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpend = customers.length > 0 ? Math.round(totalSpent / customers.length) : 0;
  const repeatCustomers = customers.filter((c) => c.orders > 1).length;

  const openCreate = () => {
    setEditing(null);
    setSheetOpen(true);
  };
  const openEdit = (customer: Customer) => {
    setEditing(customer);
    setSheetOpen(true);
  };

  const handleSave = (values: { name: string; email: string; location: string }) => {
    if (editing) {
      persist(customers.map((c) => (c.id === editing.id ? { ...c, ...values } : c)));
      toast.success("Customer updated");
    } else {
      persist([...customers, createCustomer(values)]);
      toast.success("Customer added");
    }
  };

  const handleDelete = (customer: Customer) => {
    persist(customers.filter((c) => c.id !== customer.id));
    toast.info("Customer removed", { description: `${customer.name} was removed.` });
  };

  return (
    <>
      <FeaturePageShell
        title="Customers"
        description="Everyone who's bought from this store."
        action={
          <Button className="gap-1.5" onClick={openCreate}>
            <Plus className="size-4" strokeWidth={1.5} />
            Add customer
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <StatGrid>
            <KpiCard label="Customers" value={customers.length.toString()} icon={Users} />
            <KpiCard label="Repeat customers" value={repeatCustomers.toString()} icon={Repeat} />
            <KpiCard label="Avg. spend" value={`$${avgSpend}`} icon={Wallet} />
            <KpiCard label="Total revenue" value={`$${totalSpent.toLocaleString()}`} icon={DollarSign} />
          </StatGrid>

          <div className="relative">
            <Search className="absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers…"
              className="ps-9"
            />
          </div>

          {filtered.length > 0 ? (
            <CustomersTable customers={filtered} onEdit={openEdit} onDelete={handleDelete} />
          ) : (
            <EmptyState
              icon={Users}
              title={customers.length === 0 ? "No customers yet" : "No customers match your search"}
              description={
                customers.length === 0
                  ? "Customers will show up here as soon as this store makes its first sale."
                  : "Try a different search."
              }
            />
          )}
        </div>
      </FeaturePageShell>

      <CustomerSheet open={sheetOpen} onOpenChange={setSheetOpen} customer={editing} orders={orders} onSave={handleSave} />
    </>
  );
}
