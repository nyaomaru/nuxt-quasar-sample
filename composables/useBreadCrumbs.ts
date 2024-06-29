import { ROUTE } from '@/constants/route';

export const useBreadCrumbs = () => {
  const route = useRoute();

  const breadCrumbs = computed(() => {
    const pathArray = route.path.split('/');

    const crumbs = pathArray.map((path, index) => {
      const to = index === 0 ? '/' : String(pathArray.slice(0, index + 1)).replaceAll(',', '/');
      return { label: path.charAt(0).toUpperCase() + path.slice(1), to: to };
    });

    return crumbs.filter(crumb => crumb.label !== '');
  });

  const showBreadCrumbsList = [ROUTE.TOP, ROUTE.LOGIN, ROUTE.REGISTER] as string[];

  const showBreadCrumbs = computed(() => {
    return !showBreadCrumbsList.includes(route.path);
  });

  return {
    breadCrumbs,
    showBreadCrumbs,
  };
};
