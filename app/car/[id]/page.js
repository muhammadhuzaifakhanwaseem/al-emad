"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button, Card, CardMedia, Typography, Grid, Box } from "@mui/material";
import Link from "next/link";
import { useLoading } from '../../context/LoadingContext';
import SiteLayout from "@/app/components/Layouts/SiteLayout";
import { ChevronLeft } from "@mui/icons-material";

const CarDetailPage = () => {
  const { setLoading } = useLoading();

  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [imageBasePath, setImageBasePath] = useState("");

  const [error, setError] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cars/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch car");
        }
        const data = await res.json();
        setCar(data?.data?.car?.car);
        setImageBasePath(`${data?.data?.car?.base_url}/${data?.data?.car?.image_path}/`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (error) {
    return <Typography variant="h6" color="error">{`Error: ${error}`}</Typography>;
  }

  const openLightbox = (img) => {
    setLightboxImage(img);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  if (car) {
    const pricing = JSON.parse(car.pricing);
    const mileage = JSON.parse(car.mileage);
    const featuresList = JSON.parse(car.features_list || "[]");

    return (
      <SiteLayout>
        <Box sx={{ my: 5 }}>
          <Grid container spacing={4}>
            {/* Car Image and Gallery */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={imageBasePath + car.image}
                  alt={car.car_name}
                  sx={{ height: 400, objectFit: 'cover' }}
                />
              </Card>
              <Box sx={{ display: "flex", mt: 2 }}>
                {car.gallery.map((img, index) => (
                  <Box key={index} sx={{ marginRight: 2 }}>
                    <Image
                      src={imageBasePath + img.image_path}
                      alt={`Gallery image ${index + 1}`}
                      width={150}
                      height={150}
                      quality={70}
                      style={{ cursor: "pointer", borderRadius: '8px' }}
                      onClick={() => openLightbox(imageBasePath + img.image_path)}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Car Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>{car.car_name}</Typography>
              <Typography variant="h6" color="textSecondary">{car.car_model}</Typography>

              <Box sx={{ my: 3 }}>
                <Typography variant="h5">Car Details</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Typography variant="body1">Engine Size: {car.engine_size}</Typography>
                  <Typography variant="body1">Transmission: {car.transmission}</Typography>
                  <Typography variant="body1">Fuel Type: {car.fuel_type}</Typography>
                  <Typography variant="body1">Bluetooth: {car.bluetooth ? "Yes" : "No"}</Typography>
                  <Typography variant="body1">Cruise Control: {car.cruise_control ? "Yes" : "No"}</Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Link href={`/booking?carSlug=${car.slug}&carId=${car.id}&carName=${car.car_name}&carModel=${car.car_model}`}>
                    <Button variant="contained" fullWidth color="primary">Book Now</Button>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth color="secondary">Chat Us!</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Lightbox Overlay */}
          {lightboxImage && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
              onClick={closeLightbox}
            >
              <img
                src={lightboxImage}
                alt="Lightbox View"
                style={{
                  maxHeight: "90%",
                  maxWidth: "90%",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}

          {/* Pricing Details */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>Pricing</Typography>
            <Box sx={{ border: 1, borderRadius: 2, p: 3 }}>
              <Grid container spacing={2}>
                {Object.keys(pricing).map((key) => (
                  <Grid item xs={12} md={6} key={key}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body1">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                      <Typography variant="body1">{pricing[key].current_price}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>

          {/* Mileage Details */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>Mileage</Typography>
            <Box sx={{ border: 1, borderRadius: 2, p: 3 }}>
              <Grid container spacing={2}>
                {Object.keys(mileage).map((key) => (
                  <Grid item xs={12} md={6} key={key}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body1">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                      <Typography variant="body1">{mileage[key].mileage || "N/A"}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>

          {/* Features List */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>Features</Typography>
            <ul>
              {featuresList.map((feature, index) => (
                <li key={index}><Typography variant="body1">{feature}</Typography></li>
              ))}
            </ul>
          </Box>
          
        </Box>
      </SiteLayout>
    );
  }

  return null;
};

export default CarDetailPage;
