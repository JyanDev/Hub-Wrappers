# Hub-Wrappers: The Evolution (V1 -> V2)

![Status](https://img.shields.io/badge/Status-Refatoração_Total-yellow)
![Tech Stack Atual](https://img.shields.io/badge/V1-C%23_WPF_.NET-blueviolet)
![Next Gen](https://img.shields.io/badge/V2-Python_PyWebView_Vue-green)

> 🚧 **Nota:** Este projeto está passando por uma reescrita arquitetural completa. A versão legada (V1 em C#) está disponível abaixo, mas o desenvolvimento ativo está focado na V2 (Python).

---

## 🔮  Visão da V2:
**Foco:** Performance, UX Fluida e Arquitetura Desacoplada.

Decidi migrar de uma arquitetura monolítica Desktop (WPF) para uma solução híbrida moderna para resolver problemas de consumo de memória e escalabilidade de interface.

### O Que Está Por Vir (Roadmap V2)
* **Mecânica "Drop-to-Create":**  A V2 permitirá arrastar uma aba do navegador para o Hub, usando **Web Scraping (Python)** para detectar automaticamente o nome, ícone e URL correta.
* **Arquitetura Híbrida Leve:** Substituição do motor pesado do C# por um Backend Python gerenciando processos e um Frontend leve (HTML/Vue.js) via `pywebview`.
* **Workspaces:** Organização em grade e pastas, abandonando a lista lateral infinita da V1.

---

## 🏛️ V1: A Versão Legada (.NET/WPF)
*(Abaixo encontra-se a documentação da versão estável original)*

Um hub de produtividade para centralizar aplicativos web, isolando sessões de login e organizando o fluxo de trabalho.

### 🚀 Sobre o Projeto (V1)
O **Hub-Wrappers V1** nasceu para resolver o caos de abas e o alto consumo de RAM dos navegadores convencionais. Ele transforma sites em "aplicativos" isolados.

**Destaques Técnicos da V1:**
* **Arquitetura:** Cliente Desktop Nativo (WPF) + API RESTful (ASP.NET Core).
* **Isolamento:** Gestão de perfis de usuário com cookies separados fisicamente.
* **Interface:** Design "Vidro Fumê" com animações WPF nativas.

### 🛠️ Pilha Tecnológica (V1 Legacy)
* **Cliente:** C# / WPF / .NET 8 / WebView2.
* **Servidor:** ASP.NET Core (API de Autenticação).
* **Dados:** Persistência em memória e JSON.

### 🖼️ Galeria (V1)
![Demo do Hub-Wrappers V1](https://github.com/user-attachments/assets/d496472e-7ba0-4cd7-aa49-3396d57ac10e)

---

## 👨‍💻 Autor & Evolução
Desenvolvido por **JyanDev**.
Acompanhe a refatoração para Python neste repositório.
* [LinkedIn](https://linkedin.com/in/jyan-jagielo)