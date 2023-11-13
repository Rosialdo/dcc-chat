"use client";
import ChatPage from "@/components/chat/ChatPage";
import { useConnection } from "@/context/connect";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
    const [showSpinner, setShowSpinner] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [userName, setuserName] = useState("");
    
    const {connection} = useConnection()

    function handleJoin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // logica de login no chat -SocketIO
        if(userName !== ""){
            connection.emit("join_room", userName)
            setShowSpinner(true)
            setTimeout(() => {
                setShowChat(true)
                setShowSpinner(false)
            }, 1000)
        }
        setShowChat(false);  
    }

    return (
        <main className="flex w-full h-screen bg-[#D9D9D9]">
            <div
                className="flex flex-col w-full h-full justify-center items-center gap-2"
                style={{ display: showChat ? "none" : "" } /**/}
            >
                <div className="w-1/5">
                    <Image
                        src="/logo-dcc-01.png"
                        alt="Logo Chat-DCC"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full"
                        priority
                    />
                </div>
                <div>
                    <form onSubmit={handleJoin} className="flex gap-2">
                        <input
                            type="text"
                            className="rounded px-2 py-3 text-gray-700 border border-gray-400"
                            placeholder="Digite o seu usuário"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            {!showSpinner ? (
                                "Entrar"
                            ) : (
                                <div className="w-8 h-8 rounded-full animate-spin border-2 border-solid border-white-500 border-t-transparent"></div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-full" style={{ display: showChat ? "" : "none" }}>
                <ChatPage userName={userName} />
            </div>
        </main>
    );
}
