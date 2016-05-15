/*jslint browser: true*/
/*global L */

(function(window, document, L, undefined) {
        'use strict';

        L.Icon.Default.imagePath = 'images/';

        /* create leaflet map */
        var map = L.map('map').setView([39.739800, -104.911276], 11);

        /* add default stamen tile layer */
        new L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
            minZoom: 0,
            maxZoom: 18,
            attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
        }).addTo(map);

        $.getJSON("http://myownrest-webgisapps.rhcloud.com/point/fire_stations", function(data) {
            L.geoJson(data, {
                onEachFeature: function(feature, layer) {
                    layer.bindPopup('<b>' + feature.properties.station_nu + '</b><br>' + feature.properties.full_addre + '<br> <i class="ion-ios-telephone"> ' + feature.properties.emergency_);
                },
                pointToLayer: function(feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.AwesomeMarkers.icon({
                            icon: 'ion ion-fireball',
                            markerColor: 'red',
                            prefix: 'fa'
                        }),
                    });
                }
            }).addTo(map);
        });

				var buffers;
        $('.submit').click(function() {
                var val = $('.input').val()
                var call = 'http://myownrest-webgisapps.rhcloud.com/buffer/' + val + '/fire_stations'
                if (buffers !== undefined) {
                    map.removeLayer(buffers)
                     $.getJSON(call, function(data) {
                          buffers =  L.geoJson(data, {
                                style: {
                                    weight: 5,
                                    fillColor: '#ff9100',
                                    color: '#870404',
                                    weight: 2,
                                    opacity: 1
                                }
                            })
                            map.addLayer(buffers);
                        });
                    }
                    else {
                         $.getJSON(call, function(data) {
                            buffers = L.geoJson(data, {
                                style: {
                                    weight: 5,
                                    fillColor: '#ff9100',
                                    color: '#870404',
                                    weight: 2,
                                    opacity: 1
                                }
                            })
                            map.addLayer(buffers)
                        });
                    }
                });
        }(window, document, L));
