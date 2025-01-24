"use client"
import React, { createContext, useContext, useState } from "react";
import { fetchCarBrands, fetchCarTypes, fetchCars, fetchSingleCar, fetchCarsByBrand, fetchCarsByType } from "../api";

const ApiContext = createContext();

export function ApiProvider({ children }) {
    const fetchData = async (apiFunction, ...args) => {
        try {
            const data = await apiFunction(...args); // Pass arguments to API function
            return data;
        } catch (error) {
            console.error("Error in API call:", error);
            return [];
        }
    };

    const apiFunctions = {
        getBrands: () => fetchData(fetchCarBrands),
        getTypes: () => fetchData(fetchCarTypes),
        getCars: (page, limit) => fetchData(fetchCars, page, limit),
        getCarsByBrand: (page, limit, name) => fetchData(fetchCarsByBrand, page, limit, name),
        getCarsByType: (page, limit, name) => fetchData(fetchCarsByType, page, limit, name),
        getSingleCar: (id) => fetchData(fetchSingleCar, id),
    };

    return (
        <ApiContext.Provider value={{ ...apiFunctions }}>
            {children}
        </ApiContext.Provider>
    );
}
export function useApi() {
    return useContext(ApiContext);
}
