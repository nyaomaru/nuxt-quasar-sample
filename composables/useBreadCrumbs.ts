import { ROUTE } from '@/constants/route';

export const useBreadCrumbs = () => {
  const route = useRoute();

  const breadCrumbs = computed(() => {
    const pathArray = route.path.split('/');

    const crumbs = pathArray.map((path: string, index: number) => {
      const to = index === 0 ? '/' : String(pathArray.slice(0, index + 1)).replaceAll(',', '/');
      return { label: path.charAt(0).toUpperCase() + path.slice(1), to: to };
    });

    return crumbs.filter((crumb: { label: string }) => crumb.label !== '');
  });

  const notShowBreadCrumbsList = [ROUTE.TOP, ROUTE.LOGIN, ROUTE.REGISTER] as string[];

  const showBreadCrumbs = computed(() => {
    return !notShowBreadCrumbsList.includes(route.path);
  });

  return {
    breadCrumbs,
    showBreadCrumbs,
  };
};
