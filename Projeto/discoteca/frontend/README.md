# Sistema gerenciador de estoque de Discos

## Backend

### Tecnologias Utilizadas:
- **Express**: Framework web para Node.js.
- **MySQL**: Banco de dados relacional.
- **Cors**: Middleware para habilitar o CORS (Cross-Origin Resource Sharing).
- **Multer**: Middleware para lidar com uploads de arquivos.

### Estrutura do Projeto:
- **Endpoints**:
  - `/`: Rota raiz que retorna uma mensagem indicando que é o backend.
  - `/musicas`: 
    - **GET**: Retorna todos os álbuns presentes no banco de dados.
    - **POST**: Adiciona um novo álbum ao banco de dados, incluindo o upload de uma capa.
  - `/musicas/:id`: 
    - **DELETE**: Deleta um álbum com base no ID fornecido.
    - **PUT**: Atualiza as informações de um álbum existente, incluindo a possibilidade de atualizar a capa.

### Como Executar:
1. Certifique-se de ter o Node.js e o MySQL instalados.
2. Clone o repositório.
3. No terminal, vá até a pasta do projeto e execute `npm install` para instalar as dependências.
4. Configure o banco de dados MySQL com as credenciais fornecidas no código.
5. Execute `npm start` para iniciar o servidor backend e o frontend.

## Frontend

### Tecnologias Utilizadas:
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios**: Biblioteca para fazer requisições HTTP.

### Estrutura do Projeto:
- **Componentes**:
  - `Albuns`: Exibe todos os álbuns, permite a exclusão e redireciona para a página de adição de álbuns.
  - `Add`: Formulário para adicionar novos álbuns, incluindo o upload de uma capa.
  - `Update`: Formulário para editar álbuns existentes, também permite atualizar a capa.

### Como Executar:
1. Certifique-se de ter o Node.js instalado.
2. No terminal, vá até a pasta do projeto e execute `npm install` para instalar as dependências.
3. Execute `npm start` para iniciar o servidor frontend.
4. Abra o navegador e acesse `http://localhost:3000`.

**Observações**:
- Certifique-se de ter permissões para criar e manipular arquivos na pasta de uploads.
- Certifique-se de ter o MySQL em execução e com as configurações corretas.
- Os endpoints e configurações do banco de dados podem ser ajustados conforme necessário.
