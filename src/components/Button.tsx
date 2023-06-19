import React, { forwardRef } from 'react';
import { twMerge as tw } from 'tailwind-merge';

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ onClick, className, ...rest }: IButton, ref): JSX.Element => {
    return (
      <button
        onClick={onClick}
        {...rest}
        className={tw(
          'bg-slate-300 rounded px-2 py-1 drop-shadow-sm hover:drop-shadow-lg hover:scale-105 hover:font-bold',
          className
        )}
        ref={ref}
      ></button>
    );
  }
);

const PrimaryButton = forwardRef<HTMLButtonElement, IButton>(({ className, ...props }, ref) => (
  <Button {...props} className={tw('bg-primary', className)} ref={ref} />
));

const SecondaryButton = forwardRef<HTMLButtonElement, IButton>(({ className, ...props }, ref) => (
  <Button {...props} className={tw('bg-secondary', className)} ref={ref} />
));

export { PrimaryButton, SecondaryButton };
export default Button;
