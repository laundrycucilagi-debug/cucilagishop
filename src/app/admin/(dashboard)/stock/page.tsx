import { AdminSection } from "@/components/admin/admin-section";
import { StockHistoryTable } from "@/components/admin/admin-table";
import { AdminButton, Field, SelectInput, TextArea, TextInput } from "@/components/admin/form-controls";
import { products, stockHistories } from "@/lib/products";

export default function AdminStockPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Stok</p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold text-black">Manajemen Stok</h2>
      </div>

      <AdminSection title="Update Stok" description="Gunakan nilai positif untuk restock dan nilai negatif untuk pengurangan stok manual.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Produk">
            <SelectInput defaultValue={products[0]?.id}>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Perubahan Stok">
            <TextInput placeholder="10 atau -2" inputMode="numeric" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Catatan">
              <TextArea placeholder="Contoh: restock dari supplier atau penyesuaian stok." />
            </Field>
          </div>
        </div>
        <div className="mt-5">
          <AdminButton>Simpan Perubahan</AdminButton>
        </div>
      </AdminSection>

      <AdminSection title="Riwayat Stok">
        <StockHistoryTable histories={stockHistories} />
      </AdminSection>
    </div>
  );
}
