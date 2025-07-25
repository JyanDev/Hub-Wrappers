# Hub-Wrappers 2.0: Cloud-Connected

![Versão](https://img.shields.io/badge/versão-2.0-blue)
![Linguagem](https://img.shields.io/badge/linguagem-C%23-blueviolet)
![Framework](https://img.shields.io/badge/framework-WPF%20%7C%20.NET%208-orange)
![Licença](https://img.shields.io/badge/licença-MIT-green)

Um hub de produtividade para centralizar seus aplicativos web e fluxos de trabalho, agora com funcionalidades online através de uma API dedicada em ASP.NET Core.

![Demo do Hub-Wrappers com Login](https://github.com/user-attachments/assets/d496472e-7ba0-4cd7-aa49-3396d57ac10e)

## 🚀 Sobre o Projeto

O **Hub-Wrappers** nasceu da necessidade de organizar o fluxo de trabalho digital, transformando serviços web em "aplicativos" independentes com sessões de login isoladas para resolver o caos de abas e o alto consumo de RAM dos navegadores.

Nesta nova versão, o projeto evoluiu para uma **arquitetura cliente-servidor completa**. Além de todas as funcionalidades locais, o Hub-Wrappers agora se conecta a uma **API RESTful construída com C# e ASP.NET Core**, preparando o terreno para que os dados e perfis dos usuários sejam salvos na nuvem e acessíveis de qualquer lugar.


## 🏁 Começando

Para usar o JyanWrappers Hub:

1.  Vá para a seção de [**Installer**](https://github.com/JyanDev/Hub-Wrappers/tree/main/Installer) deste repositório.
    2.  Baixe o arquivo de instalação `Hub_Wrappers_v1.1.exe`.
3.  Execute o instalador. Ele pode pedir permissão de administrador para instalar na pasta de Programas.
4. Após iniciar o `Hub Wrapper` entre no modo anônimo, pois a API está inativa e em desenvolvimento.

## ✨ Funcionalidades Principais

### Cliente (Hub-Wrappers - WPF)
* **Gerenciamento de Wrappers:** Adicione qualquer website como um wrapper, transformando-o em um aplicativo dentro do Hub.
* **Perfis de Sessão Locais:** Crie perfis separados (ex: "Trabalho", "Pessoal") para manter logins e cookies completamente independentes.
* **Ícones Customizáveis:** Personalize cada wrapper com ícones `.png` ou `.svg`, processados para qualidade visual perfeita.
* **Interface Moderna:** Design "vidro fume", animações sutis, controles de janela avançados e feedback sonoro dinâmico.
    * Janela sem bordas com um design "vidro fume" semitransparente.
    * Animações sutis e profissionais em todos os botões e elementos interativos.
    * Controles de janela avançados, como maximização para a área de trabalho e redimensionamento via atalhos (`Ctrl+Shift+Seta` ou `Ctrl+Shift+Menos/Mais`).
* **Feedback Sonoro Dinâmico:**
    * Efeitos sonoros para cliques e hovers, proporcionando uma experiência tátil.
    * Um "soundscape" ambiente na tela de boas-vindas, com a opção de ser silenciado (`Ctrl+Shift+M`).
* **Instalador Profissional:** Distribuído com um instalador Inno Setup para uma experiência de instalação nativa no Windows.


### Nova Arquitetura Online (Comunicação com a API)
* **Sistema de Autenticação:** A interface de login agora se comunica com a API para registrar novos usuários e autenticar logins existentes.
* **Comunicação Segura:** O cliente lê as mensagens de erro e sucesso diretamente da API, garantindo que as regras de validação (ex: força da senha, email já existente) sejam centralizadas no servidor.
* **Verificação de Status da API:** O aplicativo verifica ativamente se o servidor está online antes de habilitar as funcionalidades de login, oferecendo um modo "Anônimo (Offline)" como alternativa.

## 🛠️ Pilha Tecnológica (Technology Stack)

* **Cliente (Hub-Wrappers):**
    * **Linguagem:** C#
    * **Framework:** WPF (Windows Presentation Foundation) sobre .NET 8
    * **Comunicação HTTP:** `HttpClient`
    * **Componente Web:** Microsoft WebView2
    * **Processamento de Imagem:** SharpVectors, SixLabors.ImageSharp
* **Servidor (GameAPI):**
    * **Framework:** ASP.NET Core
    * **Linguagem:** C#
    * **Funcionalidades:** Endpoints RESTful para registro e login com validação de dados (Regex).
    * **Persistência (Em Desenvolvimento):** Atualmente utiliza uma lista em memória, com a arquitetura pronta para migração para um banco de dados com Entity Framework Core.

## 🗺️ Roadmap (Próximos Passos)

* [X] **Construir API de Autenticação (Registro e Login).** `(Concluído)`
* [X] **Integrar o cliente Hub-Wrappers com a API.** `(Concluído)`
* [ ] **Implementar Persistência de Dados:** Migrar o armazenamento de usuários da API de uma lista em memória para um banco de dados (SQLite com Entity Framework Core).
* [ ] **Salvar Wrappers na Nuvem:** Fazer com que a lista de wrappers e perfis de um usuário seja salva e recuperada através da API, tornando as configurações do usuário portáteis.
* [ ] **Lançador de Executáveis Locais:** Adicionar a capacidade de criar "wrappers" para programas `.exe` locais.

## 🤝 Contribuindo

Este é um projeto de portfólo pessoal, mas sugestões e discussões são sempre bem-vindas! Sinta-se à vontade para abrir uma "Issue" para relatar um bug ou sugerir uma nova funcionalidade.

## 👨‍💻 Autor

* **JyanDev**
    * GitHub: [@JyanDev](https://github.com/JyanDev)
    * LinkedIn: [Jyan Jagielo](https://www.linkedin.com/in/jyan-jagielo)