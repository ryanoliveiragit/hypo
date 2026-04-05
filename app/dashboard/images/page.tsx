"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { Upload, Copy, Trash2, Image as Img, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const mock = [
  { id: 1, name: "avatar.png",            size: "128 KB", url: "https://hypo.to/i/a1b2c3", date: "2d atrás" },
  { id: 2, name: "banner.jpg",            size: "340 KB", url: "https://hypo.to/i/d4e5f6", date: "5d atrás" },
  { id: 3, name: "project-screenshot.png",size: "512 KB", url: "https://hypo.to/i/g7h8i9", date: "1sem atrás" },
];

export default function ImagesPage() {
  const [images, setImages] = useState(mock);
  const [copied, setCopied] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const copy = (id: number, url: string) => {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const used = 0.98;
  const total = 1024;

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <p className="label-mono mb-1">Image Host</p>
        <h1 className="heading text-2xl text-[#c0c0c0]">Imagens hospedadas</h1>
      </div>

      {/* Storage */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#888]">Armazenamento</span>
          <span className="text-xs font-mono text-[#555]">{used} MB / 1 GB</span>
        </div>
        <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(used / total) * 100}%` }}
            transition={{ duration: 0.6, ease: [0, 0, 0.4, 1] as const }}
            className="h-full bg-[#cc1111] rounded-full"
          />
        </div>
        <p className="text-xs text-[#555] font-mono mt-1.5">{(total - used).toFixed(0)} MB livres</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-[var(--radius)] p-10 text-center cursor-pointer transition-all duration-150 ${
          dragging
            ? "border-[#cc1111] bg-[rgba(204,17,17,0.04)]"
            : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)]"
        }`}
      >
        <input ref={inputRef} type="file" className="hidden" accept="image/*" multiple />
        <Upload className="w-5 h-5 text-[#555] mx-auto mb-3" />
        <p className="text-sm text-[#888]">
          Arraste ou{" "}
          <span className="text-[#cc1111]">clique para selecionar</span>
        </p>
        <p className="text-xs text-[#555] mt-1 font-mono">PNG, JPG, WebP — máx. 10 MB</p>
      </div>

      {/* List */}
      <div className="divide-y divide-[rgba(255,255,255,0.06)]">
        {images.map((img) => (
          <div key={img.id} className="flex items-center gap-3 py-3">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center shrink-0">
              <Img className="w-4 h-4 text-[#555]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#c0c0c0] truncate">{img.name}</p>
              <p className="text-xs text-[#555] font-mono">{img.size} · {img.date}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => copy(img.id, img.url)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono border border-[rgba(255,255,255,0.08)] text-[#888] hover:text-[#c0c0c0] hover:border-[rgba(255,255,255,0.16)] transition-all"
              >
                {copied === img.id
                  ? <><CheckCircle className="w-3 h-3 text-[#ff4444]" /> Copiado</>
                  : <><Copy className="w-3 h-3" /> URL</>
                }
              </button>
              <button
                onClick={() => setImages(images.filter((i) => i.id !== img.id))}
                className="p-1 text-[#555] hover:text-[#ff6b6b] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="py-12 text-center">
          <Img className="w-8 h-8 text-[#333] mx-auto mb-3" />
          <p className="text-sm text-[#555]">Nenhuma imagem hospedada.</p>
        </div>
      )}
    </div>
  );
}
