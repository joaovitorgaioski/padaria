package com.github.padaria.controller;

import com.github.padaria.model.Produto;
import com.github.padaria.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/padaria/produtos")
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
