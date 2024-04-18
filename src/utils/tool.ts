import type { MenuProps } from 'antd'

interface routesType {
  path: string
  element?: JSX.Element
  label?: string
  children?: routesType[]
  icon?: any
}
export const formatRoutesToMenu = (
  routes: routesType[]
): MenuProps['items'] => {
  return routes
    .filter((route) => route.label)
    .map((route) => ({
      label: route.label,
      key: route.path,
      icon: route.icon
    }))
}
export const formatPageRoutesToMenu = (
  routes: routesType[],
  pPath?: string
): MenuProps['items'] => {
  return routes.map((route) => ({
    label: route.label,
    key: pPath ? `${pPath}/${route.path}` : route.path,
    icon: route.icon,
    children: route.children
      ? formatPageRoutesToMenu(route.children, route.path)
      : null
  }))
}
