import { HttpException, HttpStatus, Injectable, StreamableFile } from "@nestjs/common";
import { existsSync, createReadStream, writeFileSync, readFileSync } from "fs"
import { resolve } from "path";

@Injectable()
export class ImageService {
    constructor(){}

    getImage(id: string): string {
        const dir = resolve(__dirname, ".." ,"static", id + ".jpg")

        if (existsSync(dir)) {
            const file = readFileSync(dir)
            const data = "data:image/png;base64," + file.toString("base64")
            return data!
        } else {
            throw new HttpException("Файл не найден", HttpStatus.NOT_FOUND)
        }
    }

    addImage(id: string, img: string) {
        const fileString = img.replace(`data:image/png;base64,`, "")
        const dir = resolve(__dirname, "..", "static", id + ".jpg")
        writeFileSync(dir, fileString, "base64")
        return "good"
    }
}