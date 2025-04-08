function calcular(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = parseInt(document.getElementById('idade').value);
  const sexo = document.getElementById('sexo').value;
  const alturaCm = parseFloat(document.getElementById('altura').value);
  const altura = alturaCm / 100;
  const peso = parseFloat(document.getElementById('peso').value);

  const imc = (peso / (altura * altura)).toFixed(2);
  const imcValor = parseFloat(imc);
  let classificacao = '';

  if (imcValor < 18.5) {
    classificacao = 'Baixo peso';
  } else if (imcValor < 25) {
    classificacao = 'Peso normal';
  } else if (imcValor < 30) {
    classificacao = 'Sobrepeso';
  } else if (imcValor < 35) {
    classificacao = 'Obesidade grau I';
  } else if (imcValor < 40) {
    classificacao = 'Obesidade grau II';
  } else {
    classificacao = 'Obesidade grau III';
  }

  const dobra1 = parseFloat(document.getElementById('dobra1').value) || 0;
  const dobra2 = parseFloat(document.getElementById('dobra2').value) || 0;
  const dobra3 = parseFloat(document.getElementById('dobra3').value) || 0;

  const somaDobras = dobra1 + dobra2 + dobra3;

  let densidade, percentualGordura;

  if (sexo === 'masculino') {
    densidade = 1.10938 - (0.0008267 * somaDobras) + (0.0000016 * Math.pow(somaDobras, 2)) - (0.0002574 * idade);
  } else if (sexo === 'feminino') {
    densidade = 1.0994921 - (0.0009929 * somaDobras) + (0.0000023 * Math.pow(somaDobras, 2)) - (0.0001392 * idade);
  }

  percentualGordura = (495 / densidade) - 450;
  const classificacaoGordura = classificarPercentualGordura(percentualGordura, sexo);

  const resultadoHTML = `
    <div style="text-align: left;">
      <h2>Resultados de ${nome}:</h2>
      <p><strong>IMC:</strong> ${imc} (${classificacao})</p>
      <p><strong>Soma das dobras:</strong> ${somaDobras.toFixed(2)} mm</p>
      <p><strong>Percentual de Gordura Corporal:</strong> ${percentualGordura.toFixed(2)}%</p>
      <p><strong>Classificação do Percentual de Gordura:</strong> ${classificacaoGordura}</p>
    </div>
  `;
  document.getElementById('resultado').innerHTML = resultadoHTML;
}

function classificarPercentualGordura(percentual, sexo) {
  if (sexo === 'masculino') {
    if (percentual <= 7) return 'Desnutrição ou abaixo do normal';
    if (percentual >= 8 && percentual <= 9) return 'Abaixo do normal, mas ainda aceitável';
    if (percentual >= 10 && percentual <= 12) return 'Ideal / Normal';
    if (percentual > 12 && percentual <= 15) return 'Normal';
    if (percentual > 15 && percentual <= 19.9) return 'Excesso de peso';
    if (percentual >= 20 && percentual <= 24.9) return 'Obesidade leve';
    if (percentual >= 25 && percentual <= 29.9) return 'Obesidade moderada';
    if (percentual >= 30) return 'Obesidade grave';
  } else if (sexo === 'feminino') {
    if (percentual <= 16) return 'Desnutrição ou abaixo do normal';
    if (percentual >= 17 && percentual <= 19) return 'Abaixo do normal, mas ainda aceitável';
    if (percentual >= 20 && percentual <= 22) return 'Ideal / Normal';
    if (percentual > 22 && percentual <= 25) return 'Normal';
    if (percentual > 25 && percentual <= 29.9) return 'Excesso de peso';
    if (percentual >= 30 && percentual <= 34.9) return 'Obesidade leve';
    if (percentual >= 35 && percentual <= 39.9) return 'Obesidade moderada';
    if (percentual >= 40) return 'Obesidade grave';
  }
  return 'Classificação não disponível';
}

function limparCampos() {
  const camposDobras = document.getElementById('camposDobras');
  camposDobras.style.display = 'none';
  document.getElementById("form").reset(); // Limpa todos os campos do formulário
  document.getElementById("resultado").innerHTML = ""; // Esvazia o resultado
}

document.getElementById('sexo').addEventListener('change', function () {
  const sexo = this.value;
  const camposDobras = document.getElementById('camposDobras');
  const label1 = document.getElementById('label1');
  const label2 = document.getElementById('label2');
  const label3 = document.getElementById('label3');

  if (sexo === 'feminino') {
    label1.textContent = 'Subescapular (mm):';
    label2.textContent = 'Suprailíaca (mm):';
    label3.textContent = 'Coxa (mm):';
    camposDobras.style.display = 'block';
  } else if (sexo === 'masculino') {
    label1.textContent = 'Tricipital (mm):';
    label2.textContent = 'Suprailíaca (mm):';
    label3.textContent = 'Abdominal (mm):';
    camposDobras.style.display = 'block';
  } else {
    camposDobras.style.display = 'none';
  }
});

function toggleMenu() {
  const nav = document.querySelector('.nav-bar');
  nav.classList.toggle('active');
}
