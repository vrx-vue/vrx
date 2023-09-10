import { Get, Path, getByPath as _getByPath } from '@vill-v/path-prop'
import { unref } from 'vue-demi'
import { MayBeRef } from '../utils'

export function getByPath<Data, Key extends Path>(data: MayBeRef<Data>, path: Key): Get<Data, Key>
export function getByPath<Data>(data: MayBeRef, path?: Path): Data
export function getByPath(data: MayBeRef<any>, path?: Path) {
  if (!path) return unref(data)
  return _getByPath(unref(data), path)
}

export { type Path }
