// =========================================================================
// 1. CONFIGURAÇÕES E BANCO DE DADOS LOCAL (COORDENADAS DO BRASIL)
// =========================================================================

// O jogo usa a URL pública do Street View no iframe para manter o acesso gratuito.

// Lista de regiões possíveis para o sorteio diário
const regioesDoJogo = ["norte", "nordeste", "centro-oeste", "sudeste", "sul"];

// Banco de dados categorizado por Região
const bancoLocais = {
    "norte": [
        { nome: "Mercado Ver-o-Peso - Belém, PA", lat: -1.4522, lng: -48.5037, heading: 300 },
        { nome: "Teatro Amazonas - Manaus, AM", lat: -3.1302, lng: -60.0234, heading: 135 }
    ],
    "nordeste": [
        { nome: "Pelourinho - Salvador, BA", lat: -12.9716, lng: -38.5089, heading: 0 },
        { nome: "Praia de Ponta Negra - Natal, RN", lat: -5.8856, lng: -35.1719, heading: 45 }
    ],
    "centro-oeste": [
        { nome: "Esplanada dos Ministérios - Brasília, DF", lat: -15.8005, lng: -47.8642, heading: 90 },
        { nome: "Praça Cívica - Goiânia, GO", lat: -16.6732, lng: -49.2559, heading: 180 }
    ],
    "sudeste": [
        { nome: "Avenida Paulista - São Paulo, SP", lat: -23.5615, lng: -46.6560, heading: 210 },
        { nome: "Copacabana - Rio de Janeiro, RJ", lat: -22.9711, lng: -43.1843, heading: 120 },
        { nome: "Praça da Liberdade - Belo Horizonte, MG", lat: -19.9323, lng: -43.9380, heading: 220 }
    ],
    "sul": [
        { nome: "Ópera de Arame - Curitiba, PR", lat: -25.3853, lng: -49.2765, heading: 180 },
        { nome: "Estátua do Laçador - Porto Alegre, RS", lat: -29.9934, lng: -51.1712, heading: 15 }
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