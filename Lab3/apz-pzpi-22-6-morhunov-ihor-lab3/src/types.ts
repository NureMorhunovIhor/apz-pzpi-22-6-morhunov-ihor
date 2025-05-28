export type Car = {
    id: number;
    licensePlate: string;
    brand: string;
    model: string;
    year: number;
    userId: number;
    carTypeId: number;
};

export type CarType = {
    id: number;
    carTypeName: string;
    minTirePressure: number;
    maxTirePressure: number;
    minFuelLevel: number;
    maxFuelLevel: number;
    minEngineTemp: number;
    maxEngineTemp: number;
};

export type Rule = {
    id: number;
    carType: string;
    formula: string;
    technicalFactorThreshold: number;
    technicalFactorMultiplier: number;
    basePrice: number;
};

export type User = {
    id: number;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "client" | "administrator" | "global_admin" | "business_logic_admin" | "settings_admin";
    password: string;
};

export type JavaDate = string | number[];

export type Sensor = {
    id: number;
    sensorType: string;
    currentState: string;
    lastUpdate: JavaDate;
    carId: number;
};

export type Maintenance = {
    id: number;
    maintenanceDate: JavaDate;
    maintenanceType: string;
    description: string;
    cost: number;
    carId: number;
};

export type Incident = {
    id: number;
    incidentDate: JavaDate;
    incidentType: string;
    description: string;
    sensorId: number;
    carId: number;
};

export type Policy = {
    id: number;
    startDate: JavaDate;
    endDate: JavaDate;
    status: "pending" | "rejected" | "approved";
    price: number;
    carId: number;
};

export type Measurement = {
    id: number;
    sensorId: number;
    readingTime: JavaDate;
    parameterType: "Tire Pressure" | "Fuel Level" | "Engine Temperature";
    value: number;
};

export type Payment = {
    id: number;
    paymentDate: JavaDate;
    paymentMethod: string;
    policyId: number;
};
