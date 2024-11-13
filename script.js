$(document).ready(function() {
    function getWeatherData(lat, lon) {
        const apiKey = 'cc995d46648ae88b278091329d5a3a88';
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        $.get(weatherApiUrl, function(data) {
            const weather = `${data.weather[0].description}, ${data.main.temp}°F`;
            $('#weather').html(`Current weather: ${weather}`);
        });
    }

    function getPCBuildData(budget) {
        const pcBuilds = {
            500: [
                { part: 'CPU', name: 'Intel Pentium G4560', price: '$50' },
                { part: 'GPU', name: 'GTX 1050', price: '$150' },
                { part: 'RAM', name: '8GB DDR4', price: '$40' },
                { part: 'Storage', name: '500GB HDD', price: '$30' },
                { part: 'Motherboard', name: 'ASRock B250M', price: '$60' },
            ],
            1000: [
                { part: 'CPU', name: 'Intel Core i5-10400', price: '$150' },
                { part: 'GPU', name: 'RTX 3060', price: '$400' },
                { part: 'RAM', name: '16GB DDR4', price: '$70' },
                { part: 'Storage', name: '1TB SSD', price: '$100' },
                { part: 'Motherboard', name: 'MSI B460M', price: '$100' },
            ],
            1500: [
                { part: 'CPU', name: 'Intel Core i7-10700K', price: '$300' },
                { part: 'GPU', name: 'RTX 3070', price: '$700' },
                { part: 'RAM', name: '16GB DDR4', price: '$80' },
                { part: 'Storage', name: '1TB NVMe SSD', price: '$150' },
                { part: 'Motherboard', name: 'Gigabyte Z490', price: '$200' },
            ],
            2000: [
                { part: 'CPU', name: 'Intel Core i9-10900K', price: '$500' },
                { part: 'GPU', name: 'RTX 3080', price: '$1200' },
                { part: 'RAM', name: '32GB DDR4', price: '$160' },
                { part: 'Storage', name: '2TB NVMe SSD', price: '$250' },
                { part: 'Motherboard', name: 'ASUS ROG Strix Z490', price: '$300' },
            ],
        };

        const build = pcBuilds[budget];
        $('#pc-parts').empty();
        build.forEach(item => {
            $('#pc-parts').append(`<li>${item.part}: ${item.name} - ${item.price}</li>`);
        });
    }

    $('.budget-btn').click(function() {
        const budget = $(this).data('budget');
        $('#budget-selection').hide();
        $('#result').show();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherData(lat, lon);
            });
        } else {
            $('#weather').html('Geolocation is not supported by this browser.');
        }

        getPCBuildData(budget);
    });

    $('#back-btn').click(function() {
        $('#result').hide();
        $('#budget-selection').show();
    });
});
