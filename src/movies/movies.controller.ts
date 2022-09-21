import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  index(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  show(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: object) {
    return this.moviesService.store(movieData);
  }

  @Patch(':id')
  update(@Param('id') movieId: string, @Body() updateData: object) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }

  @Delete(':id')
  destroy(@Param('id') movieId: string) {
    return this.moviesService.delete(movieId);
  }
}
