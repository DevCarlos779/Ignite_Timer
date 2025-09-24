import { produce } from 'immer';

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishDate?: Date
}

export enum ActionStates {
    CRIAR_NOVO_CICLO = 'CRIAR_NOVO_CICLO',
    INTERROMPER_CICLO = 'INTERROMPER_CICLO',
    MARCAR_CICLO_CONCLUIDO = 'MARCAR_CICLO_CONCLUIDO'
}

export function cyclesReducer(state: CyclesState, action: any) {

        switch(action.type) {
            case ActionStates.CRIAR_NOVO_CICLO:
                // return {
                //     ...state, 
                //     cycles: [...state.cycles, action.payload.newCycle],
                //     activeCycleId: action.payload.newCycle.id
                //  };

                return produce(state, (draft) => {
                    draft.cycles.push(action.payload.newCycle)
                    draft.activeCycleId = action.payload.newCycle.id
                })

            case ActionStates.INTERROMPER_CICLO: {
                // return {
                //     ...state,
                //     cycles: state.cycles.map((cycle) => {
                //         if(cycle.id == state.activeCycleId) {
                //             return {...cycle, interruptDate: new Date()};
                //         } else {
                //             return cycle;
                //         }
                //     }),
                //     activeCycleId: null
                // }

                const currentCycleIndex = state.cycles.findIndex((cycle) => {
                    return cycle.id == state.activeCycleId;
                })

                if(currentCycleIndex < 0) {
                    return state;
                }

                return produce(state, (draft) => {
                    draft.cycles[currentCycleIndex].interruptDate = new Date();
                    draft.activeCycleId = null;
                })
            }

            case ActionStates.MARCAR_CICLO_CONCLUIDO: {
                // return {
                //     ...state,
                //     cycles: state.cycles.map((cycle) => {
                //         if(cycle.id == state.activeCycleId) {
                //             return {...cycle, finishDate: new Date()};
                //         } else {
                //             return cycle
                //         }
                //     }),
                //     activeCycleId: null
                // }

                const currentCycleIndex = state.cycles.findIndex((cycle) => {
                    return cycle.id == state.activeCycleId;
                })

                if(currentCycleIndex < 0) {
                    return state;
                }

                return produce(state, (draft) => {
                    draft.cycles[currentCycleIndex].finishDate = new Date();
                    draft.activeCycleId = null;
                })
            }

            default:
                return state
        }
        
}