import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  all(): Movie[] {
    return this.movies;
  }

  find(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  delete(id: number) {
    this.find(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  save(data: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...data,
    });
  }

  update(id: number, data: UpdateMovieDto) {
    const movie = this.find(id);
    this.delete(id);
    this.movies.push({ ...movie, ...data });
  }
}
