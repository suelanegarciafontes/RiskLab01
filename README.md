# RiskLab — versão 100% web e gratuita

Esta versão substitui Flask e SQLite por:

- **GitHub Pages**: hospedagem gratuita do site estático;
- **Supabase Free**: banco PostgreSQL, acesso anônimo e funções de segurança;
- **HTML + CSS + JavaScript**: sem Python, servidor próprio, terminal ou instalação local.

## Publicação sem linha de comando

### 1. Criar o banco gratuito

1. Entre em `supabase.com` e crie um projeto Free.
2. Abra **SQL Editor** → **New query**.
3. Abra o arquivo `supabase_setup.sql`, copie tudo, cole no editor e clique em **Run**.
4. Abra **Authentication → Providers → Anonymous** e habilite **Allow anonymous sign-ins**.
5. Em **Project Settings → API**, copie:
   - Project URL;
   - chave pública `anon` / `publishable`.
6. Abra `config.js` e substitua os dois textos de exemplo pelos valores copiados.

Use somente a chave pública. Nunca coloque `service_role` no site.

### 2. Publicar no GitHub Pages

1. Crie um repositório no GitHub, preferencialmente público para usar Pages gratuitamente.
2. Em **Add file → Upload files**, envie todos os arquivos desta pasta para a raiz do repositório.
3. Confirme em **Commit changes**.
4. Entre em **Settings → Pages**.
5. Em **Source**, escolha **Deploy from a branch**.
6. Selecione `main` e `/ (root)`, depois **Save**.
7. Aguarde o endereço público exibido pelo GitHub, normalmente `https://usuario.github.io/nome-do-repositorio/`.

## Acessos iniciais

- Sala: `RISCO8H`
- Senha do facilitador: `RISKLAB2026`
- Grupos: `GRUPO1`, `GRUPO2`, `GRUPO3`, `GRUPO4`

Troque a senha inicial antes de uso real. No SQL Editor execute:

```sql
update public.rooms
set facilitator_pin_hash = crypt('SUA-NOVA-SENHA', gen_salt('bf'))
where code = 'RISCO8H';
```

## Atualizações

Edite os arquivos diretamente pelo GitHub. Cada commit na branch `main` será publicado automaticamente pelo GitHub Pages.

## Limites e cuidados

A solução usa os planos gratuitos disponíveis no momento da criação. Serviços gratuitos podem alterar limites, suspender projetos inativos ou mudar condições. Exporte os resultados após cada aula e faça cópias periódicas do banco pelo painel do Supabase.
