package com.github.padaria.service;

import com.github.padaria.exception.NotFoundException;
import com.github.padaria.model.Produto;
import com.github.padaria.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    public Produto obterProduto(Integer id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Produto com o id " + id + " não encontrado"));
    }

    public Produto adicionar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public void deletar(Integer id) {
        if (!produtoRepository.existsById(id))
            throw new NotFoundException("Produto com o id " + id + " não encontrado");

        produtoRepository.delete(new Produto(id));
    }

    public Produto atualizar(Produto produtoAtualizado) {
        Produto produto = produtoRepository.findById(produtoAtualizado.getId())
                .orElseThrow(() -> new NotFoundException("Produto com o id " + produtoAtualizado.getId() + " não encontrado"));

        produto.setNome(produtoAtualizado.getNome());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setQtdProduto(produtoAtualizado.getQtdProduto());

        return produtoRepository.save(produto);
    }

}
