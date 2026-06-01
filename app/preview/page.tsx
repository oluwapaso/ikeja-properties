'use client';

import { notFound, useSearchParams } from 'next/navigation';
import PageRenderer from '@/components/PageRenderer';
import { JSX, useEffect, useState } from 'react';
import { APIResponseProps } from '@/components/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateThemeSettings } from '../GlobalRedux/theme/themeSlice';
import { getComponent } from '@/components/registry';
import { RootState } from '../GlobalRedux/store';

export const dynamic = 'force-dynamic';   // This forces fresh data on every request (no caching) 

const LivePreviewPage = () => {

    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const company_id = searchParams?.get("company_id") as string || "";
    const agent_id = searchParams?.get("agent_id") as string || "";
    const company_unique_id = searchParams?.get("company_unique_id") as string || "";
    const theme_uid = searchParams?.get("theme_uid") as string || "";
    const access_token = searchParams?.get("access_token") as string || "";
    const page_uid = searchParams?.get("page_uid") as string || "";

    const [pageData, setPageData] = useState<any>(null);
    const [themeData, setThemeData] = useState<any>({});
    const [theme_data_fetched, setThemeDataFetched] = useState(false);

    const DoneRendering = () => {
        // Send a message to the parent window
        window.parent.postMessage(
            { type: 'DONE_RENDERING' },
            '*' // In production, replace '*' with your parent URL for security
        );
    };

    useEffect(() => {
        const fetchThemeInfo = async () => {

            try {

                let fields = ["*"]
                var payload = {
                    "access_token": access_token, //Required 
                    "company_id": company_id,
                    "user_id": agent_id,
                    "company_uid": company_unique_id,
                    "theme_uid": theme_uid,
                    "fields": fields,
                    "kind": "Published"
                };

                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
                await fetch(`${apiBaseUrl}/api/v1/protected/themes/idx-theme`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(payload),
                    'credentials': 'include',
                }).then((resp): Promise<APIResponseProps> => {
                    return resp.json();
                }).then(reqResp => {

                    if (reqResp.success) {

                        setThemeData(reqResp.data?.theme);
                        setThemeDataFetched(true);
                        dispatch(updateThemeSettings(reqResp.data?.theme?.theme_settings));
                        setPageData(() => reqResp.data?.theme?.theme_settings?.pages[page_uid]);
                        // buildPageList(reqResp.data?.theme?.theme_settings?.pages);

                    } else {
                        let msg = reqResp.message;
                        if (Array.isArray(reqResp.message)) {
                            msg = msg.toString();
                        }
                        console.log(msg);
                    }

                }).catch((error: any) => {
                    console.log(error);
                });

            } catch (e: any) {
                console.log(e);
            } finally {
                setThemeDataFetched(true);
            }

        }

        if (theme_uid && theme_uid != "") {
            fetchThemeInfo();
        }

    }, [theme_uid]);

    useEffect(() => {
        DoneRendering();
    }, []);

    if (themeData && pageData) {

        // Extract nav and footer from the new object structure
        const navBlock = themeData.theme_settings?.nav_component;
        const footerBlock = themeData.theme_settings?.footer_component;

        // Get the actual component
        const NavComponent = getComponent(navBlock?.type);
        const FooterComponent = getComponent(footerBlock?.type);

        return <div className="flex flex-col min-h-screen">

            {/* Dynamic Nav */}
            {NavComponent ? (
                <NavComponent {...(navBlock?.props || {})} is_theme={true} transparent={true} />
            ) : (
                <nav className="h-20 bg-gray-900 flex items-center justify-center text-white">
                    Nav Component Not Found
                </nav>
            )}

            <main className="w-full">
                <PageRenderer data={pageData} is_theme={true} />
            </main>

            {/* Dynamic Footer */}
            {FooterComponent ? (
                <FooterComponent {...(footerBlock?.props || {})} is_theme={true} />
            ) : (
                <footer className="h-20 bg-gray-900 flex items-center justify-center text-white">
                    Footer Component Not Found
                </footer>
            )}
        </div>
    }
}

export default LivePreviewPage