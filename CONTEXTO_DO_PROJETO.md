# Contexto do Projeto BrazilGuessr

## Visão geral

O BrazilGuessr é um jogo web de adivinhação geográfica focado exclusivamente no território brasileiro. A experiência imita a lógica de jogos de geolocalização: o jogador vê uma cena em Street View, precisa interpretar pistas visuais e marcar no mapa onde acredita que está. Depois disso, o sistema calcula a distância entre o palpite e o local real e gera uma pontuação acumulada.

O objetivo do projeto é entregar uma versão funcional, gratuita para o desenvolvedor, sem backend próprio, sem banco de dados externo e sem dependências pagas para a lógica central do jogo.

## Objetivo do jogo

O jogador deve descobrir onde está dentro do Brasil usando apenas a imagem 360° do Google Street View exibida em iframe. O palpite é feito no mapa Leaflet/OpenStreetMap do lado direito da tela. Cada rodada possui tempo limitado, pontuação baseada na distância e um fluxo claro de início, jogo, resultado e retorno ao menu.

## Fluxo principal

### 1. Tela inicial

Ao abrir a aplicação, o usuário vê uma tela inicial escura, moderna e centralizada, com o nome BrasilGuessr, ícone animado e instruções curtas.

### 2. Sorteio da região

Ao iniciar o jogo, uma região brasileira é sorteada entre:

- norte
- nordeste
- centro-oeste
- sudeste
- sul

Essa região é mostrada como desafio da rodada. O jogador clica em “Vamos lá!” para começar.

### 3. Gameplay

O layout é dividido em duas partes:

- lado esquerdo: Street View 360° do local sorteado
- lado direito: mapa interativo do Brasil para o palpite

No topo existe um cronômetro regressivo de 2 minutos, barra de tempo e indicadores de região e pontuação.

### 4. Finalização

Quando o jogador confirma o palpite ou o tempo acaba, o jogo revela o local correto, mostra a distância entre o palpite e o alvo, aplica a pontuação da rodada e soma a pontuação total.

Depois disso, a interface entra em um modo de resultado com mapa em destaque, modal central e um header com botão de retorno ao início.

## Arquitetura técnica

### Frontend

O projeto é um frontend puro composto por dois arquivos principais:

- [index.html](index.html)
- [script.js](script.js)

Não há framework de SPA, bundler ou backend. A interação é feita diretamente no navegador.

### Tecnologias usadas

- Tailwind CSS via CDN para estilização rápida e responsiva
- Leaflet.js para mapa interativo
- OpenStreetMap como base de tiles do mapa
- Google Maps Street View via embed em iframe
- Lucide para ícones

### Estratégia de gratuidade

O projeto foi desenhado para não depender de infra própria ou de APIs pagas no fluxo principal. A lógica do jogo, pontuação, sorteio e UI são todos locais no navegador.

## Funcionamento interno

### Sorteio de regiões e locais

O arquivo `script.js` contém um banco local de locais brasileiros divididos por região. Cada local possui:

- nome
- latitude
- longitude
- heading da câmera

Quando uma rodada começa, o sistema escolhe um local aleatório da região sorteada.

### Evitar repetição de locais

Já existe uma regra para evitar repetir o mesmo local até a lista da região esgotar. O controle é feito com `Set` por região. Quando todos os locais de uma região já foram usados, a lista é reiniciada.

### Street View

O local selecionado é carregado em um iframe usando URL de embed do Google Maps Street View. A URL é montada com latitude, longitude e heading do local sorteado.

### Mapa de palpites

O mapa da direita usa Leaflet com OpenStreetMap. O jogador marca um ponto com clique e esse ponto vira o palpite da rodada.

### Restrição ao Brasil

O mapa é limitado ao território brasileiro com `maxBounds` e também há uma checagem no clique. Se o usuário clicar fora do Brasil, aparece o aviso “Essa região não é brasileira.” e o palpite não é aceito.

### Zoom do mapa

O mapa foi configurado para permitir zoom-in forte, mas sem afastar demais. O comportamento atual evita que o mapa fique muito aberto e ajuda o jogador a manter foco no Brasil.

### Pontuação

A pontuação da rodada usa uma fórmula exponencial baseada na distância em quilômetros.

Regras principais:

- menos de 50 metros: 5000 pontos
- mais de 3000 km: 0 pontos
- caso o tempo acabe sem palpite: 0 pontos

A pontuação total é acumulada entre rodadas.

## Estado atual da interface

### Modo normal

O modo normal exibe:

- tela inicial
- região sorteada
- Street View à esquerda
- mapa de palpites à direita
- cronômetro
- pontuação total
- botão confirmar palpite

### Modo de resultado

Quando a rodada termina:

- o jogo mostra uma box/modal central com os resultados
- o mapa pode ficar em destaque
- o header do modo resultado aparece com o botão de voltar ao início
- a tela pode alternar para um estado de mapa-only conforme a lógica atual

## Regras já implementadas

- A região do dia é sorteada entre as 5 regiões do Brasil.
- O jogador joga contra o tempo.
- O mapa aceita apenas cliques dentro do Brasil.
- O mesmo local não se repete até a lista da região acabar.
- A pontuação é acumulada.
- Existe aviso quando o jogador clica fora do Brasil.
- O resultado da rodada é exibido em modal.
- Há botão para voltar ao início e reiniciar o fluxo.

## Estrutura dos arquivos

### index.html

Contém toda a estrutura da interface:

- tela inicial
- popup de região do dia
- painel principal com Street View e mapa
- modal de resultado
- header do modo resultado

### script.js

Contém toda a lógica do jogo:

- banco de locais
- estado global da partida
- inicialização do Leaflet
- restrição geográfica do mapa
- sorteio da região e do local
- controle do tempo
- cálculo de pontuação
- exibição do resultado
- alternância entre os modos da interface

## Como continuar o projeto

Se outra pessoa for assumir a manutenção, os próximos passos naturais são:

1. Melhorar o visual do header do modo resultado.
2. Adicionar histórico de rodadas e melhores pontuações.
3. Salvar pontuação em `localStorage`.
4. Criar uma rodada diária real com data fixa.
5. Melhorar transições e animações entre telas.
6. Expandir o banco de locais com mais pontos de cada região.
7. Adicionar feedback visual mais forte para acerto, erro e tempo esgotado.

## Observações importantes

- O projeto não usa backend.
- O mapa e o Street View dependem de recursos externos carregados no navegador.
- O estado da interface é controlado manualmente pelo JavaScript.
- Em alguns ambientes, o navegador pode bloquear partes do Street View ou do OpenStreetMap dependendo de restrições de rede.
- O uso de Tailwind via CDN funciona bem para protótipo, mas para produção o ideal seria empacotar ou instalar localmente.

## Resumo executivo

BrazilGuessr é um jogo web leve, gratuito e focado em geografia do Brasil. A experiência atual já tem:

- tela inicial
- sorteio de região
- Street View 360°
- mapa Leaflet restrito ao Brasil
- cronômetro de 2 minutos
- pontuação por distância
- acumulação de pontos
- modal de resultado
- retorno ao início

O projeto está pronto para continuidade incremental sem precisar reestruturar a base principal.