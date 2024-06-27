const axios = require('axios');

// Configurações
const originalUsername = 'nome-usuario-antigo';
const newUsername = 'nome-usuario-novo';
const token = 'seu-token-pessoal';  // Substitua com o token gerado

// Cabeçalhos para autenticação
const headers = {
  'Authorization': `token ${token}`,
  'Accept': 'application/vnd.github.v3+json'
};

// Obter lista de repositórios da conta original
const transfer = () => {
    axios.get(`https://api.github.com/users/${originalUsername}/repos`, { headers })
  .then(response => {
    const repos = response.data;

    repos.forEach(repo => {
      const repoName = repo.name;
      const transferUrl = `https://api.github.com/repos/${originalUsername}/${repoName}/transfer`;
      const data = {
        new_owner: newUsername
      };

      // Transferir o repositório
      axios.post(transferUrl, data, { headers })
        .then(transferResponse => {
          if (transferResponse.status === 202) {
            console.log(`Sucesso ao transferir o repositório ${repoName} para ${newUsername}`);
          } else {
            console.log(`Falha ao transferir o repositório ${repoName}:`, transferResponse.data);
          }
        })
        .catch(error => {
          console.error(`Erro ao transferir o repositório ${repoName}:`, error.response.data);
        });
    });
  })
  .catch(error => {
    console.error('Erro ao obter repositórios:', error.response.data);
  });
}

transfer();