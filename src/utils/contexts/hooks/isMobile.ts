
import { useEffect, useState } from 'react'

const useIsMobile = (breakpoints: number = 768) => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null)

    useEffect(() => {
        function checkIsMobile(): void{
            setIsMobile(window.innerWidth < breakpoints)
        }
        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)

        return() => {
            window.removeEventListener('resize', checkIsMobile)
        }
    }, [breakpoints])  

    return isMobile;
}

export default useIsMobile