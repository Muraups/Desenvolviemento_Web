const express =  require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello Word');
});

app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep; //Obtendo o cep Url
    console.log(cep);
    
    try {
        //fazendo a requisição para a API do VIA CEP
        const response = await  axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.send(response.data)
    } catch (erros){
        console.error('Erro ao fazer requisição:', error);
        res.status(500).send('Erro ao consultar CEP');
     }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
