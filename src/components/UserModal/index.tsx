"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Loader2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";

export type UserFormValues = {
  email: string;
  username: string;
  password: string;
};

type UserModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: UserFormValues;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormValues) => Promise<void>;
};

const EMPTY_FORM: UserFormValues = {
  email: "",
  username: "",
  password: "",
};

export function UserModal({
  open,
  mode,
  initialData,
  onOpenChange,
  onSubmit,
}: UserModalProps) {
  const [form, setForm] = useState<UserFormValues>(initialData ?? EMPTY_FORM);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(initialData ?? EMPTY_FORM);
      setErrorMessage(null);
    }
  }, [open, initialData]);

  function handleChange(field: keyof UserFormValues, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.email || !form.username || !form.password) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);
      await onSubmit(form);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      setErrorMessage("Erro ao salvar usuário. Tente novamente.");
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
            {isEdit ? "Editar usuário" : "Novo usuário"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Atualize as informações do usuário."
              : "Preencha as informações para cadastrar um novo usuário."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email do usuário"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              placeholder="Nome de usuário"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Senha do usuário"
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
