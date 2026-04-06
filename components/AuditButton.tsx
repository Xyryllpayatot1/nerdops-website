'use client';

interface AuditButtonProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * A button that opens the CybersecurityAuditModal via a custom event.
 * Use this in Server Component pages instead of an onClick handler.
 */
export default function AuditButton({ className, children }: AuditButtonProps) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('openAuditModal'))}
    >
      {children}
    </button>
  );
}
