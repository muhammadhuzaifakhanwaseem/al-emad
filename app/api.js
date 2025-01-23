export async function fetchCarBrands() {
    const API_URL = "/api/car/brands";
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch car brands");
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching car brands:", error);
        return [];
    }
}
export async function fetchCarTypes() {
    const API_URL = "/api/car/type";
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch car type");
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching car type:", error);
        return [];
    }
}

export async function fetchCars(page, limit = 10) {
    const API_URL = `/api/cars?page=${page}&limit=${limit}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        return data || { cars: [], total: 0 };
    } catch (error) {
        console.error("Error fetching cars:", error);
        return { cars: [], total: 0 };
    }
}

export async function fetchSingleCar(id) {
    const API_URL = `/api/cars/${id}`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch car");
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching cars:", error);
        return { cars: [], total: 0 };
    }
}


