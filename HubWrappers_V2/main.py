import webview
import os
import sys
from src.backend.manager import DataManager
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HTML_PATH = os.path.join(BASE_DIR, 'src', 'frontend', 'index.html')

manager = DataManager()
class Api:
    """
    Esta classe contém todas as funções que o Javascript pode chamar.
    """
    window = None
    # --- CONTROLE DE JANELA ---
    def minimizar(self):
        if self.window: self.window.minimize()

    def maximizar(self):
        if self.window:

            self.window.toggle_fullscreen()

    def fechar(self):
        if self.window: self.window.destroy()

    def redimensionar_janela(self, width, height):
        if self.window:
            self.window.resize(int(width), int(height))

    def testar_conexao(self, nome):
        print(f"[PYTHON] Recebi um chamado do frontend de: {nome}")
        return f"Olá, {nome}! O Python v{sys.version.split()[0]} respondeu com sucesso."

    def criar_pasta(self,nome_pasta):
        "Chamado pelo js quando clicar em 'Nova pastas'"
        nova = manager.create_folder(nome_pasta)
        return nova

    def listar_pastas(self):
        "Chamado pelo js ao abrir o app para desenhar o menu lateral"
        return manager.get_folders()

    def listar_wrappers(self, folder_id):
        """Retorna apenas os wrappers da pasta solicitada"""
        return manager.get_wrappers_by_folder(folder_id)

    def criar_wrapper_drop(self, url, folder_id):
        """Chamado quando soltamos um link na pasta"""
        print(f"[DROP] Recebido: {url} na pasta {folder_id}")
        novo_wrapper = manager.create_wrapper_from_url(url, folder_id)
        return novo_wrapper

def main():
    api = Api()

    window = webview.create_window(
            title='HubWrappers v2',
            url=HTML_PATH,
            js_api=api,
            width=1000,
            height=700,
            min_size=(800, 500),
            frameless=True,
            easy_drag=False,
            resizable=True
        )


    api.window = window
    webview.start(debug=True, gui='edgechromium')

if __name__ == '__main__':
    main()