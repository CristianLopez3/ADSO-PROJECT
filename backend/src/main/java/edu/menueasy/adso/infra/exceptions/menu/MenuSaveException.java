package edu.menueasy.adso.infra.exceptions.menu;

public class MenuSaveException extends RuntimeException {
  public MenuSaveException(String message, Throwable cause) {
    super(message, cause);
  }
}