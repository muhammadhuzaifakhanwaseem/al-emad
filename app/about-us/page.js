"use client"
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import SiteLayout from "../components/Layouts/SiteLayout";

const AboutUsPage = () => {
  return (
    <SiteLayout>
    <Box sx={{ bgcolor: "#f9f9f9", py: 6 }}>
      <Container maxWidth="lg">
        {/* Section: Who We Are */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Valuing the Ultimate Car Rental Satisfaction for Every Trip in UAE
            and Dubai
          </Typography>
        </Box>

        <Typography variant="body1" mb={4}>
          Bound with a clear goal to ensure that traveling in UAE and Dubai
          should be enjoyable and hassle-free, Al Emad came forward to give
          long-lasting rental car experiences for car lovers. Today, we offer a
          large fleet of varied rent-a-car in Dubai, including more than 1000+
          cars purchased from leading brands. Each of our vehicles is checked
          and serviced to ensure safety and comfort and never compromised at
          any point of the ride.
        </Typography>

        <Typography variant="body1" mb={6}>
          Hold your breath as we introduce you to Al Emad’s self-drive car
          rental services in Dubai. We pamper our clients to drive in
          world-class brands like Mercedes, Nissan, Audi, Toyota, and others
          too. Whatever you choose, we guarantee a perfect blend of luxury and
          thrill. If you are looking for quality, tailor-made customer service,
          and quick rental processing, our top-notch car rental services are
          your best choice at any time of the year.
        </Typography>

        {/* Section: Vision, Mission, Value */}
        <Grid container spacing={4} mb={6}>
          {[
            {
              title: "Our Vision",
              content:
                "To become a leader in the car rental industry establishing a great base assuring the best quality customers can experience under the diversified rental fleets.",
            },
            {
              title: "Our Mission",
              content:
                "We aim to be the first choice in car leasing in Dubai and cater to the needs of our discerning customers by offering unparalleled flexibility.",
            },
            {
              title: "Our Value",
              content:
                "We are committed to providing the highest level of monthly car rental in Dubai with high-quality vehicles ensuring hassle-free dealing with leading brands across the world.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Section: Stats */}
        <Box textAlign="center" mb={6}>
          <Grid container spacing={4}>
            {[
              {
                icon: <PeopleIcon fontSize="large" color="primary" />,
                label: "Happy Customers",
                value: "98%",
              },
              {
                icon: <DirectionsCarIcon fontSize="large" color="primary" />,
                label: "Rented Customers",
                value: "13K+",
              },
              {
                icon: <LocationOnIcon fontSize="large" color="primary" />,
                label: "Locations",
                value: "7+",
              },
              {
                icon: <StarIcon fontSize="large" color="primary" />,
                label: "Ratings Overall",
                value: "5/5",
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box textAlign="center">
                  <Avatar sx={{ bgcolor: "primary.light", margin: "0 auto", mb: 2 }}>
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h5">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Section: Policies */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Policies
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" mb={2}>
            Committed to upgrading to the best concern over the quality of cars.
            Seamless digital experience for long-term car rental, Dubai. Our
            services are intended to render great traveling around the UAE.
          </Typography>
          <Typography variant="body1">
            Al Emad provides you with the freedom to explore the emirate in the
            sheer abundance of choice. We offer more upscale options for
            renting cars as per your preference. Al Emad is one of the best
            rental car companies in Dubai, striving to provide excellent
            customer service, a modern and high-quality fleet, and to be at the
            forefront of rent-a-car services in Dubai.
          </Typography>
        </Box>
      </Container>
    </Box>
    </SiteLayout>
  );
};

export default AboutUsPage;
