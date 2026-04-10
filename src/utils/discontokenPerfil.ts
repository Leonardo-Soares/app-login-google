import AsyncStorage from '@react-native-async-storage/async-storage'

/** Campos usados só para decidir se o chip Discontoken aparece. */
export interface DadosPerfilDiscontoken {
  associacao_id?: number | string | null
  discotoken?: string | number | boolean | null
}

export function associacaoIdHabilitaDiscontoken(assoc: unknown): boolean {
  if (assoc == null) return false
  if (typeof assoc === 'string') {
    const t = assoc.trim()
    if (t === '' || t === '-') return false
    const n = Number(t)
    return Number.isFinite(n) && n !== 0
  }
  const n = Number(assoc)
  return Number.isFinite(n) && n !== 0
}

export function discotokenHabilitaDiscontoken(disc: unknown): boolean {
  if (disc == null || disc === false) return false
  const s = String(disc).trim()
  if (s === '' || s === '0') return false
  return true
}

export function temDiscontokenNoPerfil(
  perfil: DadosPerfilDiscontoken | null | undefined
): boolean {
  if (!perfil) return false
  return (
    associacaoIdHabilitaDiscontoken(perfil.associacao_id) ||
    discotokenHabilitaDiscontoken(perfil.discotoken)
  )
}

/** Mesma lógica de merge que a Home: `dados-perfil` + fallback `infos-user`. */
export async function obterAssociacaoEDiscotokenDoStorage(): Promise<DadosPerfilDiscontoken | null> {
  try {
    const dp = await AsyncStorage.getItem('dados-perfil')
    const iu = await AsyncStorage.getItem('infos-user')
    const u = iu ? JSON.parse(iu) : {}
    if (dp) {
      const p = JSON.parse(dp) as DadosPerfilDiscontoken
      return {
        associacao_id: p.associacao_id ?? u.associacao_id ?? null,
        discotoken: p.discotoken ?? u.discotoken ?? null,
      }
    }
    if (iu) {
      return {
        associacao_id: u.associacao_id ?? null,
        discotoken: u.discotoken ?? null,
      }
    }
  } catch {
    /* ignore */
  }
  return null
}
