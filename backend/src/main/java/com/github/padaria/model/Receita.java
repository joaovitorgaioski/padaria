package com.github.padaria.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "tbreceita")
@Getter
@Setter
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private int qtdReceita;

    // Muitas receitas têm 1 produto e muitas receitas têm 1 ingrediente

    @ManyToOne
    @JoinColumn(name = "produto_fk", nullable = false)
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "ingrediente_fk", nullable = false)
    private Ingrediente ingrediente;

}
