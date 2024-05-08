import Header from "@/components/my/header";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}

        </div>
    );
}

