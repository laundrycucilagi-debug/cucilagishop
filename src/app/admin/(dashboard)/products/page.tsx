import { AdminSection } from "@/components/admin/admin-section";
import { ProductTable } from "@/components/admin/admin-table";
import { AdminButton, Field, SelectInput, TextArea, TextInput } from "@/components/admin/form-controls";
import { ProductImageField } from "@/components/admin/product-image-field";
import { products } from "@/lib/products";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Manajemen Produk</p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold text-black">Kelola Produk</h2>
      </div>

      <AdminSection title="Tambah Produk" description="Field mengikuti PRD: nama, deskripsi, harga, diskon, stok, foto, dan status aktif.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nama Produk">
            <TextInput placeholder="Contoh: Deterjen Laundry Premium" />
          </Field>
          <Field label="Kategori Produk">
            <SelectInput defaultValue="Deterjen">
              {Array.from(new Set(products.map((product) => product.category))).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Harga Normal">
            <TextInput placeholder="50000" inputMode="numeric" />
          </Field>
          <Field label="Diskon %">
            <TextInput placeholder="10" inputMode="numeric" />
          </Field>
          <Field label="Stok">
            <TextInput placeholder="25" inputMode="numeric" />
          </Field>
          <Field label="Status Aktif">
            <SelectInput defaultValue="Aktif">
              <option>Aktif</option>
              <option>Nonaktif</option>
            </SelectInput>
          </Field>
          <div className="md:col-span-2">
            <Field label="Foto Produk">
              <ProductImageField />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Deskripsi">
              <TextArea placeholder="Deskripsi singkat produk untuk tampil di katalog." />
            </Field>
          </div>
        </div>
        <div className="mt-5">
          <AdminButton>Simpan Produk</AdminButton>
        </div>
      </AdminSection>

      <AdminSection title="Daftar Produk" description="Soft delete akan membuat produk tidak tampil di halaman publik.">
        <ProductTable products={products} />
      </AdminSection>
    </div>
  );
}
