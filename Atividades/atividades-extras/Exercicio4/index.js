/* Função assíncrona para buscar informações de um usuário no GitHub usando a API do GitHub */
const getRepository = async (user) => {
    try {
        // Constrói a URL da API do GitHub com o nome do usuário fornecido
        const url = `https://api.github.com/users/${user}`;
        
        // Faz uma solicitação assíncrona para a API do GitHub usando fetch
        const response = await fetch(url);

        // Verificando se a resposta é bem-sucedida, caso contrário, lança um erro
        if (!response.ok) {
            throw new Error('Usuário não encontrado');
        }

        // Convertendio a resposta para o formato JSON
        const data = await response.json();

        // Extraindo as informações relevantes do objeto de dados retornado pela API
        const { login, email, public_repos, followers, following } = data;

        // Retorna um array contendo as informações do usuário
        return [login, email, public_repos, followers, following];
    } catch (error) {
        // Registra o erro no console e lança novamente o erro
        console.error(error);
        throw error;
    }
};

/* Função para exibir ou ocultar a mensagem de erro na tela */
const showError = (show) => {
    // Obtém a referência ao elemento de mensagem de erro pelo seu ID
    const errorElement = document.getElementById('error-message');

    // Se a variável 'show' for verdadeira, exibe a mensagem de erro, caso contrário, oculta
    if (show) {
        errorElement.innerText = 'Usuário não encontrado. Por favor, insira um usuário válido.';
        errorElement.style.display = 'block';
    } else {
        errorElement.style.display = 'none';
    }
};

/* Função assíncrona para inserir uma nova linha na tabela com as informações do usuário */
const insertRow = async () => {
    try {
        // Recupeira o valor inserido no campo de input pelo ID
        const nameValue = document.getElementById('github_name').value;

        // Verificando se o campo está vazio e exibe mensagem de erro se necessário
        if (!nameValue) {
            showError(true);
            return;
        }

        // Chama a função getRepository para obter informações do usuário
        const userInfos = await getRepository(nameValue);

        // Obtém a referência à tabela pelo ID
        const table = document.getElementById('myTable');

        // Insere uma nova linha na tabela
        const row = table.insertRow();

        // Preenche as células da nova linha com as informações do usuário
        for (let i = 0; i < userInfos.length; i++) {
            const cell = row.insertCell(i);
            cell.innerText = userInfos[i];
        }

        // Limpa o campo de input após a inserção na tabela
        document.getElementById('github_name').value = '';

        // Esconde a mensagem de erro, se estiver visível
        showError(false);
    } catch (error) {
        // Exibe a mensagem de erro em caso de falha
        showError(true);
    }
};

/* Adiciona um ouvinte de evento para permitir a busca ao pressionar "Enter" no campo de input */
document.getElementById('github_name').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        insertRow();
    }
});
