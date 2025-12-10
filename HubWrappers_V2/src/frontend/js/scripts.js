let pastaAtualId = null; // Memória de curto prazo para saber onde estamos
let wrapperAlvoMenu = null; // Guarda qual wrapper foi clicado com botão direito

async function testarConexao() {

            const resposta = await window.pywebview.api.testar_conexao("Jyan");
            document.getElementById('resposta').innerText = resposta;
        }
// ---SCROLL HORIZONTAL NO HEADER ---
const containerWrappers = document.getElementById('wrapper-list-ui');

containerWrappers.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    containerWrappers.scrollLeft += evt.deltaY; // Move horizontalmente com a roda vertical
});

window.addEventListener('pywebviewready', async function() {
    console.log("PyWebView está pronto!");
    await carregarPastas();

    // Inicializa a organização das pastas (Sidebar)
    const listaPastas = document.getElementById('folder-list-ui');
    new Sortable(listaPastas, {
        animation: 150,
        ghostClass: 'sortable-ghost', // Classe aplicada ao item sendo arrastado (transparente)
        onEnd: function (evt) {
            console.log("Nova ordem das pastas detectada!");
            // Futuramente: Salvar nova ordem no Python
        }
    });

    // Configura o clique global para fechar o menu de contexto
    document.addEventListener('click', fecharMenuContexto);
});

// --- LISTAGEM DE PASTAS (SIDEBAR) ---
async function carregarPastas() {
    const listaUI = document.getElementById('folder-list-ui');
    const pastas = await window.pywebview.api.listar_pastas();

    listaUI.innerHTML = '';

    pastas.forEach((pasta, index) => {
        const li = document.createElement('li');
        li.className = 'folder-item';
        li.innerHTML = `<span>📂</span> ${pasta.name}`;

        // Clique Direito na Pasta
        li.oncontextmenu = (e) => {
            e.preventDefault();
            // Reutiliza a lógica do menu, passando o tipo 'pasta'
            abrirMenuContexto(e, pasta.id, 'pasta');
        };

        // Clique: Seleciona e carrega wrappers
        li.onclick = () => selecionarPasta(pasta.id, li);

        // Drag & Drop (Criar Wrapper)
        configurarDragDrop(li, pasta);

        listaUI.appendChild(li);

        // Selecionar a primeira pasta automaticamente ao abrir
        if (index === 0) selecionarPasta(pasta.id, li);
    });
}

async function selecionarPasta(id, elementoHTML) {
    pastaAtualId = id; // Atualiza a memória


    document.querySelectorAll('.folder-item').forEach(el => el.classList.remove('active'));
    if(elementoHTML) elementoHTML.classList.add('active');

    await carregarWrappers(id);
}

// --- LISTAGEM DE WRAPPERS (HEADER) ---
async function carregarWrappers(folderId) {
    const headerUI = document.getElementById('wrapper-list-ui');
    const wrappers = await window.pywebview.api.listar_wrappers(folderId);

    headerUI.innerHTML = '';

    wrappers.forEach(w => {
        const tab = document.createElement('div');
        tab.className = 'wrapper-tab';

        // TRATAMENTO DO NOME (Limitar a 30 caracteres + "...")
        let nomeExibicao = w.name;
        if (nomeExibicao.length > 30) {
            nomeExibicao = nomeExibicao.substring(0, 27) + "...";
        }

        // INJETA O NOME NO TOOLTIP (Para o CSS ler)
        tab.setAttribute('data-tooltip', nomeExibicao);

        // ÍCONE
        if (w.icon && w.icon.startsWith('http')) {
            tab.innerHTML = `<img src="${w.icon}">`;
        } else {
            // Fallback elegante se falhar o ícone
            tab.innerHTML = `<span style="font-size: 20px;">🌐</span>`;
        }

        // Eventos de Clique
        tab.onclick = () => alert(`Abrindo: ${w.name}`);
        tab.oncontextmenu = (e) => {
            e.preventDefault();
            abrirMenuContexto(e, w.id, 'wrapper');
        };

        headerUI.appendChild(tab);
    });

    // BOTÃO "+ Novo"
    const btnAdd = document.createElement('div');
    btnAdd.className = 'wrapper-tab';
    btnAdd.style.border = '1px dashed #555';
    btnAdd.setAttribute('data-tooltip', 'Adicionar Link Manualmente');
    btnAdd.innerHTML = `<span style="font-size: 20px; color: #777;">+</span>`;
    btnAdd.onclick = () => alert("Futura função de adicionar manual"); // Placeholder
    headerUI.appendChild(btnAdd);

    // Reativa o Sortable (Arrastar para organizar)
    new Sortable(headerUI, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: function (evt) {
            console.log("Nova ordem dos wrappers!");
        }
    });
}

// --- LÓGICA DO MENU DE CONTEXTO ---
function abrirMenuContexto(e, idWrapper) {
    const menu = document.getElementById('custom-context-menu');
    wrapperAlvoMenu = idWrapper; // Salva o ID para saber quem editar/excluir

    // Posiciona onde o mouse clicou
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    menu.style.display = 'block';
}

function fecharMenuContexto() {
    document.getElementById('custom-context-menu').style.display = 'none';
}

function acaoEditar() {
    alert(`Editando wrapper ID: ${wrapperAlvoMenu}`);

}

function acaoExcluir() {
    if(confirm("Tem certeza que deseja excluir?")) {
        alert(`Excluindo wrapper ID: ${wrapperAlvoMenu}`);

    }
}

// --- LÓGICA DE DRAG & DROP ---
function configurarDragDrop(li, pasta) {
    li.ondragover = (e) => {
        e.preventDefault();
        li.style.border = "2px dashed #FF5733";

    };

    li.ondragleave = (e) => {
        li.style.border = "none";
    };

   li.ondrop = async (e) => {
        e.preventDefault();
        li.style.border = "none";

        // Tenta pegar o link
        const url = e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain");

        // FILTRO DE SEGURANÇA:
        // Só aceita se começar com http/https ou www.
        // E ignora se o texto for curto demais ou parecer nome de pasta
        if (url && (url.startsWith('http') || url.startsWith('www'))) {
            console.log(`Link válido solto em [${pasta.name}]: ${url}`);
            await window.pywebview.api.criar_wrapper_drop(url, pasta.id);

            if (pastaAtualId === pasta.id) {
                await carregarWrappers(pasta.id);
            }
        } else {
            console.log("Drop ignorado: Não parece um link web.", url);
        }
    };
}

// Funções extras
async function criarNovaPasta() {
    const nome = prompt("Nome da nova pasta:");
    if (nome) {
        await window.pywebview.api.criar_pasta(nome);
        await carregarPastas();
    }
}
// --- LÓGICA DE REDIMENSIONAMENTO MANUAL ---
const grip = document.getElementById('resize-grip');
let isResizing = false;
let lastCall = 0; // Para controlar a frequência

grip.addEventListener('mousedown', (e) => {
    isResizing = true;
    e.preventDefault();
    document.body.style.cursor = 'nwse-resize';
});

window.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
});

// --- CORREÇÃO PASSO 3: RESIZE ---
window.addEventListener('mousemove', (e) => {
    if (!isResizing) return;


    const newWidth = Math.max(400, e.clientX); // Mínimo 400px
    const newHeight = Math.max(300, e.clientY); // Mínimo 300px

    console.log(`Resizing to: ${newWidth}x${newHeight}`);

    window.pywebview.api.redimensionar_janela(newWidth, newHeight);
});

// --- CONTROLE DE UI (COLAPSO) ---

let isSidebarOpen = true;
let isHeaderOpen = true;

function toggleSidebar() {
    const body = document.body;
    const btn = document.getElementById('sidebar-toggle-btn');

    body.classList.toggle('sidebar-collapsed');
    const isClosed = body.classList.contains('sidebar-collapsed');

    if (isClosed) {
        btn.innerHTML = "&gt;&gt;";

    } else {
        btn.innerHTML = "&lt;&lt;";
    }
}

function toggleHeader() {
    const body = document.body;
    const btn = document.getElementById('btn-toggle-header');

    body.classList.toggle('header-collapsed');
    const isClosed = body.classList.contains('header-collapsed');

    if (isClosed) {
        // FECHADO: Seta para baixo (▼)
        btn.innerHTML = "&#9660;";
        btn.title = "Mostrar Barra";
    } else {
        // ABERTO: Seta para cima (▲)
        btn.innerHTML = "&#9650;";
        btn.title = "Ocultar Barra";
    }
}

function fecharWrapperAtual() {
    if(confirm("Encerrar wrapper atual?")) {
        // Chama Python para matar a janela filha (WebView)
        alert("Comando enviado para encerrar.");
    }
}

// --- SISTEMA DE MODAIS ---

function abrirModalWrapper(dados = null) {
    const modal = document.getElementById('modal-wrapper');

    // Se vier dados (Edição), preenche. Se não (Novo), limpa.
    if (dados) {
        document.getElementById('input-wrapper-name').value = dados.name;
        document.getElementById('input-wrapper-url').value = dados.url;
        // Lógica de validar URL
    } else {
        document.getElementById('input-wrapper-name').value = '';
        document.getElementById('input-wrapper-url').value = '';
    }

    modal.style.display = 'flex';
}

function fecharModal(idModal) {
    document.getElementById(idModal).style.display = 'none';
}

function salvarWrapperModal() {
    // Lógica futura de salvar
    alert("Dados capturados. Enviando ao Python...");
    fecharModal('modal-wrapper');
}

function irParaHome() {
    alert("Indo para a Tela Inicial (Plexus)...");
    // Futuro: Esconder todos os webviews e mostrar a div de boas-vindas
}

function fecharTodosWrappers() {
    if(confirm("Tem certeza que deseja encerrar TODOS os wrappers ativos?")) {
        alert("Encerrando tudo...");
        // Futuro: Loop para destruir WebViews
    }
}

function abrirConfiguracoes() {
    alert("Abrindo configurações...");
}