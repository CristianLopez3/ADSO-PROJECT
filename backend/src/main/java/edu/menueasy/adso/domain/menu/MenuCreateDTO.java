package edu.menueasy.adso.domain.menu;

public record MenuCreateDTO(
        Integer id,
        String title,
        String description,
        Double price,
        Boolean state,
        Integer idCategory
) {
}
