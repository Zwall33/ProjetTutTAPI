
var DonneePompe = "Pompe1";
var DonneeEtatPompe = 0;
var DonneeVitesse = new Array(4);
var numeroPompe = 0;

var getEtatPompe = new Array(4);
var getVitessePompe = new Array(4);

var getEtatPompeSauvegarde = new Array(4);
var getVitessePompeSauvegarde = new Array(4);

var xhttp = new XMLHttpRequest();

DonneeVitesse[0] = 0;
DonneeVitesse[1] = 0;
DonneeVitesse[2] = 0;
DonneeVitesse[3] = 0;

function variation(pompe,srcvar){
  MODIF = 1;
  numeroP(pompe);
  DonneePompe = pompe;
  if(srcvar == 'bouton'){
      var p = document.getElementById(pompe);
      traitementVariationPompe(p);
      envDonneesBouton(DonneePompe,DonneeEtatPompe);
    } else {
      traitementVariationVitesse(pompe,srcvar);
      envDonneesVitesse(DonneeVitesse[numeroPompe],numeroPompe);
    }
}

function numeroP(pompe){
  switch(pompe) {
    case 'Pompe1':
        numeroPompe = 0;
    break;
    case 'Pompe2':
      numeroPompe = 1;
    break;
    case 'Pompe3':
        numeroPompe = 2;
    break;
    case 'Pompe4':
      numeroPompe = 3;
    break;
  }
}

function changeImage(gEBId){
  var v = gEBId.getAttribute("src");
  if(v == "./images/pompe_off.png"){
    v = "./images/pompe_on.png";
    gEBId.className = "pompe_on";
  }
  else{
    v = "./images/pompe_off.png";
    gEBId.className = "pompe_off";
  }
  gEBId.setAttribute("src", v); 
}

function traitementVariationPompe(gEBId){
  var etatpompe = gEBId.className;
  if(etatpompe != "pompe_on"){
    DonneeEtatPompe = 1;
  } else {
    DonneeEtatPompe = 0;
  }
}

function traitementVariationVitesse(pompe,rbposition){
  gEBId = document.getElementById("Radio"+pompe+"_"+rbposition);
  DonneeVitesse[numeroPompe] = gEBId.value;
}

function envDonneesBouton(pompe,etat){
  var updatePompe = ("UPDATE `pompe` SET `"+pompe+"`="+etat);//////var updatePompe = ("UPDATE `pompe` SET `"+pompe+"`="+etat+",`vit_pompe"+numpompe+"`="+vitesse);
  $(function(){
    console.log(updatePompe);
    $.ajax({
      type: 'post',
      data:{str:updatePompe},
      url: '/dbIndex/upPompe',
      success: function (data) {
          alert(data);
      }
    })
  });
}

function envDonneesVitesse(vitesse,numpompe){
  numpompe ++;
  var updatePompe = ("UPDATE `pompe` SET `vit_pompe"+numpompe+"`="+vitesse);//////var updatePompe = ("UPDATE `pompe` SET `"+pompe+"`="+etat+",`vit_pompe"+numpompe+"`="+vitesse);
  $(function(){
    console.log(updatePompe);
    $.ajax({
      type: 'post',
      data:{str:updatePompe},
      url: '/dbIndex/upPompe',
      success: function (data) {
          alert(data);
      }
    })
  });
}


function checkState() {
  var myVar = setInterval(checkBDD, 500);
}

function setPompe(nump,etat){
  var p = document.getElementById("Pompe"+nump);
  var v = p.getAttribute("src");
  if( etat == 1 ){
    v = "./images/pompe_on.png";
      p.className = "pompe_on";
  } else {
    v = "./images/pompe_off.png";
      p.className = "pompe_off";
  }
  p.setAttribute("src", v);
}

function setVitesse(nump,vitesse){
  var p = document.getElementById("RadioPompe"+nump+"_"+vitesse);
  p.checked = true;
}

function getEtat(getE){
  $(function(){ //attention blocage CORS donc ajout d'extention "Allow-Control-Allow-Origin: *" à chrome
      $.get('/dbIndex/etat_Pompe', {},function(row){

        getE[0]=row[0].Pompe1;
        getE[1]=row[0].Pompe2;
        getE[2]=row[0].Pompe3;
        getE[3]=row[0].Pompe4;

        });
    });
}

function getVitesse(getV){
  $(function(){ //attention blocage CORS donc ajout d'extention "Allow-Control-Allow-Origin: *" à chrome
      $.get('/dbIndex/vitesse_Pompe', {},function(row){

        getV[0]=row[0].vit_pompe1;
        getV[1]=row[0].vit_pompe2;
        getV[2]=row[0].vit_pompe3;
        getV[3]=row[0].vit_pompe4;

        });
    });
}

function checkBDD() { //fonction qui check les valeurs de la base de donné
  getEtat(getEtatPompe);
 	getVitesse(getVitessePompe);
  for(i = 0; i < 4; i++){
    setPompe(i+1,getEtatPompe[i]);
    setVitesse(i+1,getVitessePompe[i]);
  }
}

checkState();