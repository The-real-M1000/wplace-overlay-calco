// ==UserScript==
// @name         Wplace Overlay Calco Ultimate
// @namespace    https://wplacetool.com/
// @version      2.0
// @description  Overlay para Wplace con menú, selección de imagen y controles completos
// @author       Jatdiel
// @match        *://wplace.live/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Variables iniciales
    let topPos = 0;
    let leftPos = 0;
    let widthPercent = 100;
    let opacity = 0.5;

    // Crear imagen overlay
    const overlayImg = document.createElement('img');
    overlayImg.style.position = 'absolute';
    overlayImg.style.top = '0px';
    overlayImg.style.left = '0px';
    overlayImg.style.width = widthPercent + '%';
    overlayImg.style.pointerEvents = 'none';
    overlayImg.style.opacity = opacity.toString();
    overlayImg.style.zIndex = '9999';

    // Crear menú flotante
    const menu = document.createElement('div');
    menu.innerHTML = `
        <strong>📌 Wplace Overlay</strong><br>
        <input type="file" id="overlayFile"><br><br>
        <label>Opacidad:</label> <input type="range" id="opacityRange" min="0" max="1" step="0.05" value="${opacity}"><br>
        <label>Tamaño (%):</label> <input type="number" id="sizeInput" min="10" max="300" value="${widthPercent}"><br>
        <label>Posición X:</label> <input type="number" id="posX" value="${leftPos}"><br>
        <label>Posición Y:</label> <input type="number" id="posY" value="${topPos}"><br><br>
        <details>
            <summary>📖 Instrucciones</summary>
            <small>
            - Usa el selector de imagen para cargar tu plantilla.<br>
            - Ajusta opacidad, tamaño y posición con los controles.<br>
            - También puedes usar:<br>
              Flechas → mover<br>
              + / - → tamaño<br>
              O → subir opacidad<br>
              P → bajar opacidad
            </small>
        </details>
    `;
    menu.style.position = 'fixed';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.background = 'rgba(0,0,0,0.8)';
    menu.style.color = 'white';
    menu.style.padding = '10px';
    menu.style.fontSize = '14px';
    menu.style.zIndex = '10000';
    menu.style.borderRadius = '8px';
    menu.style.width = '220px';
    menu.style.fontFamily = 'sans-serif';

    // Agregar eventos a los controles
    menu.querySelector('#overlayFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                overlayImg.src = ev.target.result;
                if (!document.body.contains(overlayImg)) {
                    document.body.appendChild(overlayImg);
                }
            };
            reader.readAsDataURL(file);
        }
    });

    menu.querySelector('#opacityRange').addEventListener('input', (e) => {
        opacity = parseFloat(e.target.value);
        overlayImg.style.opacity = opacity;
    });

    menu.querySelector('#sizeInput').addEventListener('input', (e) => {
        widthPercent = parseInt(e.target.value);
        overlayImg.style.width = widthPercent + '%';
    });

    menu.querySelector('#posX').addEventListener('input', (e) => {
        leftPos = parseInt(e.target.value);
        overlayImg.style.left = leftPos + 'px';
    });

    menu.querySelector('#posY').addEventListener('input', (e) => {
        topPos = parseInt(e.target.value);
        overlayImg.style.top = topPos + 'px';
    });

    // Controles por teclado
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':    topPos -= 5; break;
            case 'ArrowDown':  topPos += 5; break;
            case 'ArrowLeft':  leftPos -= 5; break;
            case 'ArrowRight': leftPos += 5; break;
            case '+': case '=': widthPercent += 5; break;
            case '-': widthPercent -= 5; break;
            case 'o': if (opacity < 1) opacity += 0.05; break;
            case 'p': if (opacity > 0) opacity -= 0.05; break;
        }
        actualizarOverlay();
        actualizarMenu();
    });

    function actualizarOverlay() {
        overlayImg.style.top = topPos + 'px';
        overlayImg.style.left = leftPos + 'px';
        overlayImg.style.width = widthPercent + '%';
        overlayImg.style.opacity = opacity.toFixed(2);
    }

    function actualizarMenu() {
        menu.querySelector('#opacityRange').value = opacity.toFixed(2);
        menu.querySelector('#sizeInput').value = widthPercent;
        menu.querySelector('#posX').value = leftPos;
        menu.querySelector('#posY').value = topPos;
    }

    // Agregar elementos a la página
    window.addEventListener('load', () => {
        document.body.appendChild(menu);
    });

})();
