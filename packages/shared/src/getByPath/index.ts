import { Get, Path, getByPath as _getByPath } from '@vill-v/path-prop'
import { type MaybeRef, unref } from 'vue'

export function getByPath<Data, Key extends Path>(data: MaybeRef<Data>, path: Key): Get<Data, Key>
export function getByPath<Data>(data: MaybeRef, path?: Path): Data
export function getByPath(data: MaybeRef<any>, path?: Path) {
  if (!path) return unref(data)
  return _getByPath(unref(data), path)
}

export { type Path }
