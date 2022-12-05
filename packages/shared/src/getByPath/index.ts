import { MayBeRef } from '../utils'
import { Path, getByPath as _getByPath } from '@vill-v/path-prop'
import { unref } from 'vue-demi'

export function getByPath<T = any>(data: MayBeRef<any>, path?: Path) {
  if (!path) return unref(data)
  return _getByPath<T>(unref(data), path)
}

export { type Path }
