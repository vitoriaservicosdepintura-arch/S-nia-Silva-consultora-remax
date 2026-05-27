import { useState } from "react";

export default function TestLeads() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [response, setResponse] = useState<string | null>(null);

    const testApi = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponse("A carregar...");
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, telefone, objetivo: "Teste Interno" }),
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error: any) {
            setResponse("Erro: " + error.message);
        }
    };

    return (
        <div className="min-h-screen pt-32 px-5 bg-slate-50 flex justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-slate-800">Testar API de Leads (/api/leads)</h1>

                <form onSubmit={testApi} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
                    <input
                        type="text" required placeholder="Nome Completo" value={nome} onChange={e => setNome(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2" />
                    <input
                        type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2" />
                    <input
                        type="text" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2" />

                    <button type="submit" className="bg-[#0057A8] text-white py-2 rounded-lg mt-2 font-semibold">
                        Enviar Lead Teste
                    </button>
                </form>

                {response && (
                    <div className="mt-8">
                        <h2 className="text-sm font-semibold text-slate-500 mb-2">Resposta da Vercel Postgres:</h2>
                        <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto text-sm">{response}</pre>
                    </div>
                )}

                <div className="mt-4 text-center">
                    <a href="/" className="text-[#009FE3] hover:underline text-sm">Voltar ao site</a>
                </div>
            </div>
        </div>
    );
}
