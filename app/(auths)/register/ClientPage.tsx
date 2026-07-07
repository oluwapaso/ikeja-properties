// app/register/ClientPage.tsx
	'use client';

	import { useEffect } from 'react';
	import { hidePageLoader } from '@/app/GlobalRedux/app/appSlice';
	import { useDispatch, useSelector } from 'react-redux';
	import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
	import { updateThemeSettings } from '@/app/GlobalRedux/theme/themeSlice';

	import PageRenderer from '@/components/PageRenderer';
	import { getComponent } from '@/components/registry';

	export default function ClientPage({ 
		themeData, 
		pageData,
		googleFontsURL
	}: { 
		themeData: any; 
		pageData: any; 
		googleFontsURL: string;
	}) {
 
		const theme = useSelector((state: RootState) => state.theme); 
		const dispatch = useDispatch<AppDispatch>();

		 // Extract nav and footer from the new object structure
        const navBlock = themeData.theme_settings?.nav_component;
        const footerBlock = themeData.theme_settings?.footer_component;

        // Get the actual component
        const NavComponent = getComponent(navBlock?.type);
        const FooterComponent = getComponent(footerBlock?.type);
 
	    useEffect(() => { 
	        dispatch(hidePageLoader());
	    }, [dispatch]);

		// Load Google Fonts dynamically
		useEffect(() => {
			if (googleFontsURL) {
				const link = document.createElement('link');
				link.href = googleFontsURL;
				link.rel = 'stylesheet';
				document.head.appendChild(link);
			}
		}, [googleFontsURL]);

		 useEffect(() => { 
			if (theme.theme_settings?.is_default == "Yes") { 
				dispatch(updateThemeSettings(themeData.theme_settings));
			} 
		}, [theme.theme_settings?.is_default]); 

		return (
			<div className="flex flex-col min-h-screen">
				{/* Dynamic Navigation */}
				{NavComponent ? (
					<NavComponent {...(navBlock?.props || {})} is_theme={false} transparent={true} />
				) : (
					<nav className="h-20 bg-gray-900 flex items-center justify-center text-white">
						Nav Component Not Found
					</nav>
				)}

				<main className="flex-1 w-full">
					<PageRenderer data={pageData} is_theme={false} />
				</main>

				{/* Dynamic Footer */}
				{FooterComponent ? (
					<FooterComponent is_theme={false} />
				) : (
					<footer {...(footerBlock?.props || {})} className="h-20 bg-gray-900 flex items-center justify-center text-white">
						Footer Component Not Found
					</footer>
				)}
			</div>
		);
	}
	