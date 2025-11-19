"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TProduct } from "@/types/TProduct";
import Image from "next/image";

type ProductProps = {
  product: TProduct;
  variant?: "list" | "details";
  onView?: (product: TProduct) => void;
  onEdit?: (product: TProduct) => void;
  onDelete?: (product: TProduct) => void;
};

export function ProductCard({
  product,
  variant = "list",
  onView,
  onEdit,
  onDelete,
}: ProductProps) {
  const isDetails = variant === "details";

  const handleView = () => {
    if (onView) return onView(product);
    alert(`Visualizando ${product.title}`);
  };

  const handleEdit = () => onEdit?.(product);
  const handleDelete = () => onDelete?.(product);

  return (
    <Card className="hover:shadow-lg transition-shadow bg-white">
      <CardHeader className="flex flex-row gap-4">
        <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex items-center justify-center shrink-0">
          <Image
            src={product.image}
            width={80}
            height={80}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{product.title}</CardTitle>

            <div className="flex flex-wrap gap-1 justify-end">
              {product.category && (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] uppercase tracking-wide"
                >
                  {product.category}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Preço:</span>{" "}
          {product.price > 0 ? `R$ ${product.price}` : "Grátis"}
        </p>
        <p>
          <span className="font-semibold text-foreground">Descrição:</span>{" "}
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {isDetails ? (
          <>
            <Button
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
              onClick={handleDelete}
            >
              Excluir
            </Button>
            <Button
              variant="outline"
              className="bg-[#33cc99] text-black"
              onClick={handleEdit}
            >
              Editar
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            className="bg-[#33cc99] text-black"
            onClick={handleView}
          >
            Visualizar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
