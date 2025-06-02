package org.nure.apz.autoinsure.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Policy {
    private int id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private BigDecimal price;
    private int carId;
}
