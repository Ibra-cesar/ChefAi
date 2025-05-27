import type React from "react";
import { buttonDisabled, buttonVariants, buttonSize } from "../../styles/buttonVariant";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variants?: keyof typeof buttonVariants;
    size?: keyof typeof buttonSize;
}

export const Button = ({children, variants = 'primary', size = 'md', disabled = false, ...ButtonProps}: ButtonProps) => {
    const className = [
        buttonVariants[variants],
        buttonSize[size],
        disabled ? buttonDisabled : '',
        ButtonProps.className || '' 
    ].join('')

    return(
        <button className={className} disabled={disabled} {...ButtonProps}>
            {children}
        </button>
    )
}