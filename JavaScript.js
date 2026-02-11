// https://www.incrementaldb.com/game/algebraic-progression?utm_source=chatgpt.com
let game = {
    points: 0,
    number: 1,
    number2: 1,
    number3: 1,
    number4: 1,
    number5: 1,
    number6: 1,
    number7: 1,
    idle: 0,
    Autoclickers: 0,
    AutoclickMulti: 1,
    ClickPower: 0,
    ClickMultiplier: 0,
    ClickCompound: 0,
    upgradeCost: 25,
    autoCost: 100,
    upgradeCost2: 50,
    upgradeCost3: 1000,
    pointCostMulti: 1,
    PrestigeCost4: 3,
    PrestigeCost6: 50,
    PrestigeCost7: 1000,
    PrestigeReq: 1e6,
    PrestigeAmount: 0,
    PrestigeFormulaPower: 2,
    PrestigeAmountBoost: 1,
    Prestigemulti: 1,
    Prestige: 0,
    Ascension: 0,
    TotalAscension: 0,
    AscensionReq: 1e6,
    softcap: 1e5,
    prestigeUpgBought: false,
    buyableUnlockBought: false,
    autoclickMultiBought: false,
    fullAutoBought: false,
    upgradeClick4Bought: false,
    costDecreaseBought: false,
    buyMaxBought: false,
    secondBuyableBought: false,
    exponentBought: false,
    betterGainBought: false,
    prestigeMultiUnlockBought: false,
    betterFormulaBought: false,
    newLayerBought: false
};

game.milestones = {
    AscensionMilestone: false,
    AscensionMilestone2: false
}

// ------------------------
// SAVE / LOAD
// ------------------------
function saveGame() {
    localStorage.setItem("myClickerSave", JSON.stringify(game));
}

function loadGame() {
    const save = localStorage.getItem("myClickerSave");
    if (!save) return;
    const data = JSON.parse(save);
    Object.assign(game, data);
    PrestigeBoost();
    updateTexts();
    PrestigePreview();
    AscensionPreview()
}

setInterval(saveGame, 5000); // auto-save

function resetGame() {
    let hard_reset = prompt("Type CONFIRM to hard reset")
    if(hard_reset === "CONFIRM"){
    localStorage.removeItem("myClickerSave");
    location.reload();
}
}

// UI UPDATES

function updateTexts() {
    document.getElementById("points").innerText = Number(game.points.toFixed()).toLocaleString("en-US");
    document.getElementById("upgrade").innerText = game.ClickPower;
    document.getElementById("upgrade2").innerText = game.ClickMultiplier;
    document.getElementById("upgrade3").innerText = game.ClickCompound;
    document.getElementById("autoclickers").innerText = game.Autoclickers;
    document.getElementById("idle").innerText = Number(Math.ceil(game.idle)).toLocaleString("en-US");
    document.getElementById("auto-cost").innerText = Number(game.autoCost.toFixed()).toLocaleString("en-US");
    document.getElementById("cost").innerText = Number(game.upgradeCost.toFixed()).toLocaleString("en-US");
    document.getElementById("cost2").innerText = Number(game.upgradeCost2.toFixed()).toLocaleString("en-US");
    document.getElementById("cost3").innerText = Number(game.upgradeCost3.toFixed()).toLocaleString("en-US");
    document.getElementById("buyableCost").innerText = Number(game.PrestigeCost4).toLocaleString("en-US");
    document.getElementById("buyableCost2").innerText = Number(game.PrestigeCost6).toLocaleString("en-US");
    document.getElementById("buyableCost3").innerText = Number(game.PrestigeCost7).toLocaleString("en-US");
    document.getElementById("prestige").innerText = Number(game.Prestige).toLocaleString("en-US");
    document.getElementById("ascension").innerText = Number(game.Ascension).toLocaleString("en-US");
    document.getElementById("effect").innerText = Number(game.ClickPower).toLocaleString("en-US");
    document.getElementById("effect2").innerText = Number(game.number3).toLocaleString("en-US");
    document.getElementById("effect3").innerText = Number(game.number4).toLocaleString("en-US");
    document.getElementById("effect4").innerText = Number(game.number5.toFixed(2)).toLocaleString("en-US");
}

// ------------------------
// PRESTIGE PREVIEW
// ------------------------
function PrestigePreview() {
    const ppAmount = document.getElementById("amount");
    let PrestigeAmount = Math.floor((Math.log10(game.points / 1e5)) * game.PrestigeAmountBoost * game.Prestigemulti);
    if (PrestigeAmount >= 1) {   
        ppAmount.innerText = `+ ${PrestigeAmount} prestige points`;
    } else {
        ppAmount.innerText = `${game.PrestigeReq.toLocaleString("en-US")} points`;
    }
}

// ------------------------
// CLICK FUNCTION
// ------------------------
function pointClick() {
    game.number = (game.number2 * game.number3 * game.number4 * game.number5 * game.number6) ** game.number7;
    game.points += game.number;
    PrestigePreview();
    AscensionPreview();
    updateTexts();
}

// ------------------------
// UPGRADES
// ------------------------
function upgradeClick() {
    if (game.points >= game.upgradeCost) {
        game.points -= game.upgradeCost;
        game.ClickPower++;
        game.number2 = game.ClickPower + 1;
        game.upgradeCost = Math.floor(25 * (1.25 ** game.ClickPower));
        if (game.ClickPower >= 25) {
            game.upgradeCost = Math.floor(25 * (1.25 ** 25) * (1.5 ** (game.ClickPower - 25)));
        }
        updateTexts();
        saveGame();
    }
}

function upgradeClickMax() {
    while (game.points >= game.upgradeCost) upgradeClick();
}

function upgradeClick2() {
    if (game.points >= game.upgradeCost2) {
        game.points -= game.upgradeCost2;
        game.ClickMultiplier++;
        game.number3 = game.ClickMultiplier + 1;
        game.upgradeCost2 = Math.floor(50 * (1.3 ** game.ClickMultiplier));
        if (game.ClickMultiplier >= 25) {
            game.upgradeCost2 = Math.floor(50 * (1.3 ** 25) * (1.5 ** (game.ClickMultiplier - 25)));
        }
        updateTexts();
        saveGame();
    }
}

function upgradeClick2Max() {
    while (game.points >= game.upgradeCost2) upgradeClick2();
}

function upgradeClick3() {
    if (game.points >= game.upgradeCost3) {
        game.points -= game.upgradeCost3;
        game.ClickCompound++;
        game.number4 = 2 ** game.ClickCompound;
        game.upgradeCost3 = Math.floor(1000 * (3 ** game.ClickCompound));
        if (game.ClickCompound >= 10) {
            game.upgradeCost3 = Math.floor(1000 * (3 ** 10)) * (5 ** (game.ClickCompound - 10));
        }
        updateTexts();
        saveGame();
    }
}

function upgradeClick3Max() {
    while (game.points >= game.upgradeCost3) upgradeClick3();
}

// ------------------------
// AUTOCLICKERS
// ------------------------
function Autoclick() {
    if (game.points >= game.autoCost) {
        game.points -= game.autoCost;
        game.Autoclickers++;
        game.autoCost *= 3;
        updateTexts();
        saveGame();
    }
}

function AutoclickMax() {
    while (game.points >= game.autoCost) Autoclick();
}

function Idle() {
    game.number = (game.number2 * game.number3 * game.number4 * game.number5 * game.number6) ** game.number7;
    game.idle = (game.number / 5) * game.Autoclickers * game.AutoclickMulti;
    game.points += game.idle;
    PrestigePreview();
    AscensionPreview();
    updateTexts();
}
setInterval(Idle, 1000);

// PRESTIGE

function PrestigeBoost() {
    if (game.Prestige <= game.softcap) {
        game.number5 = (game.Prestige ** game.PrestigeFormulaPower) + 1;
    } else {
        game.number5 = ((game.softcap ** game.PrestigeFormulaPower) + 1) * ((game.Prestige / game.softcap) ** 2);
    }
}

function Prestige0() {
    game.points = game.ClickPower = game.ClickMultiplier = game.ClickCompound = game.Autoclickers = 0;
    game.upgradeCost = 25 * game.pointCostMulti;
    game.upgradeCost2 = 50 * game.pointCostMulti;
    game.autoCost = 100 * game.pointCostMulti;
    game.upgradeCost3 = 1000 * game.pointCostMulti;
    game.number2 = game.number3 = game.number4 = 1;
    document.getElementById("amount").innerText = `${game.PrestigeReq.toLocaleString("en-US")} points`;
    updateTexts()
}

function ResetLayer() {
    if (game.points >= game.PrestigeReq) {
        let PrestigeAmount = Math.floor((Math.log10(game.points / 1e5)) * game.PrestigeAmountBoost * game.Prestigemulti);
        game.Prestige += PrestigeAmount;
        const elems = document.getElementsByClassName("prestige-upgrades");
        for (let i = 0; i < elems.length; i++) elems[i].style.display = "block";
        Prestige0();
        PrestigeBoost();
        updateTexts();
        saveGame();
    }
}

// PRESTIGE UPGRADES

const prestigeupg = document.getElementById("prestigeUpg")
prestigeupg.addEventListener("click", prestigeUpg)

function prestigeUpg() {
    if (game.Prestige >= 1 && !game.prestigeUpgBought) {
        game.Prestige -= 1;
        PrestigeBoost();
        game.number6 *= 3;
        game.prestigeUpgBought = true
        document.getElementById("prestigeCost").innerText = "Bought!";
        prestigeupg.removeEventListener("click", prestigeUpg)
        updateTexts();
        saveGame();
    }
}

const buyable = document.getElementById("unlockBuyable")
buyable.addEventListener("click", buyableUnlock)

function buyableUnlock() {
    if (game.Prestige >= 3 && !game.buyableUnlockBought) {
        game.Prestige -= 3;
        PrestigeBoost();
        game.buyableUnlockBought = true
        document.getElementById("prestigeCost2").innerText = "Bought!";
        document.getElementById("buyables").style.display = "block";
        document.getElementById("buyable").style.display = "block";
        buyable.removeEventListener("click", buyableUnlock)
        updateTexts();
        saveGame();
    }
}

const autoclickspeed = document.getElementById("autoclickmulti")
autoclickspeed.addEventListener("click", autoclickMultiUpgrade)

function autoclickMultiUpgrade() {
    if (game.Prestige >= 5 && !game.autoclickMultiBought) {
        game.Prestige -= 5;
        PrestigeBoost();
        game.autoclickMultiBought = true
        document.getElementById("prestigeCost3").innerText = "Bought!";
        document.getElementById("auto-desc").innerText = "1 autoclicker = 1/2.5 normal click";
        game.AutoclickMulti = 2;
        autoclickspeed.removeEventListener("click", autoclickMultiUpgrade)
        updateTexts();
        saveGame();
    }
}

const buymax = document.getElementById("buyMax")
buymax.addEventListener("click", buyMaxUnlock)

function buyMaxUnlock() {
    if (game.Prestige >= 25 && !game.buyMaxBought) {
        game.Prestige -= 25;
        PrestigeBoost();
        game.buyMaxBought = true
        document.getElementById("prestigeCost5").innerText = "Bought!";
        const elems = document.getElementsByClassName("buy-max");
        for (let i = 0; i < elems.length; i++) elems[i].style.display = "block";
        buymax.removeEventListener("click", buyMaxUnlock)
        updateTexts();
        saveGame();
    }
}

const buyable2 = document.getElementById("anotherBuyable")
buyable2.addEventListener("click", secondBuyable)

function secondBuyable() {
    if (game.Prestige >= 100 && !game.secondBuyableBought) {
        game.Prestige -= 100;
        PrestigeBoost();
        game.secondBuyableBought = true
        document.getElementById("prestigeCost7").innerText = "Bought!";
        document.getElementById("second-buyable").style.display = "block";
        buyable2.removeEventListener("click", secondBuyable)
        updateTexts();
        saveGame();
    }
}

const fullpower = document.getElementById("fullPower")
fullpower.addEventListener("click", fullPowerUpgrade)

function fullPowerUpgrade() {
    if (game.Prestige >= 500 && !game.fullAutoBought) {
        game.Prestige -= 500;
        PrestigeBoost();
        game.fullAutoBought = true
        document.getElementById("prestigeCost11").innerText = "Bought!";
        document.getElementById("auto-desc").innerText = "1 autoclicker = 1 normal click";
        game.AutoclickMulti = 5;
        fullpower.removeEventListener("click", fullPowerUpgrade)
        updateTexts();
        saveGame();
    }
}

const exponent = document.getElementById("exponent")
exponent.addEventListener("click", exponentUpgrade)

function exponentUpgrade() {
    if (game.Prestige >= 1000 && !game.exponentBought) {
        game.Prestige -= 1000;
        PrestigeBoost();
        game.exponentBought = true
        document.getElementById("prestigeCost8").innerText = "Bought!";
        game.number7 = 1.1;
        exponent.removeEventListener("click", exponentUpgrade)
        updateTexts();
        saveGame();
    }
}

const boost = document.getElementById("boost")
boost.addEventListener("click", betterGain)

function betterGain() {
    if (game.Prestige >= 2500 && !game.betterGainBought) {
        game.Prestige -= 2500;
        game.betterGainBought = true
        document.getElementById("prestigeCost9").innerText = "Bought!";
        game.PrestigeAmountBoost = 3;
        boost.removeEventListener("click", betterGain)
        PrestigeBoost();
        updateTexts();
        saveGame();
    }
}

const buyable3 = document.getElementById("anotherBuyable2")
buyable3.addEventListener("click", prestigeMultiUnlock)

function prestigeMultiUnlock() {
    if (game.Prestige >= 3000 && !game.prestigeMultiUnlockBought) {
        game.Prestige -= 3000;
        game.prestigeMultiUnlockBought = true
        document.getElementById("third-buyable").style.display = "block";
        document.getElementById("prestigeCost12").innerText = "Bought!";
        buyable3.removeEventListener("click", prestigeMultiUnlock)
        PrestigeBoost();
        updateTexts();
        saveGame();
    }
}

const formula = document.getElementById("formula")
formula.addEventListener("click", betterFormula)

function betterFormula() {
    if (game.Prestige >= 10000 && !game.betterFormulaBought) {
        game.Prestige -= 10000;
        game.betterFormulaBought = true
        document.getElementById("prestigeCost10").innerText = "Bought!";
        game.PrestigeFormulaPower += 1;
        formula.removeEventListener("click", betterFormula)
        PrestigeBoost();
        updateTexts();
        saveGame();
    }
}

const newlayer = document.getElementById("newLayer")
newlayer.addEventListener("click", NewLayer)

function NewLayer() {
    if (game.Prestige >= 100000 && !game.newLayerBought) {
        game.Prestige -= 100000;
        game.newLayerBought = true
        document.getElementById("prestigeCost13").innerText = "Bought!";
        document.getElementById("ascend").style.display = "block"
        newlayer.removeEventListener("click", NewLayer)
        PrestigeBoost();
        updateTexts();
        saveGame();
    }
}

// PRESTIGE BUYABLES

function upgradeClick4() {
    if (game.Prestige >= game.PrestigeCost4) {
        game.Prestige -= game.PrestigeCost4;
        PrestigeBoost();
        game.number6 *= 1.5;
        game.PrestigeCost4 = Math.ceil(game.PrestigeCost4 * 1.5);
        updateTexts();
        saveGame();
    }
}

function costDecreaseBuyable() {
    if (game.Prestige >= game.PrestigeCost6) {
        game.Prestige -= game.PrestigeCost6;
        PrestigeBoost();
        game.PrestigeCost6 = Math.ceil(game.PrestigeCost6 * 1.5);
        game.pointCostMulti *= 0.9;
        game.upgradeCost *= game.pointCostMulti;
        game.autoCost *= game.pointCostMulti;
        game.upgradeCost2 *= game.pointCostMulti;
        game.upgradeCost3 *= game.pointCostMulti;
        updateTexts();
        saveGame();
    }
}

function PrestigeMulti() {
    if (game.Prestige >= game.PrestigeCost7) {
        game.Prestige -= game.PrestigeCost7;
        game.Prestigemulti *= 1.5;
        game.PrestigeCost7 *= 1.5;
        PrestigeBoost();
        updateTexts();
        saveGame();
    }
}

function refreshPrestigeUI() {
    if (game.prestigeUpgBought) {
        const elems = document.getElementsByClassName("prestige-upgrades");
        for (let i = 0; i < elems.length; i++) elems[i].style.display = "block";
        document.getElementById("prestigeCost").innerText = "Bought!";
    }

    if (game.buyableUnlockBought) {
        document.getElementById("buyables").style.display = "block";
        document.getElementById("buyable").style.display = "block";
        document.getElementById("prestigeCost2").innerText = "Bought!";
    }

    if (game.autoclickMultiBought) {
        document.getElementById("prestigeCost3").innerText = "Bought!";
        document.getElementById("auto-desc").innerText =
            game.AutoclickMulti === 5 ? "1 autoclicker = 1 normal click" : "1 autoclicker = 1/2.5 normal click";
    }

    if (game.fullAutoBought) {
        document.getElementById("prestigeCost11").innerText = "Bought!";
        document.getElementById("auto-desc").innerText = "1 autoclicker = 1 normal click";
    }

    if (game.buyMaxBought) {
        const buyMaxElems = document.getElementsByClassName("buy-max");
        for (let i = 0; i < buyMaxElems.length; i++) buyMaxElems[i].style.display = "block";
        document.getElementById("prestigeCost5").innerText = "Bought!";
    }

    if (game.secondBuyableBought) {
        document.getElementById("second-buyable").style.display = "block";
        document.getElementById("prestigeCost7").innerText = "Bought!";
    }

    if (game.prestigeMultiUnlockBought) {
        document.getElementById("third-buyable").style.display = "block";
        document.getElementById("prestigeCost12").innerText = "Bought!";
    }

    if(game.newLayerBought) {
        document.getElementById("prestigeCost13").innerText = "Bought!";
        document.getElementById("ascend").style.display = "block";
    }

    if (game.exponentBought) document.getElementById("prestigeCost8").innerText = "Bought!";
    if (game.betterGainBought) document.getElementById("prestigeCost9").innerText = "Bought!";
    if (game.betterFormulaBought) document.getElementById("prestigeCost10").innerText = "Bought!";
    if (game.upgradeClick4Bought) document.getElementById("buyableCost").innerText = "Bought!";
    if (game.costDecreaseBought) document.getElementById("prestigeCost6").innerText = "Bought!";
}

// ASCENSION

function prestigeReturn(){
    game.number5 = game.number6 = game.number7 = 1
    game.prestigeUpgBought = false
    game.buyableUnlockBought = false
    game.autoclickMultiBought = false
    game.fullAutoBought = false
    game.upgradeClick4Bought = false
    game.costDecreaseBought = false
    game.secondBuyableBought = false
    game.exponentBought = false
    game.betterGainBought =  false
    game.prestigeMultiUnlockBought = false
    game.betterFormulaBought = false
    game.pointCostMulti = 1
    game.PrestigeCost4 = 3
    game.PrestigeCost6 = 50
    game.PrestigeCost7 = 1000
    game.PrestigeReq = 1e6
    game.PrestigeAmount = 0
    game.PrestigeFormulaPower = 2
    game.PrestigeAmountBoost = 1
    game.Prestigemulti = 1
    game.Prestige = 0
}

function ResetUpgrades(){
    document.getElementById("prestigeCost").innerText = "1 PP";
    document.getElementById("prestigeCost2").innerText = "3 PP";
    document.getElementById("prestigeCost3").innerText = "5 PP";
    document.getElementById("prestigeCost7").innerText = "100 PP";
    document.getElementById("prestigeCost11").innerText = "500 PP";
    document.getElementById("prestigeCost8").innerText = "1,000 PP";
    document.getElementById("prestigeCost9").innerText = "2,500 PP";
    document.getElementById("prestigeCost12").innerText = "3,000 PP";
    document.getElementById("prestigeCost10").innerText = "10,000 PP";
}

function Ascend0(){
    ResetUpgrades()
    Prestige0()
    prestigeReturn()
}

function AscensionPreview() {
    const AscAmount = document.getElementById("ascension-amount");
    let AscendAmount = Math.floor(Math.log10(game.Prestige / 1e5));
    if (AscendAmount >= 1) {   
        AscAmount.innerText = `+ ${AscendAmount} ascension points`;
    } else {
        AscAmount.innerText = `${game.AscensionReq.toLocaleString("en-US")} PP`;
    }
        if(game.Ascension >= 1){
        const elems = document.getElementsByClassName("prestige-upgrades");
        for (let i = 0; i < elems.length; i++) elems[i].style.display = "block";
    }
}

function AscensionLayer(){
    if(game.Prestige >= 1e6){
        let AscendAmount = Math.floor(Math.log10(game.Prestige/1e5))
        game.Ascension += AscendAmount
        game.TotalAscension += AscendAmount
        const elems = document.getElementsByClassName("milestones")
        for(let i = 0; i < elems.length; i++) elems[i].style.display = "block"
        Ascend0()
        checkMilestones()
        updateTexts()
    }
}

// ASCENSION MILESTONES

function checkMilestones(){
    if(game.TotalAscension >= 1){
        if(!game.milestones.AscensionMilestone) {
        game.milestones.AscensionMilestone = true
        game.number6 *= 5;
        console.log(game.number6)
    }
    document.getElementById("milestone-get").innerText = "Obtained"
    }

    if(game.TotalAscension >= 2){
        if(!game.milestones.AscensionMilestone2) {
        game.milestones.AscensionMilestone2 = true
        game.Prestigemulti *= 3;
    }
    document.getElementById("milestone2-get").innerText = "Obtained"
}
}
setInterval(checkMilestones, 1000)

function showMilestones(){
    if(game.TotalAscension >= 1){
        const elems = document.getElementsByClassName("milestones")
        for(let i = 0; i < elems.length; i++) elems[i].style.display = "block"
    }
}

window.onload = function() {
    loadGame();
    refreshPrestigeUI();
    showMilestones();
}