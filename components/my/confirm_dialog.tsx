import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LucideProps } from 'lucide-react';
import MyIcon from "./my_icon";

type Props = {
    confirm: () => void;
    title: string;
    description: string;
    icon: React.FC<LucideProps>;
    className: string;
}

function ConfirmDialog({ confirm, title, description, icon, className }: Props) {
    return (
        <AlertDialog >
            <AlertDialogTrigger>
                <div className={className}><MyIcon icon={icon} className={className} /></div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction onClick={() => confirm()}>ยืนยัน</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDialog