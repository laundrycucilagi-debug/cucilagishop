import { AdminSection } from "@/components/admin/admin-section";
import { SalesTable } from "@/components/admin/admin-table";
import { AdminButton, Field, SelectInput, TextArea, TextInput } from "@/components/admin/form-controls";
import { products, sales } from "@/lib/products";

export default function AdminSalesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Penjualan</p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold text-black">Catat Penjualan</h2>
      </div>

      <AdminSection title="Tambah Penjualan" description="Harga jual dan total dihitung dari data produk saat transaksi dibuat.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Tanggal">
            <TextInput type="date" defaultValue="2026-06-19" />
          </Field>
          <Field label="Produk">
            <SelectInput defaultValue={products[0]?.id}>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Jumlah">
            <TextInput placeholder="1" inputMode="numeric" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Catatan">
              <TextArea placeholder="Contoh: pelanggan ambil langsung di outlet." />
            </Field>
          </div>
        </div>
        <div className="mt-5">
          <AdminButton>Simpan Penjualan</AdminButton>
        </div>
      </AdminSection>

      <AdminSection title="Riwayat Penjualan">
        <SalesTable sales={sales} />
      </AdminSection>
    </div>
  );
}
