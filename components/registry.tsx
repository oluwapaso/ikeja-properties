'use client';

import BlogsVar1 from "./blogs/BlogsVar-1";
import FeaturedListsingsVar1 from "./featured-listings/FeaturedListsingsVar-1";
import FooterVar1 from "./footers/FooterVar-1";
import HeaderVar1 from "./headers/HeaderVar-1";
import LoggedInMenu from "./navs/LoggedInMenu";
import NavVar1 from "./navs/NavVar-1";
import NeighborhoodsVar1 from "./neighbrhoods/NeighborhoodsVar-1";
import OurServicesVar1 from "./our-services/OurServicesVar-1";
import PropCardVar1 from "./property-cards/PropCardVar-1";
import NoComponents from "./NoComponents";

//Navs
import NavVar2 from "./navs/NavVar-2";
import NavVar3 from "./navs/NavVar-3";

//Footers
import FooterVar2 from "./footers/FooterVar-2";
import FooterVar3 from "./footers/FooterVar-3";
import FooterVar4 from "./footers/FooterVar-4";
import FooterVar5 from "./footers/FooterVar-5";
import FooterVar6 from "./footers/FooterVar-6";
import FooterVar7 from "./footers/FooterVar-7";
import FooterVar8 from "./footers/FooterVar-8";
import FooterVar9 from "./footers/FooterVar-9";

//Contact Us Forms
import ContactUsFormVar1 from "./contact-us/ContactUsFormVar-1";
import ContactUsFormVar2 from "./contact-us/ContactUsFormVar-2";
import ContactUsFormVar3 from "./contact-us/ContactUsFormVar-3";
import ContactUsFormVar4 from "./contact-us/ContactUsFormVar-4";
import ContactUsFormVar5 from "./contact-us/ContactUsFormVar-5";
import ContactUsFormVar6 from "./contact-us/ContactUsFormVar-6";
import ContactUsFormVar7 from "./contact-us/ContactUsFormVar-7";

// Define props for each component explicitly
type ComponentPropsMap = {
    //Navbars
    NavVar1: React.ComponentProps<typeof NavVar1>;
    NavVar2: React.ComponentProps<typeof NavVar2>;
    NavVar3: React.ComponentProps<typeof NavVar3>;

    HeaderVar1: React.ComponentProps<typeof HeaderVar1>;
    PropCardVar1: React.ComponentProps<typeof PropCardVar1>;
    FeaturedListsingsVar1: React.ComponentProps<typeof FeaturedListsingsVar1>;
    OurServicesVar1: React.ComponentProps<typeof OurServicesVar1>;
    NeighborhoodsVar1: React.ComponentProps<typeof NeighborhoodsVar1>;
    BlogsVar1: React.ComponentProps<typeof BlogsVar1>;

    //Contact Forms
    ContactUsFormVar1: React.ComponentProps<typeof ContactUsFormVar1>;
    ContactUsFormVar2: React.ComponentProps<typeof ContactUsFormVar2>;
    ContactUsFormVar3: React.ComponentProps<typeof ContactUsFormVar3>;
    ContactUsFormVar4: React.ComponentProps<typeof ContactUsFormVar4>;
    ContactUsFormVar5: React.ComponentProps<typeof ContactUsFormVar5>;
    ContactUsFormVar6: React.ComponentProps<typeof ContactUsFormVar6>;
    ContactUsFormVar7: React.ComponentProps<typeof ContactUsFormVar7>;

    LoggedInMenu: React.ComponentProps<typeof LoggedInMenu>;
    NoComponents: React.ComponentProps<typeof NoComponents>;

    //Footer
    FooterVar1: React.ComponentProps<typeof FooterVar1>;
    FooterVar2: React.ComponentProps<typeof FooterVar2>;
    FooterVar3: React.ComponentProps<typeof FooterVar3>;
    FooterVar4: React.ComponentProps<typeof FooterVar4>;
    FooterVar5: React.ComponentProps<typeof FooterVar5>;
    FooterVar6: React.ComponentProps<typeof FooterVar6>;
    FooterVar7: React.ComponentProps<typeof FooterVar7>;
    FooterVar8: React.ComponentProps<typeof FooterVar8>;
    FooterVar9: React.ComponentProps<typeof FooterVar9>;
};

export const componentRegistry = {

    //Navs
    NavVar1,
    NavVar2,
    NavVar3,

    HeaderVar1,
    FeaturedListsingsVar1,
    OurServicesVar1,
    NeighborhoodsVar1,
    BlogsVar1,
    PropCardVar1,

    //Contact Forms
    ContactUsFormVar1,
    ContactUsFormVar2,
    ContactUsFormVar3,
    ContactUsFormVar4,
    ContactUsFormVar5,
    ContactUsFormVar6,
    ContactUsFormVar7,

    LoggedInMenu,
    NoComponents,

    //Footers
    FooterVar1,
    FooterVar2,
    FooterVar3,
    FooterVar4,
    FooterVar5,
    FooterVar6,
    FooterVar7,
    FooterVar8,
    FooterVar9,
} as const;

// Type for the component name (e.g. "NavVar1")
export type ComponentType = keyof typeof componentRegistry;

// Discriminated block type (this is the key fix)
export type ComponentBlock<T extends ComponentType = ComponentType> = {
    type: T;
    props: ComponentPropsMap[T];   // Props are narrowed based on the exact 'type' 
};

// Full page data
export type PageData = {
    uid: string,
    title?: string;
    sections: ComponentBlock[];
    slugs: string,
    isHome: boolean,
    metaDescription?: string
};

// Safe way to get component dynamically
export const getComponent = (name: string | undefined | null): React.ComponentType<any> | null => {
    if (!name) return null;

    // Type assertion to safely index the registry
    const Component = (componentRegistry as any)[name];

    if (!Component) {
        console.warn(`Component "${name}" not registered in componentRegistry`);
        return null;
    }

    return Component;
};
