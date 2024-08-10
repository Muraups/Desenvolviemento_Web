const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
 
app.get('/helloword', (req, res) => {
    res.send('Hello world');
});

app.get('/route', (req, res) => {
    res.send('Minha Primeira Rota');
});

 
app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep; // Obtendo o CEP da URL
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(cep)){
        return res.status(400).send('CEP inválido. Formato: XXXXX-XXX');
    }

    try{
        // Fazendo requisição para a API do ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data); // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        res.status(500).send('Erro ao consultar o CEP');
    }    
});

app.get('/cep', (req, res) => {
    const htmlString = `
    <html>
        <head>
        <title>Aula node 1</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

        <!-- Adicionando Javascript -->
        <script>
        
        function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('uf').value=("");
            document.getElementById('ibge').value=("");
        }

        function meu_callback(conteudo) {
            if (!("erro" in conteudo)) {
                //Atualiza os campos com os valores.
                document.getElementById('rua').value=(conteudo.logradouro);
                document.getElementById('bairro').value=(conteudo.bairro);
                document.getElementById('cidade').value=(conteudo.localidade);
                document.getElementById('uf').value=(conteudo.uf);
                document.getElementById('ibge').value=(conteudo.ibge);
            } else {
                //CEP não Encontrado.
                limpa_formulário_cep();
                alert("CEP não encontrado.");
            }
        }
            
        function pesquisacep(valor) {
            //Nova variável "cep" somente com dígitos.
            var cep = valor.replace(/\\D/g, '');

            //Verifica se campo cep possui valor informado.
            if (cep != "") {
                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;

                //Valida o formato do CEP.
                if(validacep.test(cep)) {
                    //Preenche os campos com "..." enquanto consulta webservice.
                    document.getElementById('rua').value="...";
                    document.getElementById('bairro').value="...";
                    document.getElementById('cidade').value="...";
                    document.getElementById('uf').value="...";
                    document.getElementById('ibge').value="...";

                    //Cria um elemento javascript.
                    var script = document.createElement('script');

                    //Sincroniza com o callback.
                    script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                    //Insere script no documento e carrega o conteúdo.
                    document.body.appendChild(script);

                } else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    alert("Formato de CEP inválido.");
                }
            } else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        };
        </script>
        </head>
        <body>
        <!-- Inicio do formulario -->
        <form method="get" action=".">
            <label>Cep:
            <input name="cep" type="text" id="cep" value="" size="10" maxlength="9"
                onblur="pesquisacep(this.value);" /></label><br />
            <label>Rua:
            <input name="rua" type="text" id="rua" size="60" /></label><br />
            <label>Bairro:
            <input name="bairro" type="text" id="bairro" size="40" /></label><br />
            <label>Cidade:
            <input name="cidade" type="text" id="cidade" size="40" /></label><br />
            <label>Estado:
            <input name="uf" type="text" id="uf" size="2" /></label><br />
            <label>IBGE:
            <input name="ibge" type="text" id="ibge" size="8" /></label><br />
        </form>
        </body>
    </html>
    `;
    res.send(htmlString);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
