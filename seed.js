/* Painel de Manutenção da Frota · DEMONSTRAÇÃO
   Todos os dados abaixo são fictícios e gerados no navegador: placas, ordens, oficinas,
   bases, pessoas, valores e laudos foram inventados. As datas acompanham o dia de hoje,
   para a demonstração sempre parecer atual. Nada aqui vem da operação real. */
(function(){
"use strict";
var VER="demo-5",KEEP={pm_theme:1};
var LSO=null;try{LSO=window.localStorage}catch(e){}
function wipe(){if(!LSO)return;Object.keys(LSO).forEach(function(k){if(k.indexOf("pmdb:")===0||(k.indexOf("pm_")===0&&!KEEP[k]))LSO.removeItem(k)})}
window.PMDEMO_RESET=function(){try{wipe()}catch(e){}location.reload()};
/* recomeça do zero quando a versão muda ou depois de 3 dias, para as datas continuarem atuais */
try{var at=+LSO.getItem("pmdb:demoAt")||0;if(LSO.getItem("pmdb:demo")!==VER||Date.now()-at>3*864e5){wipe();LSO.setItem("pmdb:demo",VER);LSO.setItem("pmdb:demoAt",String(Date.now()))}}catch(e){}
if(LSO&&LSO.getItem("pmdb:init")){window.__SEED={};return}

/* ---------- utilidades ---------- */
var s0=20261122;function rnd(){s0|=0;s0=s0+0x6D2B79F5|0;var t=Math.imul(s0^s0>>>15,1|s0);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}
function ri(a,b){return a+Math.floor(rnd()*(b-a+1))}
function pick(a){return a[Math.floor(rnd()*a.length)]}
function wpick(a){var t=0,i;for(i=0;i<a.length;i++)t+=a[i][1];var x=rnd()*t;for(i=0;i<a.length;i++){x-=a[i][1];if(x<=0)return a[i][0]}return a[a.length-1][0]}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(rnd()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
var T0=new Date();T0.setHours(12,0,0,0);
function day(n){return new Date(T0.getTime()+n*864e5)}
function p2(n){return(n<10?"0":"")+n}
function iso(d){return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate())}
function ddmm(d){return p2(d.getDate())+"/"+p2(d.getMonth()+1)}
function brd(d){return ddmm(d)+"/"+d.getFullYear()}
function round2(x){return Math.round(x*100)/100}

/* ---------- frota fictícia ---------- */
var L="ABCDEFGHIJKLMNOPQRSTUVWXYZ",usedP={},usedO={};
function placa(){for(;;){var p=pick("QRSTU")+L[ri(0,25)]+L[ri(0,25)]+ri(0,9)+L[ri(0,9)]+ri(0,9)+ri(0,9);if(!usedP[p]){usedP[p]=1;return p}}}
function ordem(con){for(;;){var o=(con?"A":"")+String(ri(10000,99999));if(!usedO[o]){usedO[o]=1;return o}}}
var TIPOS=[
 {t:"PICAPE LEVE",k:"LEVES",m:["FIORINO","STRADA","SAVEIRO"],v:[3150,3720],w:150,con:true},
 {t:"SUPERVISÃO",k:"LEVES",m:["MOBI","CRONOS","ARGO"],v:[2080,2590],w:92,con:true},
 {t:"PICAPE MÉDIA",k:"LEVES",m:["HILUX CS","S10","RANGER CD FECHADA","HILUX CD"],v:[6240,7380],w:58},
 {t:"FURGÃO",k:"LEVES",m:["DUCATO","MASTER"],v:[4620,5380],w:20},
 {t:"MOTOCICLETA",k:"LEVES",m:["NXR 160","CG 160"],v:[990,1290],w:18},
 {t:"CESTO SIMPLES",k:"PESADOS",m:["9.170 DELIVERY","11.180 DELIVERY","ACCELO 1016"],v:[13600,16400],w:62},
 {t:"CESTO DUPLO",k:"PESADOS",m:["17.190 ROBUST","1719 ATEGO"],v:[17800,20900],w:30},
 {t:"CATAGALHO",k:"PESADOS",m:["14.190 ROBUST"],v:[9100,10400],w:8},
 {t:"ESPECIAL",k:"PESADOS",m:["24.280 CONSTELLATION"],v:[12100,13900],w:8}];
var AREAS=[
 {a:"CENTRO",r:"RJ",c:"ANDRÉ",b:["BASE CENTRAL","BASE PORTO"],w:24},
 {a:"ZONA NORTE",r:"RJ",c:"BEATRIZ",b:["BASE JARDIM","BASE ESTAÇÃO"],w:23},
 {a:"ZONA OESTE",r:"RJ",c:"CAIO",b:["BASE LAGOA","BASE MORRO ALTO"],w:19},
 {a:"BAIXADA",r:"RJ",c:"DÉBORA",b:["BASE RIO NOVO","BASE VILA NOVA"],w:18},
 {a:"VALE",r:"VALE",c:"EDUARDO",b:["BASE SERRA","BASE VALE VERDE"],w:16}];
var FL=[],VAL={};
/* descrição, ano, chassi e implemento: gerador separado, para não mudar o resto dos dados */
var s1=7340021;function r1(){s1|=0;s1=s1+0x6D2B79F5|0;var t=Math.imul(s1^s1>>>15,1|s1);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}
function p1(a){return a[Math.floor(r1()*a.length)]}
var DESC={"PICAPE LEVE":["SUPORTE DE ESCADA | GIROFLEX | SONORIZADOR DE RÉ","CAPOTA MARÍTIMA | GIROFLEX","SUPORTE DE ESCADA | CAIXA DE FERRAMENTAS"],"SUPERVISÃO":["COMPLETO | RASTREADOR","COMPLETO | GIROFLEX"],"PICAPE MÉDIA":["4X4 | SUPORTE DE ESCADA | GIROFLEX","4X4 | CAPOTA | GUINCHO"],"FURGÃO":["BAÚ DE FERRAMENTAS | GIROFLEX","PRATELEIRAS | INVERSOR"],"MOTOCICLETA":["BAÚ TRASEIRO","BAÚ TRASEIRO | PROTETOR DE MOTOR"],"CESTO SIMPLES":["CESTO AÉREO SIMPLES 10M | ISOLAMENTO SIMPLES | CARROCERIA MODULAR","CESTO AÉREO SIMPLES 12M | ISOLADO"],"CESTO DUPLO":["CESTO AÉREO DUPLO 13M | ISOLAMENTO DUPLO","CESTO AÉREO DUPLO 15M | ISOLADO | GUINDAUTO"],"CATAGALHO":["CAÇAMBA BASCULANTE | TRITURADOR"],"ESPECIAL":["GUINDAUTO 20T | CARROCERIA"]};
var IMPL={"CESTO SIMPLES":["CESTO 10M","CESTO 12M"],"CESTO DUPLO":["CESTO DUPLO 13M","CESTO DUPLO 15M"],"CATAGALHO":["CAÇAMBA BASCULANTE"],"ESPECIAL":["GUINDAUTO"],"PICAPE LEVE":["CAPOTA"],"FURGÃO":["BAÚ DE FERRAMENTAS"]};
function chassi(){var c="ABCDEFGHJKLMNPRSTUVWXYZ0123456789",x="9XX";for(var i=0;i<14;i++)x+=c[Math.floor(r1()*c.length)];return x}
function mkx(v,tp){var y=2023+Math.floor(r1()*3);v.md=v.m+" ("+p1(DESC[tp.t]||["COMPLETO"])+")";v.an=y+"/"+(y+(r1()<0.7?1:0));if(r1()<0.85)v.ch=chassi();if(IMPL[tp.t]&&r1()<(tp.k=="PESADOS"?0.9:0.35))v.im=p1(IMPL[tp.t]);return v}
function mkv(tp,ar,res){var con=!res&&tp.con&&rnd()<0.31,v={p:placa(),o:ordem(con),c:res?"FERNANDA":ar.c,a:res?(ar.r=="VALE"?"RESERVA VALE":"RESERVA RJ"):ar.a,b:res?(ar.r=="VALE"?"RESERVA VALE":"RESERVA RJ"):pick(ar.b),s:res?"RESERVA":"EFETIVO",k:tp.k,t:tp.t,m:pick(tp.m),g:con?"ALFA CONECTA":"ALFA",r:ar.r,v:res?0:round2(ri(tp.v[0]*100,tp.v[1]*100)/100)};if(!res)VAL[v.p]=v.v;return mkx(v,tp)}
var TW=TIPOS.map(function(t){return[t,t.w]}),AW=AREAS.map(function(a){return[a,a.w]});
for(var i=0;i<446;i++)FL.push(mkv(wpick(TW),wpick(AW),false));
for(i=0;i<30;i++)FL.push(mkv(wpick(TW.filter(function(x){return x[0].k=="LEVES"||rnd()<0.5})),wpick(AW),true));
var EF=FL.filter(function(x){return x.s=="EFETIVO"}),RS=FL.filter(function(x){return x.s=="RESERVA"});
var BASEAREA={};AREAS.forEach(function(a){a.b.forEach(function(b){BASEAREA[b]=a})});

/* ---------- oficinas, serviços e pessoas (inventados) ---------- */
var OFL=[["AUTO CENTER NOVA ERA",1.0],["MECÂNICA RODA VIVA",1.25],["OFICINA SÃO JORGE",0.85],["FUNILARIA BOA VISTA",1.4],["ELÉTRICA FAÍSCA",0.9],["OF. MÓVEL",0.6]];
var OFP=[["DIESEL FORTE",0.9],["HIDRÁULICA PRIME",1.15],["TRUCK SERVICE CENTRAL",1.5],["ELÉTRICA FAÍSCA",1.0],["OF. MÓVEL",0.7]];
var SPEED={};OFL.concat(OFP).forEach(function(o){SPEED[o[0]]=o[1]});
var GR={
 PREVENTIVA:{s:["REVISAO PREVENTIVA","TROCA DE OLEO E FILTROS","REVISAO DOS FREIOS"],q:"REVISÃO PREVENTIVA POR QUILOMETRAGEM. VERIFICAR FLUIDOS, FILTROS, LUZES E PNEUS."},
 MECANICO:{s:["REPARO NA EMBREAGEM","TROCA DAS PASTILHAS DE FREIO","REPARO NA SUSPENSAO DIANTEIRA","TROCA DOS AMORTECEDORES","TROCA DO COXIM DO MOTOR"],q:"BARULHO NA SUSPENSÃO E FREIO FAZENDO RUÍDO AO PARAR."},
 ELETRICO:{s:["REPARO NO CHICOTE ELETRICO","TROCA DO ALTERNADOR","REPARO NO PAINEL DE INSTRUMENTOS","TROCA DE LAMPADAS E LANTERNAS","TROCA DO MOTOR DE PARTIDA"],q:"LUZES DO PAINEL ACESAS E BATERIA DESCARREGANDO."},
 HIDRAULICO:{s:["REPARO NO CILINDRO HIDRAULICO DA LANCA","TROCA DAS MANGUEIRAS DO HIDRAULICO","REPARO NA BOMBA HIDRAULICA","AJUSTE DAS SAPATAS ESTABILIZADORAS"],q:"LANÇA LENTA PARA SUBIR E VAZAMENTO NO HIDRÁULICO DO CESTO."},
 FUNILARIA:{s:["REPARO NO PARA-CHOQUE TRASEIRO","FUNILARIA NA PORTA TRASEIRA","REPARO NO PARALAMA"],q:"AVARIA NA LATERAL E PARA-CHOQUE AMASSADO."},
 PINTURA:{s:["PINTURA DA LATERAL","PINTURA DO PARA-CHOQUE"],q:"PINTURA DESCASCANDO NA LATERAL."},
 BORRACHARIA:{s:["TROCA DE PNEUS DIANTEIROS","REPARO DO ESTEPE","ALINHAMENTO E BALANCEAMENTO"],q:"PNEU DESGASTADO E VEÍCULO PUXANDO PARA O LADO."},
 ARCONDICIONADO:{s:["RECARGA DO AR-CONDICIONADO","TROCA DO COMPRESSOR DO AR-CONDICIONADO"],q:"AR-CONDICIONADO NÃO GELA."}};
var GL=[["PREVENTIVA",22],["MECANICO",24],["ELETRICO",18],["FUNILARIA",10],["PINTURA",5],["BORRACHARIA",9],["ARCONDICIONADO",7]],GP=GL.concat([["HIDRAULICO",30]]);
var PECA={MECANICO:["KIT DE EMBREAGEM","AMORTECEDORES","PASTILHAS DE FREIO"],ELETRICO:["ALTERNADOR","MÓDULO DO PAINEL","MOTOR DE PARTIDA"],HIDRAULICO:["CILINDRO HIDRAULICO","BOMBA HIDRAULICA","KIT DE MANGUEIRAS"],ARCONDICIONADO:["COMPRESSOR DO AR"],PREVENTIVA:["KIT DE FILTROS"],BORRACHARIA:["JOGO DE PNEUS"],FUNILARIA:["PARA-CHOQUE NOVO"],PINTURA:["TINTA NA COR DO VEÍCULO"]};
var USU=["CARLOS MOREIRA","JOÃO VIANA","MARCOS LIMA","PAULO SOUZA","RAFAEL COSTA","HEITOR CAMPOS","DIEGO MARTINS","THIAGO ROCHA","BRUNO ARAÚJO","OTÁVIO NUNES","GUSTAVO REIS","LEANDRO DIAS","RENATO FARIAS","SÉRGIO MOURA","VINÍCIUS CRUZ","ANDERSON LOPES","FÁBIO TEIXEIRA","RICARDO BARROS"];
var seqC=2400,seqS=900000000;function code(t,p){seqC+=ri(3,40);return t+"-"+seqC+"-"+p.slice(-4)}

/* ---------- planilha de manutenção (linhas como na planilha original) ---------- */
var MR=[];
function groupsFor(v){var src=v.k=="PESADOS"?GP:GL,n=wpick([[1,55],[2,33],[3,12]]),out=[];while(out.length<n){var g=wpick(src);if(out.indexOf(g)<0)out.push(g)}return out}
function servs(gs){var out=[];gs.forEach(function(g){var a=shuffle(GR[g].s.slice());out.push(a[0]);if(rnd()<0.35&&a[1])out.push(a[1])});return out}
function ensFields(v){if(v.k!="PESADOS")return{st:"",e:"",a:"",t:""};var e=wpick([["NO PRAZO",75],["A VENCER",15],["VENCIDO",10]]),a=wpick([["NO PRAZO",75],["A VENCER",15],["VENCIDO",10]]),t=wpick([["NO PRAZO",85],["A VENCER",10],["VENCIDO",5]]);return{st:(e=="VENCIDO"||a=="VENCIDO"||t=="VENCIDO")?"VEICULO NOK":"VEICULO OK",e:e,a:a,t:t}}
/* stage: 0 coleta · 1 diagnóstico · 2 orçamento · 3 manutenção · 4 pronto · 5 entregue */
function row(v,o){
 var of=o.of||(v.k=="PESADOS"?wpick(OFP.map(function(x){return[x[0],x[0]=="OF. MÓVEL"?14:x[0]=="ELÉTRICA FAÍSCA"?10:25]})):wpick(OFL.map(function(x){return[x[0],x[0]=="OF. MÓVEL"?22:x[0]=="FUNILARIA BOA VISTA"?10:x[0]=="ELÉTRICA FAÍSCA"?10:20]})));
 var gs=o.gs||groupsFor(v),sp=SPEED[of]||1,ens=v.k=="PESADOS"&&rnd()<0.45,rep=ens&&rnd()<0.3,peca=o.peca||(o.stage>=3&&rnd()<0.18);
 /* intervalos entre as etapas (dias) */
 var g=[ri(0,1),Math.max(1,Math.round(ri(1,3)*sp)),Math.max(1,Math.round(ri(1,4)*sp)),Math.max(2,Math.round(ri(2,7)*sp)+(peca?ri(3,7):0)+(gs.length>2?2:0)),ens?ri(2,4)+(rep?ri(3,6):0):0,ri(0,2)];
 var need=0,k,stp=Math.min(o.stage,5);for(k=0;k<Math.min(stp,3);k++)need+=g[k];if(stp>=4)need+=g[3]+g[4];if(stp>=5)need+=g[5];
 var wait=o.stage>=5?0:ri(0,o.stage==0?1:o.stage==1?3:o.stage==2?4:o.stage==3?(peca?10:7):3);
 var start=o.start!=null?o.start:-(need+wait);
 var d=[day(start)];for(k=0;k<5;k++)d.push(new Date(d[k].getTime()+g[k]*864e5));
 /* d: 0 direcionado/SMV · 1 entrada · 2 orçamento · 3 aprovação · 4 pronto na oficina · 5 pronto (após ensaio) · conclusão = 5 + g[5] */
 var con=v.g=="ALFA CONECTA",concl=new Date(d[5].getTime()+g[5]*864e5),ef=ensFields(v),pl=v.p;
 var ob=[],lastH="",add=function(dt,lines){var h=ddmm(dt);if(h===lastH)ob.pop();else ob.push(h);lastH=h;lines.forEach(function(l){ob.push(l.charAt(0)=="°"?l:"- "+l)});ob.push("")};
 add(d[0],["DIRECIONADO PARA "+of+" Código gerado: "+code("RET",pl)]);
 if(o.stage>=1)add(d[1],["ENTRADA NA OFICINA"]);
 if(o.stage>=2)add(d[2],["ORÇAMENTO ENVIADO PARA APROVACAO"]);
 var sv=servs(gs);
 if(o.stage>=3){add(d[3],["ORÇAMENTO APROVADO","SERVICOS DE"].concat(sv.map(function(s){return"° "+s})).map(function(l){return l}));if(peca){var pc=pick(PECA[gs[0]]||["PEÇA DE REPOSIÇÃO"]),dp=new Date(d[3].getTime()+864e5);if(dp<=T0)add(dp,["AGUARDANDO PEÇA ("+pc+")"])}}
 if(o.stage>=4){
  if(ens){add(d[4],["PRONTO PARA ENTREGA NA OFICINA","DIRECIONADO PARA LABTEC PARA ENSAIO ACUSTICO Código gerado: "+code("TIT",pl)]);
   var de=new Date(d[4].getTime()+ri(1,2)*864e5);
   if(rep&&de<d[5]){add(de,["REPROVADO NO ACUSTICO NA LABTEC","DIRECIONADO PARA "+of+" PARA FAZER REPAROS Código gerado: "+code("TIT",pl)]);var dr=new Date(de.getTime()+ri(1,2)*864e5);if(dr<d[5])add(dr,["REPAROS DO ACUSTICO CONCLUIDOS","DIRECIONADO PARA LABTEC PARA REFAZER ENSAIO ACUSTICO Código gerado: "+code("TIT",pl)])}
   if(d[5]<=T0)add(d[5],["APROVADO NA LABTEC","PRONTO PARA ENTREGA NA LABTEC"])}
  else add(d[4],["PRONTO PARA ENTREGA NA OFICINA"])}
 if(o.stage>=5)add(concl,["VEÍCULO ENTREGUE NA "+v.b+" Código gerado: "+code("DEV",pl)]);
 if(o.cancel)add(T0,["CLIENTE PEDIU CANCELAMENTO DA SMV (VEÍCULO SEGUE RODANDO)"]);
 var pv="";if(o.stage>=3){var pvd=new Date(d[3].getTime()+Math.round((ri(3,8)+(peca?4:0))*sp)*864e5);pv=iso(pvd)}else if(o.stage==2&&rnd()<0.5)pv=iso(new Date(d[2].getTime()+ri(4,9)*864e5));
 if(o.stage>=4)pv=iso(new Date(d[5].getTime()+ri(0,2)*864e5));
 var r={"TEM1":"","TEM":"","CT":"EFETIVO","CATEGORIA":v.k=="PESADOS"?"PESADO":"LEVE","STATUS":"","RESERVA":"","CONDIÇÃO SAP":"",
  "STATUS ENSAIO":ef.st,"ENSAIO ELÉTRICO2":ef.e,"ENSAIO ACÚSTICO":ef.a,"ENSAIO TACÓGRAFO":ef.t,"ATD":"","SMV":String(seqS+=ri(7,90)),
  "PLACA":pl,"MODELO":v.m,"ORDEM":v.o,"ORIGEM":v.b,"DESTINO":of,"USUÁRIO":pick(USU),"TELEFONE":"(00) 90000-"+p2(ri(10,99))+p2(ri(10,99)),
  "SOLICITAÇÃO DO USUÁRIO":gs.map(function(x,i){return(i+1)+". "+GR[x].q}).join("\n")+(ens?"\nATIVIDADES PARA REALIZAR DURANTE A PARADA:\n• ENSAIO ACÚSTICO":""),
  "GRUPO DE SERVIÇO2":gs.join("-"),"OBSERVAÇOES":ob.join("\n").trim(),"STATUS REPORT":"","STATUS 1":"",
  "DATA SMV":iso(d[0]),"DT ENTRADA OFICINA":o.stage>=1?iso(d[1]):"","DT ORÇAMENTO":o.stage>=2?iso(d[2]):"","DT APROVAÇÃO":o.stage>=3?iso(d[3]):"",
  "PREVISÃO PEÇAS":peca&&o.stage==3?iso(day(ri(2,6))):"","DT PRONTO":o.stage>=4?iso(d[5]):"","PREVISÃO DEVOLUÇÃO":pv,"DATA CONCLUSÃO":o.stage>=5?iso(concl):"",
  "AG. PEÇA?":!!(peca&&o.stage==3),"AG. VALIDAÇÃO?":!!o.valid,"CANCELAR?":!!o.cancel,"APROVADOR":o.stage>=3?pick(["GESTOR ALFA 1","GESTOR ALFA 2","GESTOR ALFA 3"]):"","ALÇADA":o.stage>=3?pick(["ATÉ R$ 5 MIL","ATÉ R$ 15 MIL","ACIMA DE R$ 15 MIL"]):"","ORDEM DE SERVIÇO":"","_c":v.g};
 if(o.rt)r["SOLICITAÇÃO DO USUÁRIO"]="RETRABALHO: "+r["SOLICITAÇÃO DO USUÁRIO"];
 r._end=o.stage>=5?concl:null;return r}

/* veículos parados hoje, em todas as etapas */
var pool=shuffle(EF.slice()),busy={};
function take(pref){for(var i=0;i<pool.length;i++){var v=pool[i];if(busy[v.p])continue;if(pref&&v.k!=pref&&rnd()<0.7)continue;busy[v.p]=1;return v}return null}
[[0,3],[1,5],[2,4],[2,2,{valid:true}],[3,10],[3,4,{peca:true}],[4,5],[1,1,{cancel:true}]].forEach(function(z){for(var n=0;n<z[1];n++){var v=take(rnd()<0.45?"PESADOS":"LEVES");var o={stage:z[0]};if(z[2])for(var k in z[2])o[k]=z[2][k];MR.push(row(v,o))}});
/* histórico: veículos que passaram pela manutenção nos últimos ~4 meses */
var hist=0,guard=0,IV={};function free(p,a,b){return!(IV[p]||[]).some(function(x){return a<=x[1]+864e5&&b>=x[0]-864e5})}
function mark(p,a,b){(IV[p]=IV[p]||[]).push([a,b])}
while(hist<165&&guard++<3000){var v=pool[ri(0,pool.length-1)];if(busy[v.p])continue;var st=-ri(6,125);var r=row(v,{stage:5,start:st});var a0=day(st).getTime(),b0=r._end.getTime();if(r._end>=day(0)||!free(v.p,a0,b0))continue;MR.push(r);mark(v.p,a0,b0);hist++;
 /* alguns voltam em até 20 dias para o mesmo serviço (retrabalho) */
 if(rnd()<0.035){var back=Math.round((r._end-T0)/864e5)+ri(3,15),gs=r["GRUPO DE SERVIÇO2"].split("-");if(back<-1){var r2=row(v,{stage:5,start:back,gs:gs,of:r.DESTINO,rt:true}),a2=day(back).getTime();if(r2._end<day(0)&&free(v.p,a2,r2._end.getTime())){MR.push(r2);mark(v.p,a2,r2._end.getTime());hist++}}}}
MR.sort(function(a,b){return a["DATA SMV"]<b["DATA SMV"]?-1:1});
MR.forEach(function(r){delete r._end});

/* reservas cobrindo alguns titulares parados */
var RES={},act=MR.filter(function(r){return!r["DATA CONCLUSÃO"]&&!r["CANCELAR?"]&&r["DT ENTRADA OFICINA"]});
shuffle(act.slice()).slice(0,4).forEach(function(r,i){RES[r.PLACA]={s:"p",f:"comite",d:iso(T0),r:RS[i].p,i:r["DATA SMV"],c:RS[i].c}});

/* ---------- laudos de ensaios (links para uma página de exemplo) ---------- */
var PES=EF.filter(function(x){return x.k=="PESADOS"}),LAU=[];
PES.forEach(function(v){["ELÉTRICO","ACÚSTICO","TACÓGRAFO"].forEach(function(t){var dd=day(-ri(15,340));LAU.push({PLACA:v.p,TIPO:"ENSAIO "+t,FORNECEDOR:pick(["LABTEC ENSAIOS","LABTEC ENSAIOS","CERTIFICA LAB"]),DATA:brd(dd),LINK:"laudo.html?p="+v.p+"&t="+encodeURIComponent(t)+"&d="+encodeURIComponent(brd(dd))+"&o="+v.o})})});

/* ---------- mapa: bases, oficinas e ensaio em pontos aproximados, nomes inventados ---------- */
var GEO={v:1,u:Date.now(),by:"demonstração",fn:"enderecos-demo.xlsx",P:[]};
function gp(id,n,a,la,lo,k,c,s,v){GEO.P.push({id:id,n:n,a:a,la:la,lo:lo,k:k,c:c||"",s:s||"",v:v||""})}
[["BASE CENTRAL",-22.9128,-43.2318],["BASE PORTO",-22.8988,-43.2215],["BASE JARDIM",-22.8405,-43.2752],["BASE ESTAÇÃO",-22.9012,-43.2801],["BASE LAGOA",-22.8796,-43.4302],["BASE MORRO ALTO",-22.8752,-43.4651],["BASE RIO NOVO",-22.7641,-43.3994],["BASE VILA NOVA",-22.8073,-43.4138],["BASE SERRA",-22.4695,-44.4468],["BASE VALE VERDE",-22.5446,-44.1712]].forEach(function(b,i){gp("BASE "+(i+1),b[0],"Endereço fictício",b[1],b[2],"ba",i==0||i==4?"ALFA CONECTA":"ALFA")});
[["AUTO CENTER NOVA ERA",-22.8661,-43.2552,"MECÂNICA, ELÉTRICA","LEVES"],["MECÂNICA RODA VIVA",-22.8402,-43.3727,"MECÂNICA, PREVENTIVA","LEVES"],["OFICINA SÃO JORGE",-22.7833,-43.4301,"MECÂNICA, BORRACHARIA","LEVES"],["FUNILARIA BOA VISTA",-22.8806,-43.2961,"FUNILARIA, PINTURA","LEVES"],["ELÉTRICA FAÍSCA",-22.9151,-43.2452,"ELÉTRICA","LEVES E PESADOS"],["DIESEL FORTE",-22.8072,-43.3602,"MECÂNICA PESADA","PESADOS"],["HIDRÁULICA PRIME",-22.8551,-43.3205,"HIDRÁULICA, CESTO","PESADOS"],["TRUCK SERVICE CENTRAL",-22.9203,-43.6298,"MECÂNICA PESADA, HIDRÁULICA","PESADOS"]].forEach(function(o,i){gp("OFICINA "+(i+1),o[0],"Endereço fictício",o[1],o[2],"of","",o[3],o[4])});
[["CENTRO AUTOMOTIVO UNIÃO",-22.8243,-43.3049,"TODOS OS SERVIÇOS","TODOS OS VEÍCULOS"],["SUSPENSÕES ALFA",-22.8612,-43.3511,"SÓ SUSPENSÃO","LEVES - PICAPES LEVES E MÉDIAS - SUPERVISÃO"],["VIDRAÇARIA CRISTAL",-22.8930,-43.2850,"VIDROS","TODOS OS VEÍCULOS"],["OFICINA PONTE VELHA",-22.8150,-43.3900,"DESCREDENCIADA","DESCREDENCIADA"]].forEach(function(o,i){gp("OFICINA "+(9+i),o[0],"Endereço fictício",o[1],o[2],"of","",o[3],o[4])});
gp("ENSAIO 1","LABTEC","Endereço fictício",-22.8921,-43.2371,"en","","ENSAIO ACÚSTICO, ELÉTRICO E TACÓGRAFO","PESADOS");
gp("LOCADORA 1","GARAGEM DA LOCADORA","Endereço fictício",-22.8322,-43.3251,"lo");

/* ---------- documentos no formato do painel ---------- */
var S={},now=Date.now();
function chunk(prefix,meta,arr){var j=JSON.stringify(arr),Lc=80000,n=Math.max(1,Math.ceil(j.length/Lc));for(var i=0;i<n;i++)S[prefix+i]={j:j.slice(i*Lc,(i+1)*Lc)};S[meta]={n:n,u:now}}
chunk("privado/f","privado/fmeta",FL);
chunk("privado/m","privado/mmeta",MR);
chunk("laudos/c","laudos/meta",LAU);
S["privado/mcfg"]={j:JSON.stringify({lab:{},hid:{},wt:{},hf:{},cf:{},cols:[],z:1})};
S["privado/val"]={m:VAL};
S["privado/res"]={m:RES,info:{upd:brd(T0),at:iso(T0),n:Object.keys(RES).length,sh:1}};
S["privado/geo"]=GEO;
S["laudos/pesados"]={l:PES.map(function(v){return{o:v.o,p:v.p}})};
S["laudos/map"]={d:"DATA",f:"FORNECEDOR",l:"LINK",p:"PLACA",t:"TIPO"};
window.__SEED=S;
})();
/* data mostrada em "Dados atualizados em" */
(function(){var d=new Date();function p(n){return(n<10?"0":"")+n}window.__DEMODT=p(d.getDate())+"/"+p(d.getMonth()+1)+"/"+d.getFullYear()+" 07:30"})();
