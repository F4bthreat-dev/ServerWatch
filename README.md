# 🖥️ ServerWatch

**Dashboard de monitoramento de servidor em tempo real**

![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.3.2-000000?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.0-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-3DA639?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Concluído-00C853?style=for-the-badge)

---

## 📋 Índice

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Instalação e Execução](#️-instalação-e-execução)
- [📊 Como Usar](#-como-usar)
- [🔗 API Endpoints](#-api-endpoints)
- [👨‍💻 Autor](#-autor)
- [📄 Licença](#-licença)

---

## 📖 Sobre o Projeto

**ServerWatch** é um dashboard de monitoramento de servidor em tempo real desenvolvido com **Python**, **Flask** e **psutil**. A ferramenta fornece métricas essenciais do sistema como CPU, memória, armazenamento, rede e processos ativos, tudo em uma interface moderna, intuitiva e responsiva.

Este projeto foi desenvolvido por **f4bthreat-dev (Fabriccio "Threatfull")** como parte do meu portfólio para demonstrar habilidades em desenvolvimento full-stack, DevOps e monitoramento de sistemas.

### 🎯 Por Que Este Projeto?

- **Aprendizado prático:** Aplicação de conceitos de Python, Flask e JavaScript em um projeto real
- **Resolução de problemas:** Criar uma ferramenta útil para administradores de sistemas
- **Portfólio profissional:** Demonstrar habilidades técnicas e capacidade de entregar projetos completos

---

## ✨ Funcionalidades

### 📊 Dashboard Principal
- **Atualização automática** a cada 2 segundos
- **Cards informativos** com métricas principais
- **Barras de progresso** com cores (verde, amarelo, vermelho)
- **Animações suaves** para melhor experiência do usuário

### 💻 Monitoramento de CPU
- ✅ Uso total da CPU em porcentagem
- ✅ Número de núcleos disponíveis
- ✅ Frequência atual (MHz)
- ✅ Gráfico histórico dos últimos 60 segundos

### 🧠 Monitoramento de Memória
- ✅ Uso total da memória RAM
- ✅ Memória usada e disponível (GB)
- ✅ Detalhamento em porcentagem
- ✅ Gráfico histórico dos últimos 60 segundos

### 💾 Monitoramento de Armazenamento (Múltiplos Discos)
- ✅ Suporte a **múltiplos discos** (C:, D:, E:, etc.)
- ✅ Soma total de todos os discos
- ✅ Lista individual de cada disco com seu uso
- ✅ Porcentagem de uso por disco
- ✅ Destaque visual (verde, amarelo, vermelho)

### 🌐 Monitoramento de Rede
- ✅ Tráfego enviado (upload) em MB
- ✅ Tráfego recebido (download) em MB
- ✅ Total de pacotes enviados e recebidos
- ✅ Gráfico de tráfego em tempo real

### ⚙️ Monitoramento de Processos
- ✅ Lista dos 10 processos mais ativos
- ✅ Informações: Nome, CPU %, Memória %, Status
- ✅ Status do processo (running, sleeping, stopped)
- ✅ Cores para fácil identificação

### 📈 Gráficos Interativos (Chart.js)
- ✅ 3 gráficos principais: CPU, Memória e Rede
- ✅ Atualização em tempo real
- ✅ Histórico dos últimos 60 segundos
- ✅ Design limpo e profissional

### 🔗 API REST
- ✅ Endpoint `/api/metrics` - Todas as métricas
- ✅ Endpoint `/api/health` - Status do servidor
- ✅ Respostas em JSON para integrações

---

## 🛠️ Tecnologias Utilizadas

### Backend

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **Python** | 3.8+ | Linguagem principal |
| **Flask** | 2.3.2 | Framework web e roteamento |
| **psutil** | 5.9.8 | Coleta de métricas do sistema |

### Frontend

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **HTML5** | - | Estrutura da página |
| **CSS3** | - | Estilização personalizada |
| **JavaScript** | ES6 | Lógica do frontend |
| **Chart.js** | 4.4.0 | Gráficos interativos |
| **Bootstrap** | 5.3.0 | Design responsivo |
| **Font Awesome** | 6.4.0 | Ícones e elementos visuais |

---

## 📂 Estrutura do Projeto

ServerWatch/
│
├── app.py # Aplicação principal (Flask + API)
├── requirements.txt # Dependências do Python
├── README.md # Documentação do projeto
├── LICENSE # Licença MIT
├── .gitignore # Arquivos ignorados pelo Git
│
├── static/ # Arquivos estáticos (frontend)
│ ├── css/
│ │ └── style.css # Estilos personalizados
│ └── js/
│ └── dashboard.js # Lógica do frontend (AJAX + Chart.js)
│
├── templates/
│ └── index.html # Interface principal do dashboard
│
└── images/ # Screenshots do projeto (opcional)
└── dashboard.png

---

## ⚙️ Instalação e Execução

### 📋 Pré-requisitos

- **Python 3.8 ou superior**
- **Git** (opcional, para clonar)
- **Navegador** (Chrome, Firefox, Edge)

### 🔧 Passo a Passo

#### 1. Clone o repositório

git clone https://github.com/F4bthreat-dev/ServerWatch.git
cd ServerWatch

2. Crie um ambiente virtual

# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate

3. Instale as dependências

pip install -r requirements.txt

4. Execute a aplicação

http://localhost:5000

📊 Como Usar
🖥️ Dashboard
Acesse: http://localhost:5000

Visualize: Todas as métricas atualizando automaticamente

Analise: Gráficos mostram histórico dos últimos 60 segundos

Monitore: Processos mais ativos do sistema

🔗 API REST

O ServerWatch oferece endpoints RESTful:

- **GET /api/metrics** - Retorna todas as métricas do sistema em JSON
- **GET /api/health** - Verifica o status do servidor

**Exemplo:**
```bash
curl http://localhost:5000/api/metrics


👨‍💻 Autor
Fabriccio "Threatfull"

GitHub: @F4bthreat-dev



📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.


## ServerWatch

## Agradecimentos

- Flask - https://flask.palletsprojects.com/
- psutil - https://github.com/giampaolo/psutil
- Chart.js - https://www.chartjs.org/
- Bootstrap - https://getbootstrap.com/
- Font Awesome - https://fontawesome.com/

Agradecimentos especiais à comunidade open-source por disponibilizar essas ferramentas incríveis!

Desenvolvido com ❤️ por f4bthreat-dev (Fabriccio "Threatfull")

⭐ Se você gostou, dê uma estrela no GitHub! ⭐
