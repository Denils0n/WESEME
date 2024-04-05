const mapa = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 2, 0, 0, 1, 0],
    [0, 1, 0, 1, 3, 0],
    [0, 1, 1, 1, 1, 0]
];

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

let caminho = encontrarCaminho(mapa, localInicio(mapa));

while (!caminho) {
    console.log("Tentando novamente...");
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
            // Mover novamente com o novo caminho
            return mover(mapa, novoCaminho);
        }
    }
    return true;
}

console.log(mapa)
