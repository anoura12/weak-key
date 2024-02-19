import Layout from "../src/layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAuth} from "../src/useAuth";

const IndexPage = () => {

    const router = useRouter();
    const [isLoggedIn, isLoading] = useAuth();
    const [flag, setFlag] = useState(null);

    useEffect(() => {
        if(!isLoading && !isLoggedIn){
            router.push("/login");
        }
        getFlag();
    }, [isLoading]);

    const getFlag = () => {
        fetch(`/api/flag`, {
            method: 'GET',
            mode: 'cors',
        }).then((r) => {
            if(r.ok)
                r.json().then((data) => {
                    setFlag(data?.flag)
                });
        })
    }

    return (
        <Layout>
            <div className="flex justify-center items-center h-full p-2" style={{minHeight: '85vh'}}>
                <div className="p-3 text-xl font-semibold text-center" style={{ width: '1200px', maxWidth: '100%' }}>
                {flag ? (<h2>{flag}</h2>) : (<h2>Site under maintenance</h2>)}
                </div>
            </div>
        </Layout>
    );
}

export default IndexPage;
