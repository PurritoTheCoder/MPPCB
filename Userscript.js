// ==UserScript==
// @name         Snowfall, Xmas Lights, and GIF Background Userscript
// @namespace    http://your-namespace.com
// @version      1.0
// @description  Adds a snowfall effect and Christmas lights to the webpage with snowflake emoji and allows setting a GIF as the background. Includes a button to remove the snowfall effect.
// @author       CocoaBean6646 (Christmas Lights and Snowfall) / Your Name (GIF Background)
// @match        https://mpp.8448.space/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuration
    var numberOfSnowflakes = 100;
    var numberOfLights = 20;
    var canvasId = 'xmas-canvas';
    var snowfallEnabled = true;

    // Function to create the canvas and start the animation
    function createSnowfallCanvas() {
        // Create a canvas element for snowfall and Xmas lights
        var canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');

        // Resize canvas to fit the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Generate random snowflakes
        var snowflakes = [];
        for (var i = 0; i < numberOfSnowflakes; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 8 + 5, // Adjusted size here
                speed: Math.random() * 2 + 1,
                opacity: Math.random()
            });
        }

        // Generate random Christmas lights
        var lights = [];
        for (var j = 0; j < numberOfLights; j++) {
            lights.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 5,
                color: getRandomColor(),
                blinkInterval: Math.random() * 1000 + 500 // Random blink interval
            });
        }

        // Animation loop
        function animateSnowfallAndLights() {
            if (!snowfallEnabled) {
                // Clear canvas and remove elements if snowfall is disabled
                canvas.remove();
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw snowflakes
            for (var i = 0; i < numberOfSnowflakes; i++) {
                var snowflake = snowflakes[i];
                ctx.font = snowflake.radius + 'px Arial';
                ctx.fillStyle = 'rgba(255, 255, 255, ' + snowflake.opacity + ')';
                ctx.fillText('❄️', snowflake.x, snowflake.y);

                // Move the snowflake
                snowflake.y += snowflake.speed;

                // If the snowflake reaches the bottom, reset its position
                if (snowflake.y > canvas.height) {
                    snowflake.y = 0;
                }
            }

            // Draw Christmas lights
            for (var j = 0; j < numberOfLights; j++) {
                var light = lights[j];

                // Blinking effect
                if (Date.now() % light.blinkInterval < light.blinkInterval / 2) {
                    ctx.beginPath();
                    ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2, false);
                    ctx.fillStyle = light.color;
                    ctx.fill();
                }
            }

            requestAnimationFrame(animateSnowfallAndLights);
        }

        // Start the animation
        animateSnowfallAndLights();

        // Resize canvas when the window is resized
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Function to generate a random color
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }

    // Create a button to allow entering a GIF URL
    var uploadButton = document.createElement('button');
    uploadButton.textContent = 'Set GIF URL';
    uploadButton.style.position = 'fixed';
    uploadButton.style.top = '50px';
    uploadButton.style.right = '10px';
    uploadButton.style.zIndex = '9999';
    uploadButton.addEventListener('click', function() {
        var gifUrl = prompt('Enter the URL of the GIF:');
        if (gifUrl) {
            // Call the function to set the GIF as the background
            setGIFBackground(gifUrl);
        }
    });

    // Append the button to the body
    document.body.appendChild(uploadButton);

    // Create a button to toggle the second script
    var toggleSnowfallButton = document.createElement('button');
    toggleSnowfallButton.textContent = 'Toggle Snowfall';
    toggleSnowfallButton.style.position = 'fixed';
    toggleSnowfallButton.style.top = '100px';
    toggleSnowfallButton.style.right = '10px';
    toggleSnowfallButton.style.zIndex = '9999';
    toggleSnowfallButton.addEventListener('click', function() {
        snowfallEnabled = !snowfallEnabled;
        if (snowfallEnabled) {
            // Create the snowfall canvas and start the animation
            createSnowfallCanvas();
        }
    });

    // Append the button to the body
    document.body.appendChild(toggleSnowfallButton);

    // Function to set the GIF as the background
    function setGIFBackground(gifUrl) {
        // Implement the logic to set the GIF as the background here
        // This will depend on the structure and behavior of the target webpage
        console.log('Setting background with URL:', gifUrl);
        // Placeholder function, replace with actual implementation.
        var gifContainer = document.getElementById('gif-container');
        if (gifContainer) {
            gifContainer.style.backgroundImage = 'url("' + gifUrl + '")';
        }
    }
})();
