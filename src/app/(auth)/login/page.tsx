"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/icone.jpg";
import { loginRequest } from "@/services/login/login";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("johnd");
  const [password, setPassword] = useState("m38rmF$");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);
      await loginRequest(username, password);

      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error: any) {
      console.error("Erro de login:", error);
      const msg =
        error?.response?.data?.message ||
        "Não foi possível fazer login. Verifique suas credenciais.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <Card className="w-full max-w-md shadow-2xl border border-slate-800 bg-[#0a3371]  backdrop-blur-xl rounded-2xl">
          <CardHeader className="space-y-3">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={logo}
                alt="Logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <CardTitle className="text-2xl font-semibold text-white text-center tracking-tight">
                Bem-vindo(a)
              </CardTitle>
              <p className="text-sm text-slate-300 text-center">
                Faça login para acessar o sistema
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="seuusername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-950/70 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-sky-500/70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-950/70 border-slate-700 text-slate-100 placeholder:text-slate-500 pr-10 focus-visible:ring-sky-500/70"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-1 flex items-center justify-center gap-2 bg-[#568f3e] text-slate-950 font-semibold hover:bg-[#29a67a] hover:text-white transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
