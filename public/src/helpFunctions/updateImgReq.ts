import { CONFIG } from "../config"

export const updateImageReq = async (id: string, img: string) => {
    fetch(`${CONFIG.SERVER_URL}/images/?id=${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({img: img})
    })

}

export const getCurrentImage = async (id: string) => {
    const req = await fetch(`${CONFIG.SERVER_URL}/images/${id}`)
    
    if (!req.ok) {
        return {
            status: false,
            message: "Произошла ошибка"
        }
    }

    const data = await req.text()
    return {
        status: true,
        data
    }
}