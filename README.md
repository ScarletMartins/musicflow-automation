# MusicFlow Automation

**MusicFlow Automation** é uma aplicação web desenvolvida como parte do Projeto Integrador, voltada para a automação de processos internos. A ferramenta permite o gerenciamento de execuções agendadas, visualização de histórico, e envio de alertas automáticos por e-mail.

---

## 🎯 Objetivo

Oferecer uma interface web simples e funcional para controle de processos automatizados, com foco em:

- Registro de processos
- Agendamento de execuções
- Disparo automático via cron
- Notificação por e-mail
- Visualização em histórico

---

### 📁 Repositório Git

Este repositório contém o código-fonte do backend e frontend, além dos arquivos de configuração de deploy e CI/CD.  
Atenção: o repositório foi tornado público temporariamente apenas para fins de avaliação da disciplina.

---

### 🔗 Acesso à Aplicação

- **Frontend (Vercel)**: [https://musicflow-automation.vercel.app/](https://musicflow-automation.vercel.app/)  
- **Backend (Render API)**: [https://musicflow-backend.onrender.com/api/](https://musicflow-backend.onrender.com/api/)

---

### 👤 Acesso de Validação

- O cadastro está aberto. Acesse `/register` no frontend para criar um usuário.
- Ou, se preferir, utilize um login de teste:
  - **Usuário:** `admin`
  - **Senha:** `admin@2232`

---

### 📧 Teste com Notificação por E-mail

O professor pode:
- Criar um processo com **execução agendada para 1 a 2 minutos no futuro**
- O sistema disparará automaticamente a execução simulada
- Será enviado um **e-mail com a notificação da execução**
- A execução poderá ser consultada em tempo real na **tela de Histórico**

> Isso simula o funcionamento real de um agendador de tarefas automatizadas com feedback por e-mail.

---

## 📦 Estrutura do Projeto

### Backend (Django + DRF)
- Local: `backend/`
- API REST protegida com JWT
- Banco de dados PostgreSQL (Render)
- Scripts agendados com cronjob (cron-job.org)
- Configurações por variáveis de ambiente (`python-decouple`)

### Frontend (React + Vite)
- Local: `frontend/`
- Estilizado com Tailwind CSS
- Autenticação integrada com backend
- Interface responsiva com suporte a dark mode
- Hospedagem no Vercel

---

## 🔁 Pipeline CI/CD

- **Backend (Render)**: deploy contínuo via `render.yaml`
- **Frontend (Vercel)**: deploy automático com push na branch principal
- **Execuções agendadas**: disparadas por [cron-job.org](https://cron-job.org)

---

## ☁️ Infraestrutura em Nuvem

| Componente         | Plataforma        |
|--------------------|-------------------|
| Backend (API)      | Render            |
| Frontend (SPA)     | Vercel            |
| Banco de Dados     | PostgreSQL (Render) |
| Agendamento        | cron-job.org      |

---

## 📌 Requisitos Atendidos

- Acesso via navegador com layout responsivo
- Backend com persistência relacional (PostgreSQL)
- CI/CD funcionando com publicação automática
- Variáveis de ambiente isoladas
- Cadastro de usuários, login, e ciclo completo de autenticação
- Logs e notificações enviados por e-mail
- Tela de CRUD completo para processos
- Funcionalidade mestre-detalhe: processo com execuções relacionadas
- Execução programada de processos com alertas

---

## 📧 Contato para Validação

- Todas as URLs e cadastros estão públicos para validação.

---

## ✅ Observação Final

O repositório foi revisado para não conter nenhuma informação sensível exposta. Os dados foram removidos do histórico e A variáveis reais estão configuradas diretamente nas plataformas (Render/Vercel).

