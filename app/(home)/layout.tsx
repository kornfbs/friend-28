import Header from "@/components/my/header";
import PublicHeader from "@/components/my/public_header";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <PublicHeader />
            {children}

        </div>
    );
}

