let linhasCidade = 0;
let colunasCidade = 0;
//let cidadeBase = [];
let mapa = [];

let linhaSelecionada;
let colunaSelecionada;

let chegadaSelecionada = false;
let partidaSelecionada = false;


// Iniciar
document.addEventListener("DOMContentLoaded", function() {

    let paragrafo = document.getElementById('meuParagrafo');
        paragrafo.textContent = 'Monte sua cidade e se surpreenda com as possibilidades!';

    document.getElementById("btn-start").style.display = "none";

    function atualizaMapa(){

        let tbody = document.getElementById('matrizCidade');
            tbody.innerHTML = ''; 

        for (let i = 0; i < linhasCidade; i++) {

            let row = document.createElement('tr');
            
            for (let j = 0; j < colunasCidade; j++) {

                let cell = document.createElement('td');
                    cell.style.borderBottomWidth = "inherit";
                    cell.id = i+"-"+j;
                
                    cell.addEventListener('click', function() {
                        openModal(this.id);
                    });

                    let imagem = document.createElement('img');
                        imagem.classList.add('svg'); 
                        imagem.className = 'svg'; 

                    
                    if(mapa[i][j] == 1){

                        imagem.alt = "RUA";
                        imagem.src = './img/RUA.svg'; 
                        cell.style.backgroundColor = "#dc3545";
                        cell.appendChild(imagem);

                    }else if(mapa[i][j] == 0){

                        imagem.alt = "CASA";
                        imagem.src = './img/CASA.svg'; 
                        cell.style.backgroundColor = "#198754";
                        cell.appendChild(imagem);

                    }else if(mapa[i][j] == 4){

                        imagem.alt = "PREDIO";
                        imagem.src = './img/PREDIO.svg'; 
                        cell.style.backgroundColor = "#0dcaf0";
                        cell.appendChild(imagem);

                    }else if(mapa[i][j] == 3){

                        imagem.alt = "CHEGADA";
                        imagem.src = './img/CHEGADA1.svg'; 
                        cell.style.backgroundColor = "yellow";
                        cell.appendChild(imagem);

                    }else if(mapa[i][j] == 2){

                        imagem.alt = "PARTIDA";
                        imagem.src = './img/CARRO2.svg'; 
                        cell.style.backgroundColor = "violet";
                        cell.appendChild(imagem);

                    }else if(mapa[i][j] == -1){

                        imagem.alt = "ENGARRAFAMENTO";
                        imagem.src = './img/ENGARRAFAMENTO2.png'; 
                        cell.style.backgroundColor = "orange";
                        cell.appendChild(imagem);

                    }

                row.appendChild(cell);
            }

            tbody.appendChild(row);
        }

        $('#myModal').modal('hide');

    }

    document.getElementById("btn-start").addEventListener('click', function() {
        iniciarRota();
    });


    // Habilita button para iniciar rota
    function habilitarStart() {
        if (chegadaSelecionada && partidaSelecionada) {
            document.getElementById("btn-start").style.display = ""; // Mostra o botão "Start"
        }
    }

    // Seleciona item da celula
    function openModal(id){

        $('#myModal').modal('show');

        let split = id.split("-");

        linhaSelecionada = split[0];
        colunaSelecionada = split[1];

        document.getElementById("CASA").addEventListener('click', function() {
            mapa[linhaSelecionada][colunaSelecionada] = 0;
            atualizaMapa();
        });
    
        document.getElementById("RUA").addEventListener('click', function() {
            mapa[linhaSelecionada][colunaSelecionada] = 1;
            atualizaMapa();
        });
    
        document.getElementById("PREDIO").addEventListener('click', function() {
            mapa[linhaSelecionada][colunaSelecionada] = 4;
            atualizaMapa();
        });

        document.getElementById("CHEGADA").addEventListener('click', function() {
            
            if (!chegadaSelecionada) {
                mapa[linhaSelecionada][colunaSelecionada] = 3; 
                chegadaSelecionada = true; 
                atualizaMapa();
                document.getElementById("CHEGADA").style.display = "none"; 
                habilitarStart();
            }
        });
    
        document.getElementById("PARTIDA").addEventListener('click', function() {

            if (!partidaSelecionada) {
                mapa[linhaSelecionada][colunaSelecionada] = 2;
                partidaSelecionada = true; 
                atualizaMapa();
                document.getElementById("PARTIDA").style.display = "none"; 
                habilitarStart();
            }
        });
    }

    // Cria Layout tabela city
    function preencherMatrizCidade() {

        let tbody = document.getElementById('matrizCidade');
            tbody.innerHTML = ''; 

        for (let i = 0; i < linhasCidade; i++) {

            let row = document.createElement('tr');

            for (let j = 0; j < colunasCidade; j++) {

                let cell = document.createElement('td');
                    cell.style.borderBottomWidth = "inherit";
                    cell.style.backgroundColor = "#198754";
                    cell.id = i+"-"+j;

                let imagem = document.createElement('img');
                    imagem.classList.add('svg'); 
                    imagem.src = './img/CASA.svg'; 
                    imagem.alt = 'CASA'; 
                    imagem.className = 'svg';
                
                cell.appendChild(imagem);
                
               
                cell.addEventListener('click', function() {
                    openModal(this.id);
                });
                
                row.appendChild(cell);
            }

            tbody.appendChild(row);
        }

    }

    // Cria mapa
    function preparaMatrizCity(){

        let contLinhas = 0;
        let contColunas = 0;

        //cidadeBase = [];
        mapa = [];

        for (let i = 0; i < linhasCidade; i++) {
           
            //cidadeBase.push([]);
            mapa.push([]);

            for (let j = 0; j < colunasCidade; j++) {

               // cidadeBase[i].push(0);
                mapa[i].push(0);
            }
        }
        
        //console.log(cidadeBase);
        console.log(mapa);
        preencherMatrizCidade();

    }

    // Abre painel
    function openCity(event) {
    
        document.getElementById("city").classList.remove("visually-hidden");
        
        event.preventDefault(); 
        let cidade = event.target.textContent.trim();
        let nameCity = document.getElementById("cidadeSelecionada");

        chegadaSelecionada = false;
        partidaSelecionada = false;
        document.getElementById("CHEGADA").style.display = ""; 
        document.getElementById("PARTIDA").style.display = ""; 


        if(cidade == "Abreu e Lima"){

            nameCity.textContent = cidade;
            nameCity.className = "gradiente-texto-abreu";

            linhasCidade = 10;
            colunasCidade = 4;    
            preparaMatrizCity();       

        } else if(cidade == "Igarassu"){

            nameCity.textContent = cidade;
            nameCity.className = "gradiente-texto-igarassu";

            linhasCidade = 12;
            colunasCidade = 8;           
            preparaMatrizCity();       

        } else if(cidade == "Recife"){

            nameCity.textContent = cidade;
            nameCity.className = "gradiente-texto-recife";

            linhasCidade = 14;
            colunasCidade = 15;           
            preparaMatrizCity();       

        }
    }
    
    // Dropdown cidades
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', openCity);
    });


//Back
////////////////////////////////////////////////////////////////////////////////

    function destino(mapa) {
        let localDestino = null;
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
                if (mapa[i][j] === 3) {
                    localDestino = [i, j];
                    return localDestino;
                }
            }
        }
        return localDestino;
    }

    function localInicio(mapa) {
        let posicaoAtual = null;
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[i].length; j++) {
                if (mapa[i][j] === 2) {
                    posicaoAtual = [i, j];
                    return posicaoAtual;
                }
            }
        }
        return posicaoAtual;
    }

    
    function encontrarCaminho(mapa, posicaoAtual) {
        const linhas = mapa.length;
        const colunas = mapa[0].length;
        let caminhoPercorrido = [];
        let localDestino = destino(mapa);
        
        if (!localDestino) {
            console.log("Posição destino não encontrada.");
            return null;
        }
        
        function ehPosicaoValida(pos) {
            const [x, y] = pos;
            return (
                x >= 0 &&
                x < linhas &&
                y >= 0 &&
                y < colunas &&
                mapa[x][y] >= 1 &&
                !caminhoPercorrido.find((p) => p[0] === x && p[1] === y)
            );
        }

        function encontrarProximoMovimento(pos) {
            const movimentos = [
                [-1, 0], // Cima
                [1, 0],  // Baixo
                [0, -1], // Esquerda
                [0, 1],  // Direita
            ];

            for (const [dx, dy] of movimentos) {
                const novaPosicao = [pos[0] + dx, pos[1] + dy];
                if (ehPosicaoValida(novaPosicao)) return novaPosicao;
            }

            return null;
        }
        
        while (true) {
            caminhoPercorrido.push(posicaoAtual);
            if (posicaoAtual[0] === localDestino[0] && posicaoAtual[1] === localDestino[1]) {
                console.log(caminhoPercorrido);
                return caminhoPercorrido;
            }

            const proximaPosicao = encontrarProximoMovimento(posicaoAtual);
            if (!proximaPosicao) {
                console.log("Não foi possível encontrar um caminho até o destino.");
                break;
            }

            posicaoAtual = proximaPosicao;
        }
    }

    function gerarAcidente(mapa) {
        const linhas = mapa.length;
        const colunas = mapa[0].length;
        let x = Math.floor(Math.random() * linhas);
        let y = Math.floor(Math.random() * colunas);
        while (mapa[x][y] !== 1) {
            x = Math.floor(Math.random() * linhas);
            y = Math.floor(Math.random() * colunas);
        }
        mapa[x][y] = -1;
        return [x, y];
    }


    function iniciarRota(){
        
        let caminho = encontrarCaminho(mapa, localInicio(mapa));

        while (!caminho) {
            console("Tentando novamente...");
            caminho = encontrarCaminho(mapa, localInicio(mapa));
        }

        if (caminho != null) {
            gerarAcidente(mapa);
        }

        if (!mover(mapa, caminho)) {
            encontrarCaminho(mapa, localInicio(mapa));
        }
        
        
        function mover(mapa, caminho) {
            // Obter a posição inicial do usuário
            let posicaoAtual = localInicio(mapa);
            if (!posicaoAtual) {
                console.log("Posição inicial do usuário não encontrada.");
                return false;
            }
        
            for (let i = 0; i < caminho.length; i++) {
                const x = caminho[i][1]; // Coordenada x
                const y = caminho[i][0]; // Coordenada y
                atualizaMapa();
        
                if (mapa[y][x] >= 1) {
                    // Se a posição estiver livre (valor 1 no mapa)
                    console.log(mapa);
        
                    console.log("Movendo para", [x, y]);
                    // Atualizar a posição do usuário no mapa
                    mapa[posicaoAtual[0]][posicaoAtual[1]] = 1;
                    mapa[y][x] = 2;
                    // Atualizar a posição atual do usuário
                    posicaoAtual = [y, x];
        
                    
                } else {
                    console.log("Há um obstáculo em", [x, y]);
                    // Tratar a presença de um obstáculo, se necessário
                    console.log("Atualizando o caminho...");
                    const novaPosicaoAtual = localInicio(mapa);
                    if (!novaPosicaoAtual) {
                        console.log("Posição inicial do usuário não encontrada.");
                        return false;
                    }
                    const novoCaminho = encontrarCaminho(mapa, novaPosicaoAtual);
                    if (!novoCaminho) {
                        console.log("Não foi possível encontrar um novo caminho.");
                        return false;
                    }
                    console.log("Novo caminho encontrado:", novoCaminho);
                    atualizaMapa();
                    // Mover novamente com o novo caminho
                    return mover(mapa, novoCaminho);
                }
            }
            return true;
        }
        

    }
});



