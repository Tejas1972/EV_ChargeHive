import HQImage1 from '../images/hq1.png';
import HQImage2 from '../images/hq2.png';
import HQImage3 from '../images/hq3.png';
import HQImage4 from '../images/hq4.png';

const headquarters = [
  { id: 1, location: 'Pune', image: HQImage1, address: 'EV Dock Charging Station, City Center,  Pune, Maharashtra 411001', phone: '+91 (234) 567-8901', link: 'https://www.google.com/maps/dir/18.5036202,73.6889375/EV+Dock+Charging+Station,+City+Center,+15+%26+15A,+Connaught+Rd,+near+Lemon+Tree+Primer+Hotel,+Modi+Colony,+Pune,+Maharashtra+411001/@18.5143844,73.6180385,11z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bc2c10001a2491f:0xf51f152a9228ac43!2m2!1d73.876767!2d18.5279697?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D' },
  { id: 2, location: 'Mumbai', image: HQImage2, address: 'Electric Charging Station, Vile Parle, Mumbai,Maharashtra 400099', phone: '+91 (234) 567-8902', link: 'https://www.google.com/maps/dir//Electric+Vehicle+Charging+Station,+Chhatrapati+Shivaji+Maharaj+International+Airport+Mumbai,+P1,+MLCP,+Vile+Parle+East,+Vile+Parle,+Mumbai,+Maharashtra/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3be7c9e4a37a573d:0x298138813bc541?sa=X&ved=1t:57443&ictx=111' },
  { id: 3, location: 'Bangalore', image: HQImage3, address: 'Porsche Destination Charging,Bengaluru, Karnataka 560001', phone: '+91 (234) 567-8903', link: 'https://www.google.com/maps/dir/18.5036202,73.6889375/0,+Porsche+Destination+Charging,+24,+Vittal+Mallya+Rd,+Bengaluru,+Karnataka+560001/@15.7307028,73.0016583,7z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3bae16775e340945:0x1837666462681c8e!2m2!1d77.5961296!2d12.971572?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D' },
  { id: 4, location: 'Delhi', image: HQImage4, address: 'Saini Mohalla, Block H, Nangloi, Delhi, 110041', phone: '+91 (234) 567-8904', link: 'https://www.google.com/maps/dir/Pune,+Maharashtra,+India/28.679079,77.06971/@23.5205991,70.6866711,6z/data=!3m1!4b1!4m8!4m7!1m5!1m1!1s0x3bc2bf2e67461101:0x828d43bf9d9ee343!2m2!1d73.8567437!2d18.5204303!1m0?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D' }
];

const ContactUs = () => {
  return (
    <div className="container mt-5" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Contact Us Header */}
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="fw-bold text-success">Contact Us</h2>
          <p className="text-muted lead">
            Have questions or need assistance? Reach out to our headquarters at various locations for support.
          </p>
        </div>
      </div>
      
      {/* Headquarters Information Cards */}
      <div className="row justify-content-center mt-4">
        {headquarters.map((hq) => (
          <div key={hq.id} className="col-md-5 m-3">
            <div className="card shadow-sm border-0" style={{ backgroundColor: '#e8f5e9' }}>
              <div className="card-body text-center">
                <img 
                  src={hq.image} 
                  alt={`Headquarters ${hq.location}`} 
                  className="img-fluid rounded mb-3" 
                  style={{ maxWidth: '150px', objectFit: 'contain' }}
                />
                <h5 className="fw-bold text-success">Headquarter {hq.location}</h5>
                <p className="text-dark mb-1">{hq.address}</p>
                <p className="text-dark">Phone: {hq.phone}</p>
                <a href={hq.link} className="text-success fw-bold" target="_blank" rel="noopener noreferrer">
                  {hq.location}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
