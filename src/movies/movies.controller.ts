import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  index(): Movie[] {
    return this.moviesService.all();
  }

  @Get(':id')
  show(@Param('id') movieId: number): Movie {
    return this.moviesService.find(movieId);
  }

  @Post()
  store(@Body() createData: CreateMovieDto) {
    return this.moviesService.save(createData);
  }

  @Patch(':id')
  update(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }

  @Delete(':id')
  destroy(@Param('id') movieId: number) {
    return this.moviesService.delete(movieId);
  }
}
