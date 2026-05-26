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
import ContactUsFormVar1 from "./contact-us/ContactUsVarForm-1";

// Define props for each component explicitly
type ComponentPropsMap = {
    PropCardVar1: React.ComponentProps<typeof PropCardVar1>;
    NavVar1: React.ComponentProps<typeof NavVar1>;
    HeaderVar1: React.ComponentProps<typeof HeaderVar1>;
    FeaturedListsingsVar1: React.ComponentProps<typeof FeaturedListsingsVar1>;
    OurServicesVar1: React.ComponentProps<typeof OurServicesVar1>;
    NeighborhoodsVar1: React.ComponentProps<typeof NeighborhoodsVar1>;
    BlogsVar1: React.ComponentProps<typeof BlogsVar1>;
    FooterVar1: React.ComponentProps<typeof FooterVar1>;
    ContactUsFormVar1: React.ComponentProps<typeof ContactUsFormVar1>;
    LoggedInMenu: React.ComponentProps<typeof LoggedInMenu>;
    NoComponents: React.ComponentProps<typeof NoComponents>;
};

export const componentRegistry = {
    NavVar1,
    HeaderVar1,
    FeaturedListsingsVar1,
    OurServicesVar1,
    NeighborhoodsVar1,
    BlogsVar1,
    FooterVar1,
    PropCardVar1,
    ContactUsFormVar1,
    LoggedInMenu,
    NoComponents,
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