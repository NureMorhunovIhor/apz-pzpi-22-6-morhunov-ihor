package org.nure.apz.autoinsure.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarType {
    private int id;
    private String carTypeName;
    private double minTirePressure;
    private double maxTirePressure;
    private double minFuelLevel;
    private double maxFuelLevel;
    private double minEngineTemp;
    private double maxEngineTemp;
}
