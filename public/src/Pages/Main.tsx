import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Canvas from "../Components/Canvas"
import SettingBar from "../Components/SettingBar"
import Toolbar from "../Components/Toolbar"
import { io, Socket } from "socket.io-client"
import Modal from "../Components/Modal"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useActions } from "../hooks/useActions"
import Brush from "../tools/Brush"
import { draw } from "../helpFunctions/draw"
import { IDraw } from "../types/draw/"
import { getCurrentImage } from "../helpFunctions/updateImgReq"
import { IUser } from "../types/user"

const MainPage: React.FC = () => {

    const { id } = useParams()
    const { canvas: { username, canvasEl } } = useTypedSelector(state => state)
    const [isModalOpened, setIsModalOpened] = useState<boolean>(true)
    const { actionAddId, actionAddSocket, actionAddTool, actionGetAllUsers, actionRemoveUser, actionAddUser } = useActions()


    useEffect(() => {
        // if (id) {
        async function start() {
            if (id && canvasEl) {
                const data = await getCurrentImage(id!)
                if (data.status) {
                    const image = new Image()
                    image.src = data.data!
                    image.onload = () => {
                        const context: CanvasRenderingContext2D | null = canvasEl!.getContext("2d")
                        context?.drawImage(image, 0, 0, canvasEl?.width!, canvasEl?.height!)
                    }

                }
            }

        }

        start()
        // }
    }, [id, canvasEl])

    useEffect(() => {

        if (username) {
            const socket: Socket = io("http://localhost:3000")
            actionAddTool(new Brush(canvasEl!, id!, socket))
            actionAddId(id!)
            actionAddSocket(socket)
            const context: CanvasRenderingContext2D | null = canvasEl!.getContext("2d")
            socket.on("connect", () => {
                
                socket.emit("connected", {
                    name: username,
                    id
                }, (data: IUser[]) => {
                    actionGetAllUsers(data)
                })

                socket.on("connect-person", (data: IUser) => {
                    console.log("wtf")
                    actionAddUser(data)
                })

                socket.on("draw", (data: IDraw) => {
                    
                    draw(data, context)
                })

                socket.on("leave-user", (data: IUser) => {
                    actionRemoveUser(data)
                })

                socket.on("update", (data: string) => {
                    // debugger
                    console.log(data)
                    const image = new Image()
                    image.src = data
                    image.onload = () => {
                        context!.clearRect(0, 0, canvasEl!.width, canvasEl!.height)
                        context?.drawImage(image, 0, 0, canvasEl!.width, canvasEl!.height)
                    }
                })

            })
        }

    }, [username])


    const hanlderCloseModal = () => {
        setIsModalOpened(false)
    }

    return (
        <>
            <Toolbar />
            <SettingBar />
            <Canvas />
            {
                isModalOpened && <Modal closeModal={hanlderCloseModal} />
            }
        </>
    );
}

export default MainPage