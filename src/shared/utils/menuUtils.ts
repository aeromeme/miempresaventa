import type { MenuItem } from "primereact/menuitem";

export interface MenuItemWithRoles extends MenuItem {
  roles?: string[];
}

export const filterMenuItemsByRoles = (
  items: MenuItemWithRoles[],
  userRoles: string[]
): MenuItem[] => {
  // First filter out items based on roles
  const filteredByRoles = items.filter((item) => {
    if (item.separator) return true;
    if (!item.roles || item.roles.length === 0) return true;
    return item.roles.some((role) => userRoles.includes(role));
  });

  // Then remove isolated separators
  return filteredByRoles.filter((item, index, array) => {
    if (item.separator) {
      const prevItem = array[index - 1];
      const nextItem = array[index + 1];
      return prevItem && nextItem && !prevItem.separator && !nextItem.separator;
    }
    return true;
  });
};
