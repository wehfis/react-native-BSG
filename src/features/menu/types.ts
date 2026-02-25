export interface MenuItem {
    id: string;
    title: string;
    url?: string | null;
    isSecure?: boolean;
    children?: MenuItem[];
  }
  
  export interface MenuConfiguration {
    items: MenuItem[];
  }