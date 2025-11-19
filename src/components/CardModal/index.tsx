"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent } from "react";
import { Loader2, UploadCloud } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type ProductFormValues = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type ProductModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: ProductFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormValues) => Promise<void>;
};

const EMPTY_FORM: ProductFormValues = {
  title: "",
  price: 0,
  description: "",
  image: "",
  category: "",
};

export function ProductModal({
  open,
  mode,
  initialData,
  onOpenChange,
  onSubmit,
}: ProductModalProps) {
  const [form, setForm] = useState<ProductFormValues>(
    initialData ?? EMPTY_FORM
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ?? null
  );
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(initialData ?? EMPTY_FORM);
      setImagePreview(initialData?.image ?? null);
      setErrorMessage(null);
    }
  }, [open, initialData]);

  function handleChange(field: keyof ProductFormValues, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: field === "price" ? Number(value) || 0 : value,
    }));
  }

  function processFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Selecione um arquivo de imagem válido.");
      return;
    }

    setErrorMessage(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setForm((prev) => ({
        ...prev,
        image: result, 
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (
      !form.title ||
      !form.price ||
      !form.description ||
      !form.image ||
      !form.category
    ) {
      setErrorMessage("Preencha todos os campos e selecione uma imagem.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);
      await onSubmit(form);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      setErrorMessage("Erro ao salvar produto. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar produto" : "Novo produto"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Atualize as informações do produto."
              : "Preencha as informações para cadastrar um novo produto."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Nome do produto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={form.price || ""}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="Ex: electronics"
            />
          </div>

          <div className="space-y-2">
            <Label>Imagem do produto</Label>

            <div
              onClick={() =>
                document.getElementById("imageFileInput")?.click()
              }
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center gap-2 cursor-pointer text-sm text-muted-foreground hover:border-primary/60 transition-colors"
            >
              <UploadCloud className="w-6 h-6 mb-1" />
              <span>
                <span className="font-medium text-foreground">
                  Clique para selecionar
                </span>{" "}
                ou arraste o arquivo aqui
              </span>

              <Input
                id="imageFileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>

            {imagePreview && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">
                  Imagem selecionada:
                </p>
                <div className="w-24 h-24 rounded-md overflow-hidden border bg-muted flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                handleChange("description", e.target.value)
              }
              placeholder="Descrição do produto"
              rows={3}
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500">{errorMessage}</p>
          )}

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Salvando...
                </>
              ) : isEdit ? (
                "Atualizar"
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
