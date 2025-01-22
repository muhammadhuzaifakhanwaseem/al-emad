const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
const imageDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: imageDomain,
                port: '',
                pathname: '/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/cars',
                destination: `${baseApiUrl}/cars`,
            },
            {
                source: '/api/cars/:id',
                destination: `${baseApiUrl}/cars/:id`,
            },
            {
                source: '/api/car/booking',
                destination: `${baseApiUrl}/car/booking`,
            },
            {
                source: '/api/login',
                destination: `${baseApiUrl}/login`,
            },
            {
                source: '/api/register',
                destination: `${baseApiUrl}/register`,
            },
            {
                source: '/api/user/profile',
                destination: `${baseApiUrl}/user/profile`,
            },
            {
                source: '/api/user/profile/update',
                destination: `${baseApiUrl}/user/profile/update`,
            },
            {
                source: '/api/user/password/update',
                destination: `${baseApiUrl}/user/password/update`,
            },
            {
                source: '/api/my/bookings',
                destination: `${baseApiUrl}/my/bookings`,
            },
            {
                source: '/api/car/brands',
                destination: `${baseApiUrl}/car/brands`,
            },
            {
                source: '/api/car/type',
                destination: `${baseApiUrl}/car/type`,
            },
        ];
    },
};
