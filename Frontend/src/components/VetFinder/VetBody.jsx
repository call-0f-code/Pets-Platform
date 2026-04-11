import L from 'leaflet'   //import the leaflet library and gives it the name l
import 'leaflet/dist/leaflet.css'  //import leaflets default css styles into the project
import { useEffect, useState } from 'react';
import './VetBody.css'

const VetBody = () => {

    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const mapContainer = document.getElementById("map");

            // if (mapContainer && mapContainer._leaflet_id) {
            //     mapContainer._leaflet_id = null;
            // }

            const mapInstance = L.map("map").setView([lat, lon], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '© OpenStreetMap contributors'}).addTo(mapInstance);

            L.marker([lat, lon]) //creates a pin
                .addTo(mapInstance) //places it on the map
                .bindPopup("You are here") //adds messages
                .openPopup(); //shows popup

            window.myMap = mapInstance;
            window.userLocation = { lat, lon };
    });

    }, []);

    const focusOnVet = (vet) => {
        const map = window.myMap;
        const lat = vet.lat || vet.center?.lat;
        const lon = vet.lon || vet.center?.lon;

        if(lat && lon){
            map.setView([lat, lon], 16);
        }
        
        L.popup()
            .setLatLng([lat, lon])
            .setContent(vet.tags.name || "Vet Clinic")
            .openOn(map)
    };

    const getLocation = () => {
        setLoading(true);

        if(!window.myMap || !window.userLocation){
            setLoading(false);
            alert("Location not loaded yet.");
            return;
        }

        const { lat, lon } = window.userLocation;
        const mapInstance = window.myMap;

        // mapInstance.eachLayer((layer) => {
        //     if (layer instanceof L.Marker && !layer._popup?.getContent()?.includes("You are here")) {
        //         mapInstance.removeLayer(layer);
        //     }
        // });

    fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="veterinary"](around:10000,${lat},${lon});out;`)
            .then(res => {
                if(!res.ok){
                        throw new Error("Server Error");
                }
                return res.json();
            })
            .then(data => {

                setVets(data.elements);

                console.log("Data: ", data);
                console.log("Elements: ", data.elements);

                data.elements.forEach((vet) => {
                    if(vet.lat && vet.lon){
                        L.marker([vet.lat, vet.lon])
                            .addTo(mapInstance)
                            .bindPopup(vet.tags?.name || "Vet Clinic")
                    }
                });
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                alert("Could not fetch vets. Try again later")
            })

    };


    return (
        <div className="VetBody">
            <div className="VetBody-Head">
                <h1>Find the nearest vet in your area🐾</h1>
                <p>Quickly locate trusted veterinary clinics near you</p>
            </div>

            <button 
                className="vet-btn"
                onClick={getLocation}
            >
                Find Vets Near Me
            </button>

            <div className="Vet-section">
                <div 
                    id = "map"
                    className = "Vet-section-map"
                    style={{height: "400px", width: "100%"}}
                >
                </div>
                <div className = "Vet-section-data">
                    {loading && <h2>Finding nearby vets...</h2>}
                    {vets.map((vet, index) => (
                        
                        <div key={index} className="vet-card" onClick={() => focusOnVet(vet)}>
                            <h3>{vet.tags?.name || "Vet Clinic"}</h3>

                            <p className="opening_hrs">
                                ⏰ {vet.tags?.opening_hours || "Timing not available."}
                            </p>

                            <p>
                                📍 {vet.tags?.["addr:street"] || "Address not available"}
                            </p>

                            <p>
                                📞 {vet.tags?.phone || vet.tags?.mobile || "Contact not available"}
                            </p>
                            
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
};

export default VetBody