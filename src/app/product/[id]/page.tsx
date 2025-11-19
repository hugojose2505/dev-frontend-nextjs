"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";

import { TProduct } from "@/types/TProduct";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { ProductCard } from "@/components/Card";
import { getProductById } from "@/services/products/getById";
import { ProductModal } from "@/components/CardModal";
import { updateProduct } from "@/services/products/update";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { deleteProduct } from "@/services/products/delete";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        toast.error("Erro ao buscar produto");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);
  async function handleDelete(product: TProduct) {
    await deleteProduct(product.id);
    toast.success(`Produto ${product.title} excluído`);
    setDeleting(false);
    router.push("/");
  }

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
        <Toaster position="top-right" />
        <Loader2 className="h-10 w-10 animate-spin mb-2" />
        <span>Carregando produto...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 space-y-4">
        <Toaster position="top-right" />
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <p className="text-muted-foreground">Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <Toaster position="top-right" />

      <Button
        variant="outline"
        className="mb-4"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <ProductCard
        product={product}
        variant="details"
        onDelete={() => setDeleting(true)}
        onEdit={() => setEditing(true)}
      />
      {editing && (
        <ProductModal
          open={editing}
          mode="edit"
          initialData={product}
          onOpenChange={setEditing}
          onSubmit={async (data) => {
            await updateProduct(product.id, data);
            toast.success(`(Mock) Produto ${data.title} atualizado`);
            setEditing(false);
          }}
        />
      )}
      {deleting && (
        <Dialog open={deleting} onOpenChange={setDeleting}>
          <DialogContent>
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Confirmar exclusão</h2>
              <p>Tem certeza que deseja excluir o produto {product.title}?</p>
              <div className="flex justify-end gap-2">
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => handleDelete(product)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
