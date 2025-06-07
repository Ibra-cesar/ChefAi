import type React from "react";
import { useState } from "react";
import { SideBarContext } from "../Context";


export const SideBarProvider = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const togle = () => setIsOpen((prev) => !prev)

    return (
        <SideBarContext.Provider value={{isOpen, togle}}>
            {children}
        </SideBarContext.Provider>
    )
}

