package org.nure.apz.autoinsure.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Car {
    private int id;
    private String licensePlate;
    private String brand;
    private String model;
    private int year;
    private int userId;
    private int carTypeId;
}
