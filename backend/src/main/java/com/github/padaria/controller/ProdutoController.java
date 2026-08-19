package com.github.padaria.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.github.padaria.model.Produto;
import com.github.padaria.service.ProdutoService;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    private ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    /*
    Retorna uma Page de Produtos. Pages são "páginas" de dados. O Spring Data faz uma busca onde especificamos
    a quantidade de elementos que queremos buscar (tamanho) e a página (0, 1, 2...)
    */
    @GetMapping
    public ResponseEntity<Page<Produto>> buscar(
            @RequestParam(required = false, defaultValue = "") String busca,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "20") int tamanho
    ) {
        Pageable pageable = PageRequest.of(pagina, tamanho, Sort.by("nome").ascending());

        Page<Produto> produtos = produtoService.buscar(busca, pageable);

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
