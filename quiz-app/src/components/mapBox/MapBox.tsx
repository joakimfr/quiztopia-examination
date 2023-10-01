import { useState, useRef, useEffect } from 'react'
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapBox.scss'
import { useAuth } from '../../hooks/useAuth';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

interface ApiQuiz {
  questions: {
    question: string;
    answer: string;
    location: {
      longitude: string;
      latitude: string;
    };
  }[];
  username: string;
  quizId: string;
  userId: string;
}

interface MapBoxProps {
  selectedQuiz: ApiQuiz | null;
  handleMapClick: (clickPosition: [number, number]) => void;
}

function MapBox ({ selectedQuiz, handleMapClick }: MapBoxProps){

  const mapContainer = useRef(null)
  const mapRef = useRef<MapGl | null>(null)
  const [lat, setLat] = useState<number>(57.7)
  const [lng, setLng] = useState<number>(11.89)
  const [zoom, setZoom] = useState<number>(10)
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [questionCoords, setQuestionCoords] = useState<[number, number][] | null>(null);

  const { isLoggedIn } = useAuth();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(isLoggedIn);


  useEffect(() => {
    setUserIsLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new MapGl({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    const map: MapGl = mapRef.current;

    if (userIsLoggedIn) {
      map.on('click', (event) => {   
        const lngLat = map.unproject(event.point);
        const clickPosition: [number, number] = [lngLat.lng, lngLat.lat];
        handleMapClick(clickPosition);
        
        markersRef.current.forEach((marker) => marker.remove());
        const newMarker = new mapboxgl.Marker().setLngLat(clickPosition).addTo(map);
        markersRef.current = [newMarker];
      });
    }

    map.on('move', () => {
      interface Position {
        lng: number;
        lat: number;
      }
      const position: Position = map.getCenter()
      setLat(Number(position.lat.toFixed(4)))
      setLng(Number(position.lng.toFixed(4)))
      setZoom(map.getZoom());
    });

  }, [lat, lng, zoom, selectedQuiz, handleMapClick, userIsLoggedIn]);


  const showUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLng(longitude);
          mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 12 });
        },
        (error) => {
          console.error('Kunde inte hämta användarens plats:', error);
        }
      );
    } else {
      console.error('Platstjänster stöds inte av din webbläsare.');
    }
  };
  
  useEffect(() => {
    console.log('selectedQuiz has changed:', selectedQuiz);

    if (!selectedQuiz) {
      console.log('Ingen quiz är klickad ännu');
  
    } else {
   
      const coordsFromQuiz: [number, number][] = selectedQuiz.questions.map((question) => {
        const { location } = question;
        const longitude = parseFloat(location.longitude);
        const latitude = parseFloat(location.latitude);
        return [longitude, latitude];
      });

      setQuestionCoords(coordsFromQuiz);
    }
  }, [selectedQuiz]);

  
  
  useEffect(() => { //La till här så att frågorna kommer upp i en pop-up, på kartan när ett quiz klickas
    if (!mapRef.current || !questionCoords) return;

    const markers = questionCoords.map((coords, index) => {
      const marker = new mapboxgl.Marker().setLngLat(coords);
      marker.setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>Fråga ${index + 1}</h3><p>${selectedQuiz?.questions[index].question}</p>`)
      );
      return marker;
    });

    markers.forEach((marker) => {
      marker.addTo(mapRef.current!);
      marker.togglePopup();
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [questionCoords]);



  return (
    <div>
      <article className='mapbox'>
        <div ref={mapContainer} className="mapbox__map" />
        <button onClick={showUserLocation}>Visa min position</button>
      </article>
      
    </div>
  )
}

export default MapBox;