import { useState, useRef, useEffect } from 'react'
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapBox.scss'

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

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new MapGl({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    const map: MapGl = mapRef.current;

    map.on('click', (event) => {   
      const lngLat = map.unproject(event.point);
      const clickPosition: [number, number] = [lngLat.lng, lngLat.lat];
      handleMapClick(clickPosition);
      
      markersRef.current.forEach((marker) => marker.remove());
      const newMarker = new mapboxgl.Marker().setLngLat(clickPosition).addTo(map);
      markersRef.current = [newMarker];
    });

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

  }, [lat, lng, zoom, selectedQuiz, handleMapClick]);

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

  
  
  useEffect(() => {
    if (!mapRef.current || !questionCoords) return;

    markersRef.current.forEach((marker) => marker.remove());

    questionCoords.forEach((coords) => {
      if (mapRef.current) {
        const newMarker = new mapboxgl.Marker()
          .setLngLat(coords)
          .addTo(mapRef.current);
        markersRef.current.push(newMarker);
      }
    });
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