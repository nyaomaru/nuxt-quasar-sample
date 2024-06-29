import { ROUTE } from '@/constants/route';

export const useBreadCrumbs = () => {
  const route = useRoute();

  const breadCrumbs = computed(() => {
    const pathArray = route.path.split('/');

    const crumbs = pathArray.map((path, index) => {
      const to = '/' + pathArray.slice(0, index + 1).join('/');
      return { label: path.charAt(0).toUpperCase() + path.slice(1), to };
    });

    return crumbs.filter(crumb => crumb.label !== '');
  });

  const showBreadCrumbs = computed(() => {
    return route.path !== ROUTE.TOP && route.path !== ROUTE.LOGIN && route.path !== ROUTE.REGISTER;
  });

  return {
    breadCrumbs,
    showBreadCrumbs,
  };
};
