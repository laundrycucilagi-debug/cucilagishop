import { AdminReportsClient } from "@/components/admin/admin-reports-client";
import { products, sales } from "@/lib/products";

export default function AdminReportsPage() {
  return <AdminReportsClient products={products} sales={sales} />;
}
