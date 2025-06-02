package org.nure.apz.autoinsure.entities;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Sensor {
    private int id;
    private String sensorType;
    private String currentState;
    private LocalDate lastUpdate;
    private int carId;
}
