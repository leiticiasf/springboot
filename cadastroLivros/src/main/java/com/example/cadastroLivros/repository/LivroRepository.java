
package com.example.cadastroLivros.repository;

import com.example.cadastroLivros.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LivroRepository extends JpaRepository<Livro, Long> {
}
