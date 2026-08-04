import type { ComponentType } from 'react'
import type * as THREE from 'three'
import type { Group } from 'three'
import type { ProjectNodeData } from '../worldConfig'
import GithubCabin from './GithubCabin'

export interface DioramaComponentProps {
  node: ProjectNodeData
  characterRef: React.RefObject<Group | null>
  onWalkTo: (pos: THREE.Vector3) => void
}

export const DIORAMAS: Record<string, ComponentType<DioramaComponentProps>> = {
  github: GithubCabin,
}
