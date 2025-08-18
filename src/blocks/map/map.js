(() => {

    initMap();

    async function initMap() {
        // The `ymaps3.ready` promise will be resolved when all components of the core API module are loaded
        await ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer } = ymaps3;

        // Initialize the map
        const map = new YMap(
            // Pass a link to the HTMLElement of the container
            document.querySelector('.map__iframe'),

            // Pass the map initialization parameters
            {
                location: {
                    // Map center coordinates
                    center: [37.588144, 55.733842],

                    // Scale level
                    zoom: 10
                }
            }
        );

        // Add a layer for displaying the schematic map
        map.addChild(new YMapDefaultSchemeLayer());
    }


})();
