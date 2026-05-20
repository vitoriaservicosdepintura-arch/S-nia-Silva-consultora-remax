import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { nome, email, telefone, objetivo } = req.body || {};

    // Validação básica
    if (!nome || (!email && !telefone)) {
        return res.status(400).json({ error: 'Nome e pelo menos um contacto (Email ou Telefone) são obrigatórios.' });
    }

    try {
        // Garantir que a tabela existe (geralmente feito uma vez via script, mas mantemos para segurança e compatibilidade)
        await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        telefone VARCHAR(255),
        objetivo text,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        // Inserir a lead de forma segura (SQL Injection prevented directly by @vercel/postgres tagged templates)
        await sql`
      INSERT INTO leads (nome, email, telefone, objetivo) 
      VALUES (${nome}, ${email}, ${telefone}, ${objetivo})
    `;

        return res.status(200).json({ success: true, message: "Lead recebida e guardada com sucesso!" });
    } catch (error) {
        console.error('Erro a inserir lead no Vercel Postgres:', error);
        return res.status(500).json({ error: 'Erro de Base de Dados' });
    }
}
