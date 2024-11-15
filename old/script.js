// Número total de imagens
var totalImages = 24;

// Função para gerar os cards dinamicamente
function generateCards() {
    var container = document.getElementById('grid-container');

    for (var i = 3; i <= totalImages; i++) {
        // Cria o elemento card
        var card = document.createElement('div');
        card.className = 'card';

        // Cria o elemento img
        var img = document.createElement('img');
        img.src = 'images/' + i + '.png';
        img.alt = 'Presente ' + i;

        // Cria o botão
        var button = document.createElement('button');
        button.innerText = 'Escolher';
        // Usar IIFE para capturar o valor de i corretamente no onclick
        (function(index) {
            button.onclick = function() {
                openModal(index);
            }
        })(i);

        // Adiciona a imagem e o botão ao card
        card.appendChild(img);
        card.appendChild(button);

        // Adiciona o card ao container
        container.appendChild(card);
    }
}

// Chama a função para gerar os cards
generateCards();

// As funções openModal, closeModal e copyToClipboard permanecem as mesmas

function openModal(itemNumber) {
    var qrCodeSrc = 'assets/qr' + '.jpg';

    var pixCode = '07401790122';

    document.getElementById('qrCodeImage').src = qrCodeSrc;
    document.getElementById('pixCode').value = pixCode;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function copyToClipboard() {
    var pixCodeField = document.getElementById('pixCode');
    pixCodeField.select();
    document.execCommand('copy');
    alert('Código Pix copiado para a área de transferência!');
}
