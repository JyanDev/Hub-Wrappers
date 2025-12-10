import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

class WebScraper:
    def __init__(self):
        # Header falso para o site achar que somos um navegador real e não um robô
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def fetch_metadata(self, url):
        """
        Vai até a URL e tenta extrair Título e Ícone.
        Retorna um dicionário: {"title": "...", "icon_url": "..."}
        """
        try:
            # Garante que tem http/https
            if not url.startswith('http'):
                url = 'https://' + url

            response = requests.get(url, headers=self.headers, timeout=5)
            response.raise_for_status() # Lança erro se der 404/500

            soup = BeautifulSoup(response.text, 'html.parser')

            # 1. Pegar Título
            title = "Novo Wrapper"
            if soup.title and soup.title.string:
                title = soup.title.string.strip()

            # 2. Pegar Ícone
            icon_url = None
            # Procura por <link rel="icon"> ou "shortcut icon" ou "apple-touch-icon"
            icon_link = soup.find("link", rel=lambda x: x and 'icon' in x.lower())

            if icon_link and icon_link.get('href'):
                # Resolve caminhos relativos (ex: "/favicon.ico" vira "https://site.com/favicon.ico")
                icon_url = urljoin(url, icon_link.get('href'))
            else:
                # Fallback: Tenta pegar o favicon padrão da raiz
                parsed_uri = urlparse(url)
                icon_url = '{uri.scheme}://{uri.netloc}/favicon.ico'.format(uri=parsed_uri)

            return {
                "title": title,
                "icon_url": icon_url,
                "original_url": url
            }

        except Exception as e:
            print(f"[SCRAPER ERROR] Falha ao ler {url}: {e}")
            # Retorna dados genéricos se falhar
            return {
                "title": "Site Desconhecido",
                "icon_url": None,
                "original_url": url
            }