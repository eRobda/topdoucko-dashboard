import { useRouter } from "next/router";

export default function MainPage(){
    const router = useRouter();
    router.push("login/")
}