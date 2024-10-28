/**Implementa un sistema de alertas que use datos
 *  sobre la temperatura de diferentes regiones 
 * almacenados en un array. Usa el método filter para 
 * identificar regiones que superen un umbral específico
 *  de temperatura y muestra un mensaje de advertencia en
 *  el DOM. Permite al usuario actualizar las temperaturas
 *  y guarda los cambios en sessionStorage.
 */

 const regiones = [];

 function actualizarDOM() {
     const regionInput = document.getElementById('region').value;
     const temperaturaInput = parseInt(document.getElementById('temperatura').value);
     const alerta = document.createElement('div');
     
     if (temperaturaInput < -10) {
         alerta.textContent = 'La temperatura está por debajo de -10°C';
     } else if (temperaturaInput >= 0 && temperaturaInput < 30) {
         alerta.textContent = 'Estamos a temperatura ambiente';
     } else if (temperaturaInput > 30) {
         alerta.textContent = 'Tu región está por encima de la temperatura';
     }
     
     document.body.appendChild(alerta);
 }

 function guardarEnSessionStorage() {
     sessionStorage.setItem('regiones', JSON.stringify(regiones));
 }

 function cargarDeSessionStorage() {
     const data = sessionStorage.getItem('regiones');
     if (data) {
         const parsedData = JSON.parse(data);
         parsedData.forEach(region => regiones.push(region));
     }
 }

 document.getElementById('registrar').addEventListener('click', () => {
     const region = document.getElementById('region').value;
     const temperatura = parseInt(document.getElementById('temperatura').value);
     regiones.push({ region, temperatura });
     actualizarDOM();
     guardarEnSessionStorage();
 });

 document.getElementById('modificar').addEventListener('click', () => {
     const region = document.getElementById('region').value;
     const temperatura = parseInt(document.getElementById('temperatura').value);
     const index = regiones.findIndex(r => r.region === region);
     if (index !== -1) {
         regiones[index].temperatura = temperatura;
         actualizarDOM();
         guardarEnSessionStorage();
     }
 });

 window.onload = () => {
     cargarDeSessionStorage();
 };