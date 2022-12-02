
import {} from '@headlessui/react';
import {} from '@heroicons/react/24/outline';
import axios from "axios";
import { useState } from 'react';
import ApiIntegrationModal from './ApiIntegrationModal';
import SuccessModal from './SuccessModal';

export default function HomeMain() {

    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [apiIntegrationModalOpen, setApiIntegrationModalOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    function handleChange(e){
        setUrl(e.currentTarget.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const submitBtn = e.target.submitBtn;
        try{
            submitBtn.disabled=true;
            submitBtn?.children[0]?.classList.remove("hidden");
            submitBtn.children[1].innerHTML = "Generating...";

            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/generate`,{url});
            setShortUrl(data.shortUrl);
            setSuccessModalOpen(true);
        }
        catch(err){
            alert(err.message || err);
        }
        finally{
            submitBtn.disabled=false;
            submitBtn?.children[0]?.classList.add("hidden");
            submitBtn.children[1].innerHTML = "Generate";
        }
    }

    return (
        <main>
            <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="py-4">
                {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    <span className="text-gray-600">
                        <a href="#" className="font-semibold text-indigo-600">
                        <span className="absolute inset-0" aria-hidden="true" />
                        Know how it works <span aria-hidden="true">&rarr;</span>
                        </a>
                    </span>
                    </div>
                </div> */}
                <form onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                    Shorten URL in Seconds
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                    Please enter the url below to get started
                    </p>
                    
                    <div className="flex align-center justify-center">
                        <div className="relative mt-1 rounded-md shadow-sm w-1/2">
                            <input
                                type="url"
                                id="url"
                                name="url"
                                value={url}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="https://www.myurl.com"
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex gap-x-4 sm:justify-center">
                    <button
                        name="submitBtn"
                        className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                    >
                        <svg aria-hidden="true" role="status" className="hidden inline mr-2 w-4 h-4 mb-1 text-white animate-spin" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        <span>Generate</span>
                    </button>
                    <button
                    onClick={()=>setApiIntegrationModalOpen(true)}
                        className="self-center inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                        type="button"
                    >
                        Use API
                    </button>
                    </div>
                </form>
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                    <svg
                    className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                        fillOpacity=".3"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />
                    <defs>
                        <linearGradient
                        id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                        x1="1155.49"
                        x2="-78.208"
                        y1=".177"
                        y2="474.645"
                        gradientUnits="userSpaceOnUse"
                        >
                        <stop stopColor="#9089FC" />
                        <stop offset={1} stopColor="#FF80B5" />
                        </linearGradient>
                    </defs>
                    </svg>
                </div>
                </div>
            </div>
            </div>

            <SuccessModal open={successModalOpen} setOpen={setSuccessModalOpen} shortUrl={shortUrl} url={url}/>

            <ApiIntegrationModal open={apiIntegrationModalOpen} setOpen={setApiIntegrationModalOpen}/>
        </main>

    )
}