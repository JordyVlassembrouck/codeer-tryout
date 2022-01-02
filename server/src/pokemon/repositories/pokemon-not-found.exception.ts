import { HttpStatus, NotFoundException } from "@nestjs/common";

export class PokemonNotFoundException extends NotFoundException {
  constructor() {
    super(HttpStatus.NOT_FOUND, 'Pokemon not found');
  }
}