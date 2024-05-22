package edu.menueasy.adso.infra.exceptions.menu;

public class InvalidMenuException extends RuntimeException {
  public InvalidMenuException(String message) {
    super(message);
  }
}