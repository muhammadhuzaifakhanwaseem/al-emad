// next.config.js
module.exports = {
    images: {
        domains: ['10xksa.com'], // Add '10xksa.com' to the list of allowed image domains
    },
    async rewrites() {
        return [
            {
                source: '/api/cars', // The local endpoint
                destination: 'https://10xksa.com/rentify/api/v1/cars', // The external API endpoint
            },
            {
                source: '/api/cars/:id', // Local endpoint for fetching a single car
                destination: 'https://10xksa.com/rentify/api/v1/cars/:id', // External API endpoint for fetching a single car
            },
            {
                source: '/api/car/booking', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/car/booking', // External API endpoint for car booking
            },
            {
                source: '/api/login', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/login', // External API endpoint for car booking
            },
            {
                source: '/api/register', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/register', // External API endpoint for car booking
            },
            {
                source: '/api/user/profile', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/user/profile', // External API endpoint for car booking
            },
            {
                source: '/api/user/profile/update', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/user/profile/update', // External API endpoint for car booking
            },
            {
                source: '/api/user/password/update', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/user/password/update', // External API endpoint for car booking
            },
            {
                source: '/api/my/bookings', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/my/bookings', // External API endpoint for car booking
            },
            {
                source: '/api/car/brands', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/car/brands', // External API endpoint for car booking
            },
            {
                source: '/api/car/type', // Local endpoint for car booking
                destination: 'https://10xksa.com/rentify/api/v1/car/type', // External API endpoint for car booking
            },
        ];
    },
};
