"use client";

import Image from "next/image";
import { ImagePlus, Link as LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TextInput } from "@/components/admin/form-controls";

export function ProductImageField() {
  const [previewUrl, setPreviewUrl] = useState("/products/deterjen-premium.png");
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  return (
    <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
      <div className="relative aspect-square overflow-hidden rounded-[20px] border border-border bg-light-gray">
        <Image src={previewUrl} alt="Preview gambar produk" fill sizes="140px" className="object-cover" unoptimized={previewUrl.startsWith("blob:")} />
      </div>

      <div className="space-y-3">
        <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[18px] border border-dashed border-slate-300 bg-white px-4 text-sm font-black text-black transition hover:border-accent hover:bg-primary/10">
          <ImagePlus className="size-4 text-accent" aria-hidden="true" />
          Upload Gambar Produk
          <input
            type="file"
            accept="image/*"
            name="productImageFile"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) {
                return;
              }

              if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
              }

              const nextObjectUrl = URL.createObjectURL(file);
              setObjectUrl(nextObjectUrl);
              setPreviewUrl(nextObjectUrl);
            }}
          />
        </label>

        <div className="relative">
          <LinkIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-text" aria-hidden="true" />
          <TextInput
            name="imageUrl"
            defaultValue="/products/deterjen-premium.png"
            className="pl-9"
            onChange={(event) => {
              const nextValue = event.target.value.trim();
              if (nextValue) {
                setPreviewUrl(nextValue);
              }
            }}
          />
        </div>

        <p className="text-xs leading-5 text-muted-text">
          Gunakan URL gambar publik atau pilih file untuk melihat preview produk sebelum disimpan.
        </p>
      </div>
    </div>
  );
}
