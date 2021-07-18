class Lap {
    constructor (a,b,c)
    {
        this.c1 = a;
        this.c2 = b;
        this.c3 = c;
    }
}
var vs = document.getElementById("Road");
var papel = vs.getContext("2d");
var boton = document.getElementById ("boton");
var reset = document.getElementById ("reset");
var screen = document.getElementById ("screen");
var sonidos = {
    race: document.getElementById ("race"),
    happy: document.getElementById ("happy")
}
var carro_uno={
    url: "./assets/carro_uno.png",
    loadOk: false,
    route: 0,
    position: 0
}
var carro_dos={
    url: "./assets/carro_dos.png",
    loadOk: false,
    route: 0,
    position: 0
}
var carro_tres={
    url: "./assets/carro_tres.png",
    loadOk: false,
    route: 0,
    position: 0
}
var road={
    url: "./assets/pista.png",
    loadOk: false
}
var resultados= [];
var x = 0;
var y = 0;
var z = 0;

carro_uno.objeto = new Image();
carro_dos.objeto = new Image();
carro_tres.objeto =new Image();
road.objeto = new Image();
carro_uno.objeto.src = carro_uno.url;
carro_dos.objeto.src = carro_dos.url;
carro_tres.objeto.src = carro_tres.url;
road.objeto.src = road.url;

carro_uno.objeto.addEventListener("load", cargaCarro_uno);
carro_dos.objeto.addEventListener("load", cargaCarro_dos);
carro_tres.objeto.addEventListener("load", cargaCarro_tres);
road.objeto.addEventListener("load", cargaRoad);
boton.addEventListener ("click", carrera);
reset.addEventListener ("click", resetList);


function resetList(){
    newRace();
    screen.innerHTML = " ";
    resultados= [];
}
function show(){
    screen.innerHTML = " ";
    sonidos.happy.play();
    var i = 1;
    for (var Rs of resultados){
         screen.innerHTML += "En la vuelta " + i + "<br> El carro uno llegó de " + Rs.c1 + 
         "<br> El carro dos llegó de " + Rs.c2 + "<br> El carro tres llegó de " + Rs.c3 +"<hr>"
         i += 1;
 }
}
function newRace(){
    resultados.push(new Lap(carro_uno.position, carro_dos.position, carro_tres.position));
    carro_uno.route = 0;
    carro_dos.route = 0;
    carro_tres.route = 0;
    carro_uno.position = 0;
    carro_dos.position = 0;
    carro_tres.position = 0;
    carro_uno.loadOk = true;
    carro_dos.loadOk = true;
    carro_tres.loadOk = true;
    dibujar();
    show();
}

function cargaCarro_uno (){
    carro_uno.loadOk = true;
    dibujar();
}
function cargaCarro_dos (){
    carro_dos.loadOk = true;
    dibujar();
}
function cargaCarro_tres (){
    carro_tres.loadOk = true;
    dibujar();
}
function cargaRoad (){
    road.loadOk = true;
    dibujar();
}
function aleatorio (min, maxi){   
    var resultado
    resultado = Math.floor(Math.random() * (maxi - min + 1))+min;
    return resultado;
}
function dibujar(){
    if (road.loadOk){
        papel.drawImage(road.objeto, 0, 0)
    }
    if (carro_uno.loadOk){
        papel.drawImage (carro_uno.objeto, carro_uno.route, 25)
    }
    if (carro_dos.loadOk){
        papel.drawImage (carro_dos.objeto, carro_dos.route, 170)
    }
    if (carro_tres.loadOk){
        papel.drawImage (carro_tres.objeto, carro_tres.route, 370)
    }
}
function carrera(){
    sonidos.race.play();
    if  (carro_uno.route < 920 && carro_dos.route < 920 && carro_tres.route < 920){
        papel.clearRect(0,0,1000,500); 
        x = aleatorio (1,6);
        y = aleatorio (1,6);
        z = aleatorio (1,6);
        carro_uno.route = carro_uno.route + x;
        carro_dos.route = carro_dos.route + y;
        carro_tres.route = carro_tres.route + z;
        dibujar();
        setTimeout (carrera , 10);
    }   else if (carro_uno.position == 1 && carro_dos.position == 2){
        carro_tres.loadOk = false;
        carro_tres.position = 3;
        newRace();
    }   else if (carro_dos.position == 1 && carro_tres.position == 2){
        carro_uno.loadOk = false;
        carro_uno.position = 3;
        newRace();
    }   else if (carro_tres.position == 1 && carro_uno.position == 2){
        carro_dos.loadOk = false;
        carro_dos.position = 3;
        newRace();
    }   else if (carro_uno.position == 2 && carro_dos.position == 1){
        carro_tres.loadOk = false;
        carro_tres.position = 3;
    }   else if (carro_dos.position == 2 && carro_tres.position == 1){
        carro_uno.loadOk = false;
        carro_uno.position = 3;
        newRace();
    }   else if (carro_tres.position == 2 && carro_uno.position == 1){
        carro_dos.loadOk = false;
        carro_dos.position = 3;
        newRace();
    }   else if (carro_uno.position == 1 && carro_tres.position != 2 && carro_dos.route > 920){
        carro_dos.loadOk = false;
        carro_dos.position = 2;
        z = aleatorio (0,6);
        carro_tres.route = carro_tres.route + z;
        dibujar();
        setTimeout (carrera , 10);
    }   else if (carro_uno.position == 1 && carro_dos.position != 2 && carro_tres.route > 920){
        carro_tres.loadOk = false;
        carro_tres.position = 2;
        y = aleatorio (0,6);
        carro_dos.route = carro_dos.route + y;
        dibujar();
        setTimeout (carrera , 10);
        carro_tres.route = carro_tres.route + z;
    }   else if (carro_dos.position == 1 && carro_tres.position != 2 && carro_uno.route > 920){
        carro_uno.loadOk = false;
        carro_uno.position = 2;
        z = aleatorio (0,6);
        carro_tres.route = carro_tres.route + z;
        dibujar();
        setTimeout (carrera , 10);
    }   else if (carro_dos.position == 1 && carro_uno.position != 2 && carro_tres.route > 920){
        carro_tres.loadOk = false;
        carro_tres.position = 2;
        x = aleatorio (0,6);
        carro_uno.route = carro_uno.route + x;
        dibujar();
        setTimeout (carrera , 10);
    }   else if (carro_tres.position == 1 && carro_dos.position != 2 && carro_uno.route > 920){
        carro_uno.loadOk = false;
        carro_uno.position = 2;
        y = aleatorio (0,6);
        carro_dos.route = carro_dos.route + y;
        dibujar();
        setTimeout (carrera , 10);
    }   else if (carro_tres.position == 1 && carro_uno.position != 2 && carro_dos.route > 920){
        carro_dos.loadOk = false;
        carro_dos.position = 2;
        x = aleatorio (0,6);
        carro_uno.route = carro_uno.route + x;
        dibujar();
        setTimeout (carrera , 10);
    }   else  if (carro_uno.route >= 920 && carro_dos.position != 1 && carro_tres.position !=1){
        carro_uno.loadOk =false;
        carro_uno.position = 1;
        papel.clearRect(0,0,1000,500); 
        y = aleatorio (0,6);
        z = aleatorio (0,6);
        carro_dos.route = carro_dos.route + y;
        carro_tres.route = carro_tres.route + z;
        dibujar();
        setTimeout (carrera , 10);
    }   else  if (carro_dos.route >= 920 && carro_uno.position != 1 && carro_tres.position !=1) {
        carro_dos.loadOk =false;
        carro_dos.position = 1;
        papel.clearRect(0,0,1000,500); 
        x = aleatorio (0,6);
        z = aleatorio (0,6);
        carro_uno.route = carro_uno.route + x;
        carro_tres.route = carro_tres.route + z;
        dibujar();
        setTimeout (carrera , 10);
    }   else  if (carro_tres.route >= 920 && carro_uno.position != 1 && carro_dos.position != 1){
        carro_tres.loadOk =false;
        carro_tres.position = 1;
        papel.clearRect(0,0,1000,500); 
        x = aleatorio (0,6);
        y = aleatorio (0,6);
        carro_uno.route = carro_uno.route + x;
        carro_dos.route = carro_dos.route + y;
        dibujar();
        setTimeout (carrera , 10);
    }    
}
