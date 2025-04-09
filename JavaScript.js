var points = 0;
var number = 1;
var number2 = 1;
var ClickPower = 0;
var ClickMultiplier = 0;
var upgradeCost = 25;
function pointClick(){
    number = (1 + ClickMultiplier) * (1 + ClickPower);
    points = points + number;
    document.getElementById("points").innerHTML = points;
};

function updateTexts() {
    document.getElementById("points").innerHTML = points;
}

function upgradeClick() {
    if (points >= upgradeCost) {
    ClickPower = ClickPower + 1;
    points = points - upgradeCost;
    document.getElementById("upgrade").innerHTML = ClickPower;
    updateTexts();
    }
}

function upgradeClick2() {
    if (points >= upgradeCost*2) {
    ClickMultiplier = ClickMultiplier + 1;
    points = points - upgradeCost*2;
    number2 = ClickMultiplier*1 + 1;
    document.getElementById("upgrade2").innerHTML = ClickMultiplier;
    updateTexts();
    }
}