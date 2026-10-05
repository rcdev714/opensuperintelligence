import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "default" | "lg";
  showWordmark?: boolean;
  className?: string;
  href?: string;
}

export function Logo({ size = "default", showWordmark = true, className, href = "/" }: LogoProps) {
  const iconSizes = {
    sm: 20,
    default: 24,
    lg: 32,
  };

  const textSizes = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      <div className="relative flex items-center justify-center shrink-0">
        <Image
          src="/osi-logo.svg"
          alt="OpenSuperIntelligence"
          width={iconSizes[size]}
          height={iconSizes[size]}
          className="rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {showWordmark && (
        <div className={cn("font-medium tracking-tight text-[#F5F5F7] flex items-center gap-1", textSizes[size])}>
          <span className="font-semibold tracking-tight text-[#F5F5F7]">OpenSuperIntelligence</span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-flex items-center">{content}</Link>;
  }

  return content;
}
