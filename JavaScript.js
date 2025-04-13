var points = 0;
var number = 0;
var number2 = 1;
var number3 = 1;
var number4 = 1;
var ClickPower = 0;
var ClickMultiplier = 0;
var ClickCompound = 0;
var upgradeCost = 25;

function pointClick(){
    number = number2 * number3 * number4;
    points = points + number;
    document.getElementById("points").innerHTML = points;
};

function updateTexts() {
    document.getElementById("points").innerHTML = points;
}

function upgradeClick() {
    if (points >= upgradeCost) {
    points = points - upgradeCost;
    ClickPower = ClickPower + 1;
    number2 = ClickPower + 1;
    document.getElementById("upgrade").innerHTML = ClickPower;
    updateTexts();
    }
}

function upgradeClick2() {
    if (points >= upgradeCost*2) {
    points = points - upgradeCost*2;
    ClickMultiplier = ClickMultiplier + 1;
    number3 = ClickMultiplier*1 + 1;
    document.getElementById("upgrade2").innerHTML = ClickMultiplier;
    updateTexts();
    }
}

function upgradeClick3() {
    if (points >= upgradeCost*40) {
    points = points - upgradeCost*40;
    ClickCompound = ClickCompound + 1;
    number4 = 2**ClickCompound;
    document.getElementById("upgrade3").innerHTML = ClickCompound;
    updateTexts();
    }
}