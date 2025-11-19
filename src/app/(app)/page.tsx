"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, Plus } from "lucide-react";
import { ProductCard } from "@/components/Card";
import { getAllProducts } from "@/services/products/getAll";
import type { TProduct } from "@/types/TProduct";
import { Button } from "@/components/ui/button";
import { ProductFormValues, ProductModal } from "@/components/CardModal";
import { createProduct } from "@/services/products/create";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState<TProduct[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [createOpen, setCreateOpen] = useState(false);
  const router = useRouter();

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await getAllProducts();
      const data = res?.data || [];
      setProducts(data);
      toast.success("Produtos carregados com sucesso");
    } catch (error) {
      toast.error("Erro ao buscar produtos");
      console.error("Erro ao buscar produtos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleCreateSubmit(data: ProductFormValues) {
    try {
      const newProduct = await createProduct(data);
      setProducts((prev) => (prev ? [newProduct, ...prev] : [newProduct]));
      toast.success("Produto criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto");
      throw error;
    }
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ProductModal
        open={createOpen}
        mode="create"
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateSubmit}
      />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-end mb-4">
          <Button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 bg-[#568f3e] text-black hover:opacity-90"
            type="button"
          >
            <Plus className="w-4 h-4" />
            Adicionar produto
          </Button>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
            <span className="text-sm">Carregando produtos...</span>
          </div>
        ) : products?.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="list"
                onView={(p) => router.push(`/product/${p.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
