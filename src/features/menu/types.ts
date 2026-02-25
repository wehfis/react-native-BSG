export interface MenuLinks {
  registerUrl: string;
  resetPasswordUrl: string;
  searchUrl: string;
  userTrackingUrl: string;
}

export interface MenuItem {
  id?: string;
  type: 'MenuItem';
  menuLabel: string;
  url?: string | null;
  secure?: boolean;
  menuItems?: MenuItem[];
}

export interface MenuConfiguration {
  type: 'AppAPI';
  links: MenuLinks;
  menuItems: MenuItem[];
}