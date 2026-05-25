package com.github.padaria.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.padaria.model.Produto;
import com.github.padaria.service.ProdutoService;

@RestController
@RequestMapping("/padaria/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    private ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> exibirProdutos() {
        List<Produto> produtos = produtoService.listar();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> obterProduto(@PathVariable Integer id) {
        Produto produto = produtoService.obterProduto(id);
        return ResponseEntity.ok(produto);
    }

    @PostMapping()
    public ResponseEntity<Produto> adicionar(@RequestBody Produto produto) {
        Produto produtoSalvo = produtoService.adicionar(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Integer id, @RequestBody Produto produtoNovo) {
        produtoNovo.setId(id);
        Produto produtoAtualizado = produtoService.atualizar(produtoNovo);

        return ResponseEntity.ok(produtoAtualizado);
    }

}
