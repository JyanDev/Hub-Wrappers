import json
import os
import uuid  # Para gerar IDs únicos (ex: 'a1b2-c3d4')
from src.backend.scraber import WebScraper

scraper = WebScraper()
class DataManager:
    def __init__(self, data_path="data/hub_data.json"):
        self.data_path = data_path
        self.data = {
            "folders": [],
            "wrappers": []
        }
        self.ensure_data_folder()
        self.load_data()
    def create_wrapper_from_url(self,url,folder_id):
        """Cria um wrapper automático apenas arrastando a URL de um navegador."""
        metadata = scraper.fetch_metadata(url)
        new_wrapper = {
            "id": str(uuid.uuid4()),
            "name": metadata["title"], # Nome veio do site
            "url": metadata["original_url"],
            "folder_id": folder_id,
            "icon": metadata["icon_url"] or "assets/default_icon.png"
        }
        self.data["wrappers"].append(new_wrapper)
        self.save_data()
        return new_wrapper

    def ensure_data_folder(self):
        """Garante que a pasta 'data' exista."""
        folder = os.path.dirname(self.data_path)
        if not os.path.exists(folder):
            os.makedirs(folder)

    def load_data(self):
        """Carrega o JSON se existir, ou cria um novo."""
        if os.path.exists(self.data_path):
            try:
                with open(self.data_path, 'r', encoding='utf-8') as f:
                    self.data = json.load(f)
                print(f"[MANAGER] Dados carregados de {self.data_path}")
            except Exception as e:
                print(f"[ERRO] Falha ao ler JSON: {e}")
        else:
            print("[MANAGER] Nenhum dado encontrado. Criando novo arquivo.")
            self.save_data()

    def save_data(self):
        """Salva o estado atual no arquivo JSON."""
        try:
            with open(self.data_path, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=4, ensure_ascii=False)
            print("[MANAGER] Dados salvos com sucesso.")
        except Exception as e:
            print(f"[ERRO] Falha ao salvar: {e}")

    # --- Métodos de Pasta ---
    def create_folder(self, name, icon="folder"):
        new_folder = {
            "id": str(uuid.uuid4()),  # Gera ID único
            "name": name,
            "icon": icon
        }
        self.data["folders"].append(new_folder)
        self.save_data()
        return new_folder

    def get_folders(self):
        return self.data["folders"]

    # --- Métodos de Wrapper ---
    def create_wrapper(self, name, url, folder_id):
        new_wrapper = {
            "id": str(uuid.uuid4()),
            "name": name,
            "url": url,
            "folder_id": folder_id,
            "icon": "default.png" # Futuramente faremos o auto-fetch
        }
        self.data["wrappers"].append(new_wrapper)
        self.save_data()
        return new_wrapper

    def get_wrappers_by_folder(self, folder_id):
        """Filtra wrappers que pertencem a uma pasta específica (SQL-like logic)."""
        return [w for w in self.data["wrappers"] if w["folder_id"] == folder_id]