import { MayBeRef } from '../utils'
import { getByPath as _getByPath } from '@vill-v/path-prop'
import { unref } from 'vue-demi'

export function getByPath<T = any>(data: MayBeRef<any>, path?: string | (string | number)[]) {
  if (!path) return unref(data)
  return _getByPath<T>(unref(data), path)
}
