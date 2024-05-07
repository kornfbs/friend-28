import Header from "@/components/my/header";
import PublicHeader from "@/components/my/public_header";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}

        </div>
    );
}

