import Link from "next/link";

interface NavigationProps {
  route: string;
  text: string;
  className?: string;
}

export default function Navigation({
  route,
  text,
  className,
}: NavigationProps) {
  return (
    <Link className={className} href={route}>
      {text}
    </Link>
  );
}
