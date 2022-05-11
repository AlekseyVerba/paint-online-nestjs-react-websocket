import { Body, Controller, Get, Param, Post, Query, StreamableFile } from "@nestjs/common";
import { ImageService } from "./image.service";


@Controller("images")
export class ImageController {
    constructor(
        private readonly imageService: ImageService
    ) {}

    @Post()
    addImage(
        @Query("id") id: string,
        @Body("img") img: string
    ) {
        return this.imageService.addImage(id, img)
    }

    @Get("/:idImage")
    getImage(
        @Param("idImage") id: string
    ): string {
        const file = this.imageService.getImage(id)
        return file
    }
}