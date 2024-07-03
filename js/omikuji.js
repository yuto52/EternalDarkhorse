async function getFortune() {
    try {
        const response = await fetch('/get_fortune');
        const data = await response.json();
        displayFortune(data.fortune, data.ai_text);
    } catch (error) {
        console.error('おみくじの取得に失敗しました:', error);
    }
}

function displayFortune(fortune, aiText) {
    const fortuneResult = document.getElementById('fortuneResult');
    fortuneResult.innerHTML = `<p><strong>おみくじの結果:</strong> ${fortune}</p>`;
    fortuneResult.innerHTML += `<p><strong>AIによる文章:</strong> ${aiText}</p>`;
}
