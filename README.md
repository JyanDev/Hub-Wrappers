# JyanWrappers Hub

![Versão](https://img.shields.io/badge/versão-1.0-blue)
![Linguagem](https://img.shields.io/badge/linguagem-C%23-blueviolet)
![Framework](https://img.shields.io/badge/framework-WPF%20%7C%20.NET%208-orange)
![Licença](https://img.shields.io/badge/licença-MIT-green)

Um hub de produtividade para centralizar seus aplicativos web e fluxos de trabalho em um único lugar, com estilo e personalização.

![Demo do JyanWrappers Hub](https://github.com/user-attachments/assets/9f168bb4-0c3d-4d1d-a5d4-d8813cf8e5a7
)  

## 🚀 Sobre o Projeto

Em um mundo com dezenas de serviços web para trabalho e vida pessoal (Google, Firebase, Ferramentas de IA, etc.), alternar entre abas e contas pode se tornar caótico. O **JyanWrappers Hub** nasceu da necessidade de organizar esse fluxo de trabalho, criando um painel de controle centralizado onde cada serviço web se torna um "aplicativo" independente, com suas próprias sessões de login isoladas.

Este projeto foi construído do zero utilizando C# e WPF no .NET 8, com foco em uma experiência de usuário moderna, responsiva e esteticamente agradável.

## ✨ Funcionalidades Principais

* **Gerenciamento de Wrappers:** Adicione qualquer website como um wrapper, transformando-o em um aplicativo dentro do Hub.
* **Perfis de Sessão Isolados:** Crie perfis separados (ex: "Trabalho", "Pessoal", "Estudos") para manter logins, cookies e dados de cada serviço completamente independentes.
* **Ícones Customizáveis:** Personalize cada wrapper com seu próprio ícone. O sistema aceita e processa automaticamente arquivos **.png** e **.svg** para uma qualidade visual perfeita.
* **Interface Moderna e Customizável:**
    * Janela sem bordas com um design "vidro fume" semitransparente.
    * Animações sutis e profissionais em todos os botões e elementos interativos.
    * Controles de janela avançados, como maximização para a área de trabalho e redimensionamento via atalhos.
* **Feedback Sonoro Dinâmico:**
    * Efeitos sonoros para cliques e hovers, proporcionando uma experiência tátil.
    * Um "soundscape" ambiente na tela de boas-vindas, com a opção de ser silenciado (`Ctrl+Shift+M`).
* **Gerenciamento de Dados Robusto:**
    * Os dados do usuário (perfis, lista de wrappers) são salvos de forma segura na pasta `%AppData%`, seguindo as melhores práticas do Windows.
    * Uma função de "Reset de Fábrica" para limpar todos os dados do usuário de forma segura.
* **Instalador Profissional:** O aplicativo é distribuído com um instalador criado com Inno Setup, que lida com as permissões de administrador e cria atalhos.

## 🛠️ Pilha Tecnológica (Technology Stack)

* **Linguagem:** C#
* **Framework:** WPF (Windows Presentation Foundation) sobre .NET 8
* **Componente Web:** Microsoft WebView2
* **Processamento de Imagem:** SharpVectors (para SVG), SixLabors.ImageSharp (para PNG, JPG, etc.)
* **Instalador:** Inno Setup

## 🏁 Começando

Para usar o JyanWrappers Hub:

1.  Vá para a seção de [**Installer**](https://github.com/JyanDev/Hub-Wrappers/tree/main/Installer) deste repositório.
    2.  Baixe o arquivo de instalação `JyanWrappers_Hub_Setup_v1.0.exe`.
3.  Execute o instalador. Ele pode pedir permissão de administrador para instalar na pasta de Programas.

## 📖 Como Usar

1.  **Criar um Perfil:** Antes de mais nada, crie um perfil (ex: "Google Pessoal") usando o botão "Novo Perfil". Wrappers sempre precisam de um perfil para armazenar seus dados.
2.  **Criar um Wrapper:** Clique em "Criar Wrapper", dê um nome, cole a URL do site desejado e selecione um ícone (PNG ou SVG).
3.  **Lançar:** Com um perfil selecionado no seletor do topo, clique no ícone do wrapper que você criou no menu lateral para abri-lo.
4. **Dica:** Após o primeiro login em um wrapper sua conta ficara salva no perfil selecionado/criado e será usada na inicialização dos wrappers até que altere ou crie um novo perfil e refaça o procedimento.

## 🗺️ Roadmap (Ideias para o Futuro)

Este projeto tem uma base sólida com muito potencial para crescer. Algumas ideias para o futuro incluem:

* [ ] **Lançador de Executáveis Locais:** Adicionar a capacidade de criar "wrappers" para programas `.exe` locais, tornando o Hub um painel de controle completo para o trabalho.
* [ ] **Temas Customizáveis:** Permitir que o usuário troque o "wallpaper" de fundo e as cores do "vidro fume".
* [ ] **Reordenação de Wrappers:** Permitir arrastar e soltar os ícones no menu lateral para reordená-los.

## 🤝 Contribuindo

Este é um projeto de portfólio pessoal, mas sugestões e discussões são sempre bem-vindas! Sinta-se à vontade para abrir uma "Issue" para relatar um bug ou sugerir uma nova funcionalidade.

## 👨‍💻 Autor

* **JyanDev**
    * GitHub: [@JyanDev](https://github.com/JyanDev)
    * LinkedIn: [Seu Perfil no LinkedIn](https://www.linkedin.com/in/jyan-silva) 
    ---

