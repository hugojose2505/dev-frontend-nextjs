"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, User as UserIcon, MapPin, Plus } from "lucide-react";
import { getAllUsers } from "@/services/users/getAll";
import type { TUser } from "@/types/TUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserModal } from "@/components/UserModal";
import { createUser } from "@/services/users/create";
import { updateUser } from "@/services/users/update";
import { deleteUser } from "@/services/users/delete";

export default function UsersPage() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] =
    useState<TUser | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const data = await getAllUsers();
        setUsers(data);
        toast.success("Usuários carregados com sucesso");
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao buscar usuários");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  function handleEdit(user: TUser) {
    setSelectedUser(user);
    setEditOpen(true);
  }

  function handleDelete(user: TUser) {
    setSelectedUserForDelete(user);
    setDeleteOpen(true);
  }
  async function handleConfirmDelete() {
    if (!selectedUserForDelete) return;

    try {
      setLoading(true);
      await deleteUser(selectedUserForDelete.id);
      setUsers((prev) =>
        prev.filter((user) => user.id !== selectedUserForDelete.id)
      );
      toast.success(`Usuário ${selectedUserForDelete.username} excluído`);
      setDeleteOpen(false);
      setSelectedUserForDelete(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
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
            <Loader2 className="h-10 w-10 animate-spin mb-2" />
            <span className="text-sm">Carregando usuários...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            Nenhum usuário encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card
                key={user.id}
                className="hover:shadow-md transition-shadow bg-white"
              >
                <CardHeader className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1">
                    <CardTitle className="text-base">{user.username}</CardTitle>
                  </div>

                  <Badge variant="outline" className="text-[10px]">
                    ID: {user.id}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">
                      E-mail:
                    </span>{" "}
                    {user.email}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Senha:
                    </span>{" "}
                    {user.password}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(user)}
                    >
                      Excluir
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-[#568f3e] text-black"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </Button>
                  </>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <UserModal
        open={createOpen}
        mode="create"
        onOpenChange={setCreateOpen}
        onSubmit={async (data) => {
          await createUser(data);
          toast.success("Usuário criado com sucesso");
          setCreateOpen(false);
        }}
      />

      {selectedUser && (
        <UserModal
          open={editOpen}
          mode="edit"
          initialData={selectedUser}
          onOpenChange={setEditOpen}
          onSubmit={async (data) => {
            await updateUser(selectedUser.id, data);
            toast.success(`Usuário ${data.username} atualizado com sucesso`);
            setEditOpen(false);
          }}
        />
      )}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUserForDelete
                ? `Tem certeza que deseja excluir o usuário "${selectedUserForDelete.username}"? Essa ação não pode ser desfeita.`
                : "Tem certeza que deseja excluir este usuário? Essa ação não pode ser desfeita."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
