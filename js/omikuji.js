// おみくじの結果を定義する配列
const fortunes = [
    "大吉<br><br>今日は運気が最高です！<br>何をやってもうまくいくでしょう！",
    "吉<br><br>今日は運気が高いです！<br>いいことがあるかもしれません。",
    "中吉<br><br>今日は運気が普通です。<br>普通の日常を楽しんでください。",
    "小吉<br><br>今日は運気が少し高めです。<br>いいことがあるかもしれません。",
    "末吉<br><br>今日は運気が低めです。<br>気をつけて行動してください。",
    "凶<br><br>今日は運気が最低です。<br>悪いことがあるかもしれません。",
    "大凶<br><br>今日は運気が最悪です。<br>外出は控えて、家でゆっくり過ごしましょう。"
];

var buttonCount = 0;
// おみくじを引く関数
async function drawFortune() {
    const co2 = await getCO2();
    console.log(co2);
    buttonCount += 1;
    let randomIndex = buttonCount * co2 % 100;
    if (randomIndex < 5) { //大吉5%
        randomIndex = 0;
    }
    else if (randomIndex < 20) { //吉15%
        randomIndex = 1;
    }
    else if (randomIndex < 40) { //中吉20%
        randomIndex = 2;
    }
    else if (randomIndex < 65) { //小吉25%
        randomIndex = 3;
    }
    else if (randomIndex < 85) { //末吉20%
        randomIndex = 4;
    }
    else if (randomIndex < 98) { //凶13%
        randomIndex = 5;
    }
    else { //大凶2%
        randomIndex = 6;
    }
    const fortune = fortunes[randomIndex];
    displayFortune(fortune);
}

// おみくじの結果を表示する関数
function displayFortune(fortune) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>${fortune}</p>`;
}

async function getCO2() {
    try {
        const response = await fetch('https://proxy.cep-hd-dlp.chuden.co.jp/data-n8suh89sqhcjo5g5/data-api/latest?id=CgETViZ2&subscription-key=0e35a874f02a4887adc1ed0b2561f645');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const data_co2 = data[0].co2;
        return data_co2;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
