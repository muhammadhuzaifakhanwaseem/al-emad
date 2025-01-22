import Image from 'next/image';
import Link from 'next/link';
import rentedOut from '../../public/rented-out.webp'

const CarCards = ({ cars, imageBasePath }) => {
    return (
        <div className="container my-4">
            <div className="row g-4">
                {cars.map((car) => (
                    <div className={`${car.rent_status == 1 ? 'rented-out' : ''} col-md-4 col-sm-6 car-card`} key={car.id}>
                        {car.rent_status == 1 ?
                            <Image alt='' src={rentedOut} width={200} height={0} className='lock' /> : ""
                        }
                        <div className="card h-100 shadow-sm">
                            {/* Car Image */}
                            <div className="card-img-top position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                                <Image
                                    src={imageBasePath + car.image}
                                    alt={car.car_name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="img-fluid"
                                />
                            </div>
                            {/* Card Body */}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{car.car_name}</h5>
                                <p className="card-text text-muted">
                                    {car.specification || 'No specification provided'}
                                </p>
                                <div className="row mb-3">
                                    <div className="col-4">
                                        <small className="text-decoration-line-through text-danger">
                                            AED {JSON.parse(car?.pricing).daily.old_price}
                                        </small>
                                        <p className="m-0 text-primary">
                                            AED {JSON.parse(car?.pricing).daily.current_price}
                                        </p>
                                        <small className="text-muted">Day</small>
                                    </div>
                                    <div className="col-4">
                                        <small className="text-decoration-line-through text-danger">
                                            AED {JSON.parse(car?.pricing).weekly.old_price}
                                        </small>
                                        <p className="m-0 text-primary">
                                            AED {JSON.parse(car?.pricing).weekly.current_price}
                                        </p>
                                        <small className="text-muted">Week</small>
                                    </div>
                                    <div className="col-4">
                                        <small className="text-decoration-line-through text-danger">
                                            AED {JSON.parse(car?.pricing).monthly.old_price}
                                        </small>
                                        <p className="m-0 text-primary">
                                            AED {JSON.parse(car?.pricing).monthly.current_price}
                                        </p>
                                        <small className="text-muted">Month</small>
                                    </div>
                                </div>
                                {/* Buttons */}
                                <div className="mt-auto d-flex justify-content-between">
                                    <Link
                                        href={`/car/${car.id}`} passHref
                                        className={`${car.rent_status == 1 ? 'disabled' : ""} btn btn-outline-primary btn-sm`}
                                    >
                                        View Details
                                    </Link>
                                    <Link

                                        href={`/booking?carSlug=${car.slug}&carId=${car.id}&carName=${car.car_name}&carModel=${car.car_model}`}
                                        rel="noopener noreferrer"
                                        className={`${car.rent_status == 1 ? 'disabled' : ""} btn btn-success btn-sm d-flex align-items-center`}
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div >
        </div >
    );
};

export default CarCards;
