package edu.menueasy.adso.domain.menu;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer>{

  List<Menu> findByCategoryId(Integer idCategory);


  @Modifying
  @Query("""
    UPDATE Menu m
        SET m.imageName = :imageUrl
        WHERE m.id = :menuId
    """)
  void updateImageUrl(Integer menuId, String imageUrl);

}