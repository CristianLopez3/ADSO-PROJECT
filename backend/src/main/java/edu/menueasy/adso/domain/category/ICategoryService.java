package edu.menueasy.adso.domain.category;

import java.util.List;

public interface ICategoryService {
    public List<Category> getCategories();
    public Category getCategory(Integer id);

}
