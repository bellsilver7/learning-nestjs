import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  index() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made year: ${searchingYear}`;
  }

  @Get(':id')
  show(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData: object) {
    return movieData;
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
    return `This will delete a movie with the id: ${movieId}`;
  }
}
