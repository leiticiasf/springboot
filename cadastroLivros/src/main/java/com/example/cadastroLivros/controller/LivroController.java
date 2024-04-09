package com.example.cadastroLivros.controller;
import com.example.cadastroLivros.model.Livro;
import com.example.cadastroLivros.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
@CrossOrigin(origins = "http://localhost:5173")//Endereço do front
@RestController
@RequestMapping("/livros")
public class LivroController {
    @Autowired
    private LivroRepository LivroRepository;
    @GetMapping
    public List<Livro> listarLivro() {
        return LivroRepository.findAll();
    }
    @PostMapping
    public Livro criarLivro(@RequestBody Livro livro) {
        return LivroRepository.save(livro);
    }
     @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarLivro(@PathVariable Long id) {
        if (LivroRepository.existsById(id)) {
            LivroRepository.deleteById(id);
            return ResponseEntity.ok("Livro deletado com sucesso.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizarLivro(@PathVariable(name = "id") Long id, @RequestBody Livro livroAtualizado) {
        if (LivroRepository.existsById(id)) {
            Livro livro = LivroRepository.findById(id).get();
            livro.setTitulo(livroAtualizado.getTitulo());
            livro.setEditora(livroAtualizado.getEditora());
            livro.setAutor(livroAtualizado.getAutor());
            livro.setGenero(livroAtualizado.getGenero());

            Livro livroAtualizadoBD = LivroRepository.save(livro);
            return ResponseEntity.ok(livroAtualizadoBD);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

