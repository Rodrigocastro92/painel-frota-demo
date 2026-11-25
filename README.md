# Painel de Manutenção da Frota · demonstração

Sistema web para controlar a manutenção de uma frota de veículos leves e pesados. Ele substitui a planilha de controle: cada veículo parado tem a sua linha do processo (translado, diagnóstico, aprovação, manutenção, peça, pronto e entrega), e os painéis calculam na hora a disponibilidade da frota, o custo da parada, o atraso das oficinas e o histórico de cada período.

Projeto pessoal de portfólio, pensado a partir da rotina de um controlador de frota. Esta é a versão de demonstração: **todos os dados, nomes e locais são fictícios**.

**Demonstração:** [painel-frota-demo.vercel.app](https://painel-frota-demo.vercel.app) (pode mexer à vontade; as alterações ficam só no seu navegador e o botão "Restaurar dados" volta ao início)

![Resumo no computador](docs/computador-resumo.png)

<p align="center">
  <img src="docs/celular-resumo.png" width="220" alt="Resumo no celular">
</p>

## Funcionalidades

- **Resumo (painel executivo)**: disponibilidade da frota com e sem reservas, veículos em manutenção, tempo médio até a entrega (oficina externa x oficina móvel), devoluções atrasadas, penalidade contratual acumulada e prevista para o fechamento do mês, e a lista do que pede atenção hoje.
- **Manutenção**: a planilha de controle dentro do sistema. Visão em linha do processo ou em tabela, ficha de cada veículo com o diário de observações, filtros e avisos prontos (previsão vencida, entra em penalidade amanhã, sem atualização há 3 dias, orçamento parado), colar linhas direto do Excel e exportar no mesmo formato da planilha.
- **Alertas e aprovações** e **Boletim do dia**, com o texto pronto para enviar no WhatsApp.
- **Etapas e translados**: quantos dias cada veículo ficou em cada etapa e quantas vezes passou por ela, lido automaticamente das observações (ex.: voltou do ensaio para a oficina). Jornada dos veículos em manutenção numa linha do tempo, busca de placa com todo o histórico de translados (inclusive de quem já saiu), rotas mais usadas e translados por semana.
- **Sugestão de oficina**: mapa com bases e oficinas; compara o tempo de translado, a fila atual e o tempo que cada oficina costuma levar para liberar.
- **Ensaios**: laudos por placa (elétrico, acústico e tacógrafo) e ensaios vencidos que podem ser feitos durante a parada.
- **Custo da parada**: penalidade contratual (diária de locação perdida) em tempo real com dias de carência configuráveis, desconto dos dias cobertos por reserva e previsão para o fechamento do mês.
- **Previsão de atraso**: estimativa de saída de cada veículo pela curva de liberação de cada oficina (Kaplan-Meier) e pelo desvio das previsões anteriores.
- **Ranking de oficinas**: nota de 0 a 100 que junta prazo, tempo real ÷ tempo esperado e retornos, ajustada pela complexidade de cada serviço.
- **Histórico e comparativos**: qualquer período contra outro (entradas, entregas, tempo até a entrega, previsão cumprida, disponibilidade, reincidência e penalidade), com exportação em imagem e Excel.
- **Frota e controladores**: consulta da base de frota (modelo, descrição, ano, chassi e implemento), titulares e reservas por controlador.
- **Nova entrada e chamado no WhatsApp**: colar a linha da planilha de translado preenche a ficha; o texto do chamado sai pronto para o WhatsApp.

<p align="center">
  <img src="docs/computador-manutencao.png" width="49%" alt="Manutenção: linha do processo">
  <img src="docs/computador-etapas.png" width="49%" alt="Etapas do processo">
  <img src="docs/computador-translados.png" width="49%" alt="Jornada dos veículos e translados">
  <img src="docs/computador-consultar-frota.png" width="49%" alt="Consultar frota">
  <img src="docs/computador-custo-da-parada.png" width="49%" alt="Custo da parada">
  <img src="docs/computador-ranking-oficinas.png" width="49%" alt="Ranking de oficinas">
  <img src="docs/computador-historico.png" width="49%" alt="Histórico e comparativos">
  <img src="docs/computador-ensaios.png" width="49%" alt="Laudos de ensaios">
</p>

## Tecnologias

| Parte | Escolha |
|---|---|
| Interface | HTML, CSS e JavaScript puros, sem framework e sem etapa de build |
| Planilhas | [SheetJS](https://sheetjs.com) para ler e gerar arquivos do Excel |
| Mapas e rotas | OpenStreetMap e OSRM |
| Versão completa | Função serverless em Node.js na Vercel, banco Upstash Redis, login com cookie assinado (HMAC), senhas com scrypt e limite de tentativas, backup diário por e-mail |
| Esta demonstração | Site estático; roda só no navegador |

### Na versão completa (fora desta demonstração)

- **Perfis de acesso**: controlador (edita os próprios veículos), gestor (vê tudo, sem editar) e cliente (só visualiza e extrai relatórios). Cada controlador tem o seu espaço, e o gestor vê o consolidado.
- **Sincronização com o Excel online**: um script dentro da planilha leva para o Excel o que foi editado no painel e traz para o painel o que foi editado na planilha.
- **Cópia de segurança automática** todos os dias no fim do expediente.

## Sobre os dados desta demonstração

Os dados são gerados no navegador pelo arquivo `seed.js`, com datas relativas ao dia de hoje, para a demonstração sempre parecer atual. Contratos ("Horizonte" e "Prisma"), cidades, bases, oficinas, placas, números de ordem e de protocolo, pessoas, valores de locação e laudos são inventados. As regras de cálculo (carência da penalidade, reservas, retrabalho e disponibilidade) seguem o modelo comum de contratos de locação de frota.

## Estrutura

```
index.html                o painel
seed.js                   dados fictícios da demonstração
laudo.html                exemplo de laudo aberto pela aba Ensaios
vendor/xlsx.full.min.js   SheetJS (licença Apache 2.0)
docs/                     imagens deste README
```

Para rodar no computador, basta abrir o `index.html` no navegador ou usar `npx serve .`.

## Créditos

Projeto de [Rodrigocastro92](https://github.com/Rodrigocastro92). Código escrito com apoio de IA (Claude, da Anthropic); as regras, as telas e os testes foram definidos a partir da rotina de controle de manutenção de frotas.

---

## English summary

**Fleet Maintenance Dashboard** is a web app that replaces a maintenance-control spreadsheet for a fleet of light and heavy vehicles. Each vehicle in the shop gets a process timeline (pickup, diagnosis, approval, repair, parts, ready, delivery), and the dashboards compute fleet availability, downtime cost (contract penalties with a grace period and backup-vehicle coverage), workshop delays and rankings adjusted by job complexity, Kaplan-Meier release forecasts and period-over-period history. Built with vanilla HTML/CSS/JS in a single file, SheetJS for Excel import/export, OpenStreetMap/OSRM for maps and routes. The full version runs on a Node.js serverless function on Vercel with Upstash Redis, signed-cookie login, scrypt-hashed passwords, role-based access and daily backups. This repository is a static demo with generated sample data: https://painel-frota-demo.vercel.app
