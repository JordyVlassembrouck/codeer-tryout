import { Module } from '@nestjs/common';
import { PokemonController } from './controllers';
import { PokemonRepository } from './repositories';

@Module({
    imports: [],
    controllers: [PokemonController],
    providers: [PokemonRepository],
})
export class PokemonModule {}
