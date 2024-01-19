'use client';
import UserTabs from "../components/layout/UserTabs";
import {useProfile} from "../components/useProfile";

export default function OrdersPage(){
    const {loading, isAdmin} = useProfile();

    if(loading){
        return "Loading user info...";
    }

    if(!isAdmin){
        return "You're not and admin...!";
    }

    return(<section className=" max-w-lg mx-auto mt-8">
        <UserTabs isAdmin={isAdmin}/>

    </section>)
}