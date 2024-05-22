package edu.menueasy.adso.infra.exceptions.menu;

public class CategoryNotFoundException extends RuntimeException {
  public CategoryNotFoundException(Integer id) {
    super("Cannot fint category with id: " + id + ".");
  }
}
