import { ActionStates, type Cycle } from "./reducer";


export function criarNovoCicloAction(newCycle: Cycle) {
        return {
            type: ActionStates.CRIAR_NOVO_CICLO,
            payload: {
                newCycle
            }
        }
}

export function interromperCicloAction() {
        return {
            type: ActionStates.INTERROMPER_CICLO,
        }
}

export function marcarCicloAtivoComoConcluidoAction() {
        return {
            type: ActionStates.MARCAR_CICLO_CONCLUIDO,
        }
}