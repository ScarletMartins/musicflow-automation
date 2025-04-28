![CI/CD](https://github.com/ScarletMartins/musicflow-automation/actions/workflows/ci-cd.yml/badge.svg)
![Vercel](https://img.shields.io/badge/deploy-vercel-blue?logo=vercel)
![Render](https://img.shields.io/badge/deploy-render-blue?logo=render)
![Python](https://img.shields.io/badge/python-3.12-blue?logo=python)

# MusicFlow Automation

**MusicFlow Automation** é uma aplicação web desenvolvida como parte do Projeto Integrador, voltada para a automação de processos internos. A ferramenta permite o gerenciamento de execuções agendadas, visualização de histórico, execução de scripts reais, e envio de alertas automáticos por e-mail.

---

## 🎯 Objetivo

Oferecer uma interface web simples e funcional para controle de processos automatizados, com foco em:

- Registro de processos
- Agendamento de execuções
- Disparo automático via cron
- Execução real de comandos no servidor
- Notificação por e-mail
- Visualização em histórico

---

## 🤖 Funcionalidade de Inteligência Artificial

- Integração com o **Dialogflow Messenger** para atendimento automático no frontend.
- Chatbot configurado para orientar usuários sobre a criação, edição e inativação de processos.
- Intents personalizadas criadas no Dialogflow para atender às dúvidas frequentes dos usuários.
- Mensagem de boas-vindas configurada e fallback amigável para melhorar a experiência de conversação.
- Integração feita diretamente no frontend utilizando React + Vite, sem necessidade de backend intermediário.

> O chatbot atende diretamente no canto inferior direito da aplicação e está disponível nas página principais.

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
- Criar um processo com **execução agendada para 1 a 2 minutos no futuro**.
- O sistema disparará automaticamente a execução simulada.
- Será enviado um **e-mail com a notificação da execução**.
- A execução poderá ser consultada em tempo real na **tela de Histórico**.

> Isso simula o funcionamento real de um agendador de tarefas automatizadas com feedback por e-mail.

---

## 📦 Estrutura do Projeto

### Backend (Django + DRF)
- Local: `backend/`
- API REST protegida com JWT
- Banco de dados PostgreSQL (Render)
- Scripts agendados com cronjob (cron-job.org)
- Execução real de comandos com subprocess
- Configurações por variáveis de ambiente (`python-decouple`)

### Frontend (React + Vite)
- Local: `frontend/`
- Estilizado com Tailwind CSS
- Autenticação integrada com backend
- Interface responsiva com suporte a dark mode
- Hospedagem no Vercel

---

## 🔁 Pipeline CI/CD

- **GitHub Actions**: execução automática de testes backend (`python manage.py test`) em cada `push` ou `pull request` na branch principal (`main`).
- **Backend (Render)**: deploy contínuo via `render.yaml`.
- **Frontend (Vercel)**: deploy automático com push na branch principal.
- **Execuções agendadas**: disparadas por [cron-job.org](https://cron-job.org).

---

## ☁️ Infraestrutura em Nuvem

| Componente         | Plataforma           |
|--------------------|-----------------------|
| Backend (API)      | Render                 |
| Frontend (SPA)     | Vercel                 |
| Banco de Dados     | PostgreSQL (Render)    |
| Agendamento        | cron-job.org           |
| CI/CD              | GitHub Actions         |

---

## 📌 Requisitos Atendidos

- Acesso via navegador com layout responsivo
- Backend com persistência relacional (PostgreSQL)
- CI/CD funcionando com testes automatizados e publicação contínua
- Variáveis de ambiente isoladas
- Cadastro de usuários, login, e ciclo completo de autenticação
- Logs e notificações enviados por e-mail
- Tela de CRUD completo para processos
- Funcionalidade mestre-detalhe: processo com execuções relacionadas
- Execução programada de processos com alertas
- Execução real de comandos do sistema via agendamento

---

## 📧 Contato para Validação

- Todas as URLs e cadastros estão públicos para validação.

---

## ✅ Observação Final

O repositório foi revisado para não conter nenhuma informação sensível exposta.  
As variáveis reais estão configuradas diretamente nas plataformas (Render/Vercel).
