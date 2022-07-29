package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 *
 */

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
@Getter
@Setter
@Embeddable
public abstract class Item {
    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Integer id;

    private String name;
    private Integer sley;
}
