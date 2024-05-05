import { LucideProps } from "lucide-react";

export default function MyIcon({ className, icon: Icon }: { className: string, icon: React.FC<LucideProps> }) {
    return <Icon className={className} />;
  }