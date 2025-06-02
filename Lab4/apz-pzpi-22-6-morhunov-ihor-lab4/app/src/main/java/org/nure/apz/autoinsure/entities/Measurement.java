package org.nure.apz.autoinsure.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Measurement {
    private Integer id;
    private Integer sensorId;
    private LocalDateTime readingTime;
    private String parameterType;
    private BigDecimal value;
}
