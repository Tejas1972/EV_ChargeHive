import axios from "axios";
import { useEffect, useState } from "react";
import EvStationCard from "../GroundComponent/EvStationCard";
const Stations = () => {
  const [stations, setStations] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/stations").then((res) => setStations(res.data.stations));
  }, []);
  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-success text-center">Available EV Stations</h2>
      <div className="row mt-4">
        {stations.length > 0 ? (
          stations.map((station) => (
            <div key={station.id} className="col-md-4 mb-4">
              <EvStationCard item={station} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No EV stations available</p>
        )}
      </div>
    </div>
  );
};
export default Stations;