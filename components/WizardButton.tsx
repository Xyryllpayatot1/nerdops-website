'use client';

interface WizardButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function WizardButton({ className, children }: WizardButtonProps) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('openWizard'))}
    >
      {children}
    </button>
  );
}
