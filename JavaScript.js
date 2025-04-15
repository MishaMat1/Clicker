var points = 0;
var number = 0;
var number2 = 1;
var number3 = 1;
var number4 = 1;
var number5 = 1;
var ClickPower = 0;
var ClickMultiplier = 0;
var ClickCompound = 0;
var upgradeCost = 25;
var upgradeCost2 = 50;
var upgradeCost3 = 1000;
var PrestigeReq = 1e6;
var Prestige = 0;

function pointClick(){
    number = number2 * number3 * number4 * number5;
    points = points + number;
    document.getElementById("points").innerHTML = points;
};

function Prestige0(){
    points = 0;
    ClickPower = 0;
    ClickMultiplier = 0;
    ClickCompound = 0;
    upgradeCost = 25;
    upgradeCost2 = 50;
    upgradeCost3 = 1e3;
    number2 = 1;
    number3 = 1;
    number4 = 1;
}

function updateTexts() {
    document.getElementById("points").innerHTML = points;
    document.getElementById("upgrade").innerHTML = ClickPower;
    document.getElementById("upgrade2").innerHTML = ClickMultiplier;
    document.getElementById("upgrade3").innerHTML = ClickCompound;
    document.getElementById("cost").innerHTML = upgradeCost;
    document.getElementById("cost2").innerHTML = upgradeCost2;
    document.getElementById("cost3").innerHTML = upgradeCost3;
    document.getElementById("prestige").innerHTML = Prestige;
    document.getElementById("effect").innerHTML = ClickPower;
    document.getElementById("effect2").innerHTML = number3;
    document.getElementById("effect3").innerHTML = number4;
    document.getElementById("effect4").innerHTML = number5;
}

function upgradeClick() {
    if (points >= upgradeCost) {
    points = points - upgradeCost;
    ClickPower = ClickPower + 1;
    number2 = ClickPower + 1;
    upgradeCost = Math.floor(25* (1.5**ClickPower))
    document.getElementById("effect").innerHTML = ClickPower;
    document.getElementById("upgrade").innerHTML = ClickPower; 
    updateTexts();
    }
}

function upgradeClick2() {
    if (points >= upgradeCost2) {
    points = points - upgradeCost2;
    ClickMultiplier = ClickMultiplier + 1;
    number3 = ClickMultiplier*1 + 1;
    upgradeCost2 = Math.floor(50* (1.5**ClickMultiplier))
    document.getElementById("effect2").innerHTML = number3;
    document.getElementById("upgrade2").innerHTML = ClickMultiplier;
    updateTexts();
    }
}

function upgradeClick3() {
    if (points >= upgradeCost3) {
    points = points - upgradeCost3;
    ClickCompound = ClickCompound + 1;
    number4 = 2**ClickCompound;
    upgradeCost3 = Math.floor(1e3* (5**ClickCompound))
    document.getElementById("effect3").innerHTML = number4;
    document.getElementById("upgrade3").innerHTML = ClickCompound;
    updateTexts();
    }
}

function ResetLayer() {
    if(points >= PrestigeReq) {
        Prestige = Prestige + 1;
        number5 = Math.floor(2**Prestige);
        document.getElementById("effect4").innerHTML = number5;
        Prestige0();
        updateTexts();
    }
}