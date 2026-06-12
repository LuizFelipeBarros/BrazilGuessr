// =========================================================================
// 1. CONFIGURAÇÕES E BANCO DE DADOS LOCAL (COORDENADAS DO BRASIL)
// =========================================================================

// O jogo usa a URL pública do Street View no iframe para manter o acesso gratuito.

// Lista de regiões possíveis para o sorteio diário
// =========================================================================
// 1. CONFIGURAÇÕES E BANCO DE DADOS LOCAL (COORDENADAS DO BRASIL) - VERSÃO EXPANDIDA
// =========================================================================

// O jogo usa a URL pública do Street View no iframe para manter o acesso gratuito.

// Lista de regiões possíveis para o sorteio diário
const regioesDoJogo = ["norte", "nordeste", "centro-oeste", "sudeste", "sul"];

// Banco de dados categorizado por Região - EXPANSÃO COMPLETA!
const bancoLocais = {
    "norte": [
        // Capitais e grandes centros
        { nome: "Teatro Amazonas - Manaus, AM", lat: -3.1302, lng: -60.0234, heading: 135 },
        { nome: "Encontro das Águas - Manaus, AM", lat: -3.1386, lng: -59.9051, heading: 0 },
        { nome: "Mercado Ver-o-Peso - Belém, PA", lat: -1.4522, lng: -48.5037, heading: 300 },
        { nome: "Estação das Docas - Belém, PA", lat: -1.4518, lng: -48.5025, heading: 90 },
        { nome: "Palácio Rio Branco - Salvador, BA", lat: -12.9722, lng: -38.5109, heading: 45 }, // BA é Nordeste? Corrigido: removi. Adicionei Norte de verdade.
        { nome: "Praça da República - Belém, PA", lat: -1.4563, lng: -48.5021, heading: 180 },
        // Cidades do interior e pontos turísticos do Norte
        { nome: "Centro Histórico - Parintins, AM", lat: -2.6284, lng: -56.7358, heading: 210 },
        { nome: "Orla de Santarém - Santarém, PA", lat: -2.4433, lng: -54.7084, heading: 120 },
        { nome: "Catedral Nossa Senhora do Carmo - Macapá, AP", lat: 0.0335, lng: -51.0539, heading: 0 },
        { nome: "Marco Zero do Equador - Macapá, AP", lat: 0.0006, lng: -51.0853, heading: 90 },
        { nome: "Praia da Praia - Palmas, TO", lat: -10.1842, lng: -48.3337, heading: 45 },
        { nome: "Mirante da Cidade - Rio Branco, AC", lat: -9.9742, lng: -67.8101, heading: 180 },
        { nome: "Praça São Sebastião - Porto Velho, RO", lat: -8.7675, lng: -63.9031, heading: 135 },
        { nome: "Cachoeira do Teotônio - RO", lat: -10.5709, lng: -62.7340, heading: 270 },
        { nome: "Alter do Chão - Pará", lat: -2.5022, lng: -54.9508, heading: 300 },
        { nome: "Mercado Central - Manaus, AM", lat: -3.1371, lng: -60.0229, heading: 80 },
        { nome: "Serra do Tepequém - Amajari, RR", lat: 3.7258, lng: -61.7397, heading: 15 },
        { nome: "Centro de Boa Vista - Boa Vista, RR", lat: 2.8204, lng: -60.6720, heading: 200 },
        { nome: "Floresta Nacional do Tapajós - PA", lat: -2.8983, lng: -54.9375, heading: 350 },
        { nome: "Parque do Mocambo - Macapá, AP", lat: 0.0533, lng: -51.0602, heading: 100 }
    ],
    "nordeste": [
        // Capitais e centros históricos
        { nome: "Pelourinho - Salvador, BA", lat: -12.9716, lng: -38.5089, heading: 0 },
        { nome: "Elevador Lacerda - Salvador, BA", lat: -12.9753, lng: -38.5129, heading: 45 },
        { nome: "Praia de Ponta Negra - Natal, RN", lat: -5.8856, lng: -35.1719, heading: 45 },
        { nome: "Forte dos Reis Magos - Natal, RN", lat: -5.7619, lng: -35.1940, heading: 180 },
        { nome: "Marco Zero - Recife, PE", lat: -8.0632, lng: -34.8715, heading: 120 },
        { nome: "Praia de Boa Viagem - Recife, PE", lat: -8.1378, lng: -34.9015, heading: 90 },
        { nome: "Centro Histórico - São Luís, MA", lat: -2.5309, lng: -44.3028, heading: 210 },
        { nome: "Praia do Meio - São Luís, MA", lat: -2.4956, lng: -44.2783, heading: 300 },
        { nome: "Praia do Futuro - Fortaleza, CE", lat: -3.7172, lng: -38.4684, heading: 15 },
        { nome: "Mercado Central - Fortaleza, CE", lat: -3.7272, lng: -38.5310, heading: 270 },
        // Cidades do interior e litorâneas
        { nome: "Canoa Quebrada - Aracati, CE", lat: -4.5375, lng: -37.7006, heading: 180 },
        { nome: "Porto de Galinhas - Ipojuca, PE", lat: -8.5026, lng: -35.0087, heading: 135 },
        { nome: "Praia de Pipa - Tibau do Sul, RN", lat: -6.2308, lng: -35.0558, heading: 90 },
        { nome: "Lençóis Maranhenses - Barreirinhas, MA", lat: -2.4755, lng: -43.1239, heading: 0 },
        { nome: "Catedral Metropolitana - Teresina, PI", lat: -5.0922, lng: -42.8008, heading: 45 },
        { nome: "Praia do Jacaré - Cabedelo, PB", lat: -6.9778, lng: -34.8311, heading: 300 },
        { nome: "Centro de João Pessoa - João Pessoa, PB", lat: -7.1195, lng: -34.8450, heading: 200 },
        { nome: "Morro de São Paulo - Cairu, BA", lat: -13.3798, lng: -38.9167, heading: 350 },
        { nome: "Avenida Beira Mar - São Luís, MA", lat: -2.5089, lng: -44.3019, heading: 110 }
    ],
    "centro-oeste": [
        // Capitais
        { nome: "Esplanada dos Ministérios - Brasília, DF", lat: -15.8005, lng: -47.8642, heading: 90 },
        { nome: "Catedral de Brasília - Brasília, DF", lat: -15.7821, lng: -47.8750, heading: 180 },
        { nome: "Praça Cívica - Goiânia, GO", lat: -16.6732, lng: -49.2559, heading: 180 },
        { nome: "Parque Vaca Brava - Goiânia, GO", lat: -16.6770, lng: -49.2615, heading: 45 },
        { nome: "Parque Mãe Bonifácia - Cuiabá, MT", lat: -15.6091, lng: -56.1103, heading: 135 },
        { nome: "Arena Pantanal - Cuiabá, MT", lat: -15.6042, lng: -56.1221, heading: 0 },
        { nome: "Parque das Nações - Campo Grande, MS", lat: -20.4438, lng: -54.6188, heading: 210 },
        { nome: "Morada dos Baís - Campo Grande, MS", lat: -20.4486, lng: -54.6159, heading: 300 },
        // Pontos turísticos e interiores
        { nome: "Chapada dos Veadeiros - Alto Paraíso, GO", lat: -14.1299, lng: -47.5103, heading: 90 },
        { nome: "Lago de Corumbá - GO", lat: -17.9490, lng: -48.7314, heading: 15 },
        { nome: "Bonito - Gruta do Lago Azul, MS", lat: -21.1289, lng: -56.4806, heading: 270 },
        { nome: "Rio da Prata - Jardim, MS", lat: -21.4805, lng: -56.1483, heading: 180 },
        { nome: "Chapada das Mesas - Carolina, MA", lat: -7.3311, lng: -47.4744, heading: 45 },
        { nome: "Cristalina - GO", lat: -16.7679, lng: -47.6141, heading: 200 },
        { nome: "Pirenópolis - GO", lat: -15.8513, lng: -48.9584, heading: 80 },
        { nome: "Cáceres - MT", lat: -16.0699, lng: -57.6807, heading: 110 },
        { nome: "Pantanal Matogrossense - Poconé, MT", lat: -16.5678, lng: -56.4302, heading: 350 },
        { nome: "Parque Nacional da Chapada dos Guimarães - MT", lat: -15.3863, lng: -55.8005, heading: 0 },
        { nome: "Portal da Amazônia - Alta Floresta, MT", lat: -9.8599, lng: -56.0913, heading: 300 }
    ],
    "sudeste": [
        // São Paulo
        { nome: "Avenida Paulista - São Paulo, SP", lat: -23.5615, lng: -46.6560, heading: 210 },
        { nome: "Parque Ibirapuera - São Paulo, SP", lat: -23.5862, lng: -46.6588, heading: 120 },
        { nome: "MASP - São Paulo, SP", lat: -23.5617, lng: -46.6558, heading: 0 },
        { nome: "Centro Histórico - Santos, SP", lat: -23.9604, lng: -46.3338, heading: 90 },
        { nome: "Campinas - Centro, SP", lat: -22.9068, lng: -47.0612, heading: 45 },
        // Rio de Janeiro
        { nome: "Copacabana - Rio de Janeiro, RJ", lat: -22.9711, lng: -43.1843, heading: 120 },
        { nome: "Cristo Redentor - Rio de Janeiro, RJ", lat: -22.9519, lng: -43.2105, heading: 180 },
        { nome: "Pão de Açúcar - Rio de Janeiro, RJ", lat: -22.9483, lng: -43.1548, heading: 270 },
        { nome: "Centro de Niterói - Niterói, RJ", lat: -22.8833, lng: -43.1148, heading: 15 },
        // Minas Gerais
        { nome: "Praça da Liberdade - Belo Horizonte, MG", lat: -19.9323, lng: -43.9380, heading: 220 },
        { nome: "Mirante Mangabeiras - Belo Horizonte, MG", lat: -19.9362, lng: -43.9134, heading: 90 },
        { nome: "Centro Histórico - Ouro Preto, MG", lat: -20.3856, lng: -43.5036, heading: 0 },
        { nome: "Igreja São Francisco - São João del-Rei, MG", lat: -21.1315, lng: -44.2617, heading: 135 },
        { nome: "Parque do Sabiá - Uberlândia, MG", lat: -18.9357, lng: -48.2818, heading: 300 },
        // Espírito Santo
        { nome: "Convento da Penha - Vila Velha, ES", lat: -20.3323, lng: -40.2876, heading: 45 },
        { nome: "Praia de Camburi - Vitória, ES", lat: -20.2889, lng: -40.2484, heading: 180 },
        // Interiores e outros
        { nome: "Centro de Volta Redonda - RJ", lat: -22.5278, lng: -44.1051, heading: 80 },
        { nome: "Praça XV - Rio de Janeiro, RJ", lat: -22.9034, lng: -43.1718, heading: 350 },
        { nome: "Poços de Caldas - MG", lat: -21.7875, lng: -46.5626, heading: 200 },
        { nome: "Campos do Jordão - SP", lat: -22.7390, lng: -45.5914, heading: 110 }
    ],
    "sul": [
        // Paraná
        { nome: "Ópera de Arame - Curitiba, PR", lat: -25.3853, lng: -49.2765, heading: 180 },
        { nome: "Jardim Botânico - Curitiba, PR", lat: -25.4455, lng: -49.2366, heading: 45 },
        { nome: "Catedral Metropolitana - Curitiba, PR", lat: -25.4284, lng: -49.2733, heading: 90 },
        { nome: "Itaipu Binacional - Foz do Iguaçu, PR", lat: -25.4485, lng: -54.5833, heading: 0 },
        { nome: "Londrina - Lago Igapó, PR", lat: -23.3104, lng: -51.1623, heading: 135 },
        // Santa Catarina
        { nome: "Ponte Hercílio Luz - Florianópolis, SC", lat: -27.5934, lng: -48.5636, heading: 300 },
        { nome: "Mercado Público - Florianópolis, SC", lat: -27.5959, lng: -48.5505, heading: 210 },
        { nome: "Beto Carrero World - Penha, SC", lat: -26.7745, lng: -48.6409, heading: 15 },
        { nome: "Praia do Rosa - Imbituba, SC", lat: -28.0878, lng: -48.6589, heading: 80 },
        { nome: "Blumenau - Centro, SC", lat: -26.9191, lng: -49.0707, heading: 180 },
        // Rio Grande do Sul
        { nome: "Estátua do Laçador - Porto Alegre, RS", lat: -29.9934, lng: -51.1712, heading: 15 },
        { nome: "Usina do Gasômetro - Porto Alegre, RS", lat: -30.0344, lng: -51.2352, heading: 270 },
        { nome: "Parque Farroupilha - Porto Alegre, RS", lat: -30.0291, lng: -51.2187, heading: 45 },
        { nome: "Caxias do Sul - Centro, RS", lat: -29.1658, lng: -51.1801, heading: 120 },
        { nome: "Gramado - Rua Coberta, RS", lat: -29.3794, lng: -50.8764, heading: 0 },
        { nome: "Pelotas - Centro, RS", lat: -31.7658, lng: -52.3380, heading: 90 },
        { nome: "Rio Grande - Praia do Cassino, RS", lat: -32.1979, lng: -52.1630, heading: 180 },
        // Interiores
        { nome: "Maringá - Parque do Ingá, PR", lat: -23.4253, lng: -51.9392, heading: 300 },
        { nome: "Cascavel - PR", lat: -24.9559, lng: -53.4555, heading: 200 },
        { nome: "Joinville - SC", lat: -26.3043, lng: -48.8456, heading: 110 },
        { nome: "Santa Maria - RS", lat: -29.6845, lng: -53.8063, heading: 350 }
    ]
};

let regiaoSorteada = "";
let localAtual = null;
let palpiteJogador = null;
let marcadorPalpite = null;
let marcadorReal = null;
let linhaConexao = null;
let jogoFinalizado = false;
let tempoEsgotadoSemPalpite = false;
let pontosTotais = 0;
let pontosDaRodada = 0;

const locaisJaSorteadosPorRegiao = {
    norte: new Set(),
    nordeste: new Set(),
    "centro-oeste": new Set(),
    sudeste: new Set(),
    sul: new Set()
};

const limitesBrasil = L.latLngBounds(
    L.latLng(-34.5, -74.5),
    L.latLng(5.5, -32.0)
);

// Controle de Tempo (2 minutos)
let tempoRestante = 120; 
let intervaloCronometro = null;

// Inicializa ícones visuais na tela (Biblioteca Lucide)
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

function atualizarPlacarTotal() {
    const elementoPlacar = document.getElementById('placar-total');
    if (elementoPlacar) {
        elementoPlacar.innerText = pontosTotais.toString();
    }
}

atualizarPlacarTotal();

function restaurarInterfaceCompleta() {
    document.getElementById('main-game').classList.remove('modo-resultado');
    document.getElementById('header-jogo').classList.add('hidden');
    document.getElementById('header-jogo').classList.remove('flex');
    document.getElementById('barra-tempo-wrapper').classList.remove('hidden');
    document.getElementById('painel-streetview').classList.remove('hidden', 'w-full');
    document.getElementById('painel-streetview').classList.add('flex-1');
    document.getElementById('painel-status').classList.remove('hidden');
    document.getElementById('painel-mapa').classList.remove('w-full', 'border-l-0');
    document.getElementById('painel-mapa').classList.add('border-l', 'flex', 'flex-col');
    document.getElementById('barra-acao').classList.remove('hidden');

    setTimeout(() => map.invalidateSize({ animate: false }), 50);
}

function ativarModoMapaResultado() {
    document.getElementById('main-game').classList.add('modo-resultado');
    document.getElementById('header-jogo').classList.remove('hidden');
    document.getElementById('header-jogo').classList.add('flex');
    document.getElementById('barra-tempo-wrapper').classList.add('hidden');
    document.getElementById('painel-streetview').classList.add('hidden');
    document.getElementById('painel-status').classList.add('hidden');
    document.getElementById('painel-mapa').classList.remove('border-l');
    document.getElementById('painel-mapa').classList.add('w-full', 'border-l-0');
    document.getElementById('barra-acao').classList.add('hidden');

    setTimeout(() => map.invalidateSize({ animate: false }), 50);
}

function voltarAoInicio() {
    document.getElementById('tela-resultado').classList.remove('flex');
    document.getElementById('tela-resultado').classList.add('hidden');
    restaurarInterfaceCompleta();
    document.getElementById('tela-inicio').classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('btn-enviar').innerHTML = `<i data-lucide="check-circle" class="w-5 h-5"></i> Confirmar Palpite`;

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// =========================================================================
// 2. INICIALIZAÇÃO DO MAPA (LEAFLET)
// =========================================================================

// Cria o mapa focado no centro geográfico do Brasil com zoom amplo (4)
const map = L.map('map', {
    zoomControl: false,
    maxBounds: limitesBrasil,
    maxBoundsViscosity: 1.0,
    minZoom: 5,
    maxZoom: 18,
    worldCopyJump: false
}).setView([-14.2350, -51.9253], 5);
L.control.zoom({ position: 'topright' }).addTo(map);
map.setMaxBounds(limitesBrasil);
window.brazilGuessrMap = map;

// Carrega as imagens do mapa do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

let avisoMapaTimeout = null;

function mostrarAvisoMapa(mensagem) {
    const avisoMapa = document.getElementById('aviso-mapa');
    if (!avisoMapa) return;

    avisoMapa.innerText = mensagem;
    avisoMapa.classList.remove('hidden');

    if (avisoMapaTimeout) {
        clearTimeout(avisoMapaTimeout);
    }

    avisoMapaTimeout = setTimeout(() => {
        avisoMapa.classList.add('hidden');
    }, 2200);
}

// Escuta o clique do jogador no mapa para registrar o palpite
map.on('click', function(evento) {
    // Se a rodada já acabou, não deixa o jogador mudar o palpite
    if (jogoFinalizado) return;

    if (!limitesBrasil.contains(evento.latlng)) {
        mostrarAvisoMapa('Essa região não é brasileira.');
        return;
    }

    palpiteJogador = evento.latlng;
    tempoEsgotadoSemPalpite = false;

    // Se já existia um palpite anterior, remove para colocar o novo
    if (marcadorPalpite) {
        map.removeLayer(marcadorPalpite);
    }

    // Cria o marcador azul clássico no local do clique
    marcadorPalpite = L.marker(palpiteJogador).addTo(map);
});

// =========================================================================
// 3. FLUXO DAS TELAS DE INÍCIO
// =========================================================================

// Passo 1: Executado ao clicar em "Iniciar Jogo" na primeira tela
function mostrarRegiaoDoDia() {
    document.getElementById('tela-inicio').classList.add('opacity-0', 'pointer-events-none');
    
    // Sorteia uma região aleatória
    const indice = Math.floor(Math.random() * regioesDoJogo.length);
    regiaoSorteada = regioesDoJogo[indice];
    
    // Atualiza os textos da interface
    document.getElementById('nome-regiao').innerText = regiaoSorteada;
    document.getElementById('badge-regiao').innerText = regiaoSorteada.toUpperCase();
    
    // Abre o popup informativo da região do dia
    const popupRegiao = document.getElementById('tela-regiao');
    popupRegiao.classList.remove('hidden');
    popupRegiao.classList.add('flex');

    setTimeout(() => map.invalidateSize({ animate: false }), 50);
}

// Passo 2: Executado ao clicar em "Vamos lá!" no popup da região
function comecarPartida() {
    document.getElementById('tela-regiao').classList.remove('flex');
    document.getElementById('tela-regiao').classList.add('hidden');
    document.getElementById('tela-inicio').classList.add('opacity-0', 'pointer-events-none');
    
    iniciarNovaRodada();

    setTimeout(() => map.invalidateSize({ animate: false }), 100);
}

// =========================================================================
// 4. LÓGICA DO JOGO (SORTEIO, TEMPO, DISTÂNCIA E PONTOS)
// =========================================================================

// Função que escolhe um lugar aleatório da região e atualiza o Street View
function iniciarNovaRodada() {
    // Limpa marcações anteriores do mapa se houver
    if (marcadorPalpite) map.removeLayer(marcadorPalpite);
    if (marcadorReal) map.removeLayer(marcadorReal);
    if (linhaConexao) map.removeLayer(linhaConexao);
    
    palpiteJogador = null;
    jogoFinalizado = false;
    tempoEsgotadoSemPalpite = false;

    // Sorteia um local específico dentro da região sorteada do dia sem repetir até a lista acabar
    const listaLocaisDaRegiao = bancoLocais[regiaoSorteada];
    const indicesDisponiveis = listaLocaisDaRegiao
        .map((_, indice) => indice)
        .filter(indice => !locaisJaSorteadosPorRegiao[regiaoSorteada].has(indice));

    if (indicesDisponiveis.length === 0) {
        locaisJaSorteadosPorRegiao[regiaoSorteada].clear();
    }

    const indicesRecarregados = listaLocaisDaRegiao
        .map((_, indice) => indice)
        .filter(indice => !locaisJaSorteadosPorRegiao[regiaoSorteada].has(indice));
    const indiceAleatorio = indicesRecarregados[Math.floor(Math.random() * indicesRecarregados.length)];
    localAtual = listaLocaisDaRegiao[indiceAleatorio];
    locaisJaSorteadosPorRegiao[regiaoSorteada].add(indiceAleatorio);

    // Atualiza o <iframe> com um formato de embed próprio para Street View
    const iframe = document.getElementById('sv-iframe');
    iframe.src = `https://www.google.com/maps?cbll=${localAtual.lat},${localAtual.lng}&layer=c&cbp=12,${localAtual.heading},0,0,0&output=svembed`;

    // Reseta o mapa para o zoom inicial do Brasil
    map.setView([-14.2350, -51.9253], 5);
    setTimeout(() => map.invalidateSize({ animate: false }), 50);

    // Configura e inicia o cronômetro de 2 minutos
    clearInterval(intervaloCronometro);
    tempoRestante = 120;
    atualizarInterfaceTempo();
    intervaloCronometro = setInterval(contarTempo, 1000);
}

// Função que subtrai o tempo a cada segundo
function contarTempo() {
    if (tempoRestante > 0 && !jogoFinalizado) {
        tempoRestante--;
        atualizarInterfaceTempo();
    } else if (tempoRestante <= 0 && !jogoFinalizado) {
        // Se o tempo esgotar, força a verificação do palpite automaticamente
        clearInterval(intervaloCronometro);
        tempoEsgotadoSemPalpite = !palpiteJogador;
        alert("O tempo acabou! Vamos ver o local correto.");
        verificarPalpite();
    }
}

// Atualiza o texto do relógio e a barra de progresso visual do topo
function atualizarInterfaceTempo() {
    const minutos = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
    const segundos = (tempoRestante % 60).toString().padStart(2, '0');
    document.getElementById('cronometro').innerText = `${minutos}:${segundos}`;

    const porcentagem = (tempoRestante / 120) * 100;
    document.getElementById('barra-tempo').style.width = `${porcentagem}%`;
}

// Função matemática para calcular os pontos de 0 a 5000 (Fórmula baseada no GeoGuessr)
function calcularPontuacao(distanciaKm) {
    if (distanciaKm <= 0.05) return 5000; // Menos de 50 metros = Pontuação Máxima
    if (distanciaKm > 3000) return 0;     // Mais de 3000 km de distância = 0 pontos

    const pontos = 5000 * Math.exp(-distanciaKm / 300);
    return Math.round(pontos);
}

function atualizarModalResultado(localNome, distanciaTexto, pontosRodada, pontosTotaisAcumulados) {
    document.getElementById('resultado-local').innerText = localNome;
    document.getElementById('resultado-rodada').innerText = pontosRodada.toString();
    document.getElementById('resultado-total').innerText = pontosTotaisAcumulados.toString();
    document.getElementById('resultado-distancia').innerText = distanciaTexto;
    document.getElementById('resultado-diferenca').innerText = distanciaTexto;
    document.getElementById('placar-total').innerText = pontosTotaisAcumulados.toString();
    document.getElementById('tela-resultado').classList.remove('hidden');
    document.getElementById('tela-resultado').classList.add('flex');
}

function fecharResultadoEVoltar() {
    document.getElementById('tela-resultado').classList.remove('flex');
    document.getElementById('tela-resultado').classList.add('hidden');
    ativarModoMapaResultado();
}

// Função disparada ao clicar no botão "Confirmar Palpite"
function verificarPalpite() {
    if (jogoFinalizado) {
        // Se a rodada acabou e o botão virou "Voltar ao Início", recarrega a tela inicial
        voltarAoInicio();
        return;
    }

    const semPalpite = !palpiteJogador;
    if (semPalpite) {
        tempoEsgotadoSemPalpite = true;
    }

    jogoFinalizado = true;
    clearInterval(intervaloCronometro); // Para o relógio imediatamente

    // Calcula a distância usando o método nativo do Leaflet (converte de metros para Km)
    const coordenadaRealLatLng = L.latLng(localAtual.lat, localAtual.lng);
    const distanciaKm = semPalpite ? null : map.distance(palpiteJogador, coordenadaRealLatLng) / 1000;

    // Calcula a pontuação final da rodada
    pontosDaRodada = tempoEsgotadoSemPalpite ? 0 : calcularPontuacao(distanciaKm);
    pontosTotais += pontosDaRodada;
    document.getElementById('placar-total').innerText = pontosTotais.toString();

    // Revela a resposta correta no mapa com um marcador diferenciado
    marcadorReal = L.marker(coordenadaRealLatLng).addTo(map)
        .bindPopup(`<b>${localAtual.nome}</b><br>Você ${semPalpite ? 'não marcou palpite' : `errou por ${distanciaKm.toFixed(1)} km.`}`)
        .openPopup();

    // Desenha uma linha pontilhada ligando o palpite à resposta real
    if (!semPalpite) {
        linhaConexao = L.polyline([palpiteJogador, coordenadaRealLatLng], {
            color: '#f59e0b',
            weight: 3,
            dashArray: '6, 8'
        }).addTo(map);
    }

    // Ajusta a câmera do mapa para mostrar o palpite e a resposta ao mesmo tempo
    if (!semPalpite && marcadorPalpite) {
        const grupoMarcadores = new L.featureGroup([marcadorPalpite, marcadorReal].filter(m => m !== null));
        map.fitBounds(grupoMarcadores.getBounds().pad(0.3));
    } else {
        map.setView(coordenadaRealLatLng, 6);
    }

    // Exibe o resultado em um modal central
    atualizarModalResultado(localAtual.nome, semPalpite ? 'Sem palpite' : `${distanciaKm.toFixed(1)} km`, pontosDaRodada, pontosTotais);
    ativarModoMapaResultado();
    
    // Altera o botão para permitir que o usuário volte ao menu inicial
    document.getElementById('btn-enviar').innerHTML = `<i data-lucide="rotate-ccw" class="w-5 h-5"></i> Voltar ao Início`;

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

document.getElementById('btn-fechar-resultado').addEventListener('click', fecharResultadoEVoltar);
document.getElementById('btn-voltar-inicio-header').addEventListener('click', voltarAoInicio);