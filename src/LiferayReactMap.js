import React, { useEffect, useState } from 'react';

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function LiferayReactMap(props) {

    const [poiList, setPoiList] = useState([]);

    useEffect(() => {
        setPoiList(props.poiList)
    }, [props]);

    const [viewport, setViewport] = useState({
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 12,
        width: "100%",
        height: "500px",
      });

    const CalculateBounds = ({ poiList }) => {
    const map = useMap();
    
    useEffect(() => {
        if (poiList.length === 0) return;
    
        const bounds = poiList.map((poi) => [poi.lat, poi.lon]);
        map.fitBounds(bounds, { padding: [50, 50] }); // Ajuste la vue pour englober tous les POI
    
    }, [poiList, map]);
    
    return null;
    };

    return (
        <>
            <MapContainer center={[40.505, -100.09]} zoom={13} >

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CalculateBounds poiList={poiList} />

                {console.log(poiList)}

                {poiList.map((poi, index) => { 
                    const customIcon = L.divIcon({
                        className: "custom-marker",
                        html: `
                        <div class="marker-container">
                            <img src="${poi.portrait}" class="marker-img" />
                            <div class="marker-name">${poi.headline}</div>
                        </div>
                        `,
                        iconSize: [60, 70], // Taille globale de l'icône
                        iconAnchor: [30, 70], // Ajustement de l'ancrage
                        popupAnchor: [0, -70], // Ajustement du popup
                    });                           
                    return (
                        <Marker key={index} position={[poi.lat, poi.lon]} icon={customIcon}>
                            <Popup>
                                <strong>{poi.popupHeadline}</strong> <br />
                                {poi.popupLineOne} <br />
                                {poi.popupLineTwo}
                            </Popup>
                        </Marker>
                    )
                })}

            </MapContainer>
        </>
    );

}

export default LiferayReactMap;