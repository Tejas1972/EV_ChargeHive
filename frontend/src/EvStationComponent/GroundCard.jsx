import { Link } from "react-router-dom";

const GroundCard = ({ item }) => {
  return (
    <div className="col">
      <div className="card border-2 border-green-900 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out bg-white h-100">
        <img
          src={`http://localhost:8080/api/ground/${item.image}`}
          className="card-img-top rounded-t-xl mx-auto d-block m-2"
          alt="Ground Station"
          style={{
            maxHeight: "270px",
            maxWidth: "100%",
            width: "auto",
          }}
        />
        <div className="card-body text-green-900">
          <h5 className="card-title d-flex justify-between text-lg font-bold text-green-900">
            {item.name}
          </h5>
          <p className="card-text text-sm text-green-900">{item.description}</p>
          <p className="text-green-900">
            <b>Charging Points:</b> {item.chargingPoints}
          </p>
          <p className="text-green-900">
            <b>Charging Speed:</b> {item.chargingSpeed}W
          </p>
          <p className="text-green-900">
            <b>Charger Type:</b> {item.chargerType}
          </p>
          <p className="text-green-900">
            <b>Pincode:</b> {item.pincode}
          </p>
          <p className="text-green-900">
            <b>Price:</b> &#8377;{item.price}
          </p>
        </div>
        <div className="card-footer bg-green-900 p-4 rounded-b-xl d-flex justify-content-center">
          <Link
            to={`/book/evstation/${item.id}`}
             className="btn btn-success shadow-lg px-4 py-2"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroundCard;
