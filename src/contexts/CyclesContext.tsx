import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { cyclesReducer, type Cycle } from "../reducers/cycles/reducer";
import { criarNovoCicloAction, interromperCicloAction, marcarCicloAtivoComoConcluidoAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

//interfaces



interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    marcarCicloAtivoComoConcluido: () => void
    setSecondsPassed: (seconds: number) => void
    criarNovoCiclo: (data: CriarNovoCiclo) => void
    interromperCiclo: () => void
}

interface CriarNovoCiclo {
    task: string
    amount: number
}

interface CyclesContextProviderProps {
    children: ReactNode
}



//Context

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)


export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    //states and reducers

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    },
    (initialState) => {
        const storageCyclesState = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');

        if(storageCyclesState) {

            return JSON.parse(storageCyclesState);

        }

        return initialState;
    });

    const {cycles, activeCycleId} = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        
        if(activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0

    });

    

    //useEffect
    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)

    }, [cyclesState])

    //funções

    const setSecondsPassed = (seconds: number) => {
        setAmountSecondsPassed(seconds)
    }

    const marcarCicloAtivoComoConcluido = () => {

        dispatch(marcarCicloAtivoComoConcluidoAction())

        // setCycles((state) => 
        //     state.map((cycle) => {
        //     if(cycle.id == activeCycleId) {
        //         return {...cycle, finishDate: new Date()}
        //     } else {
        //         return cycle;
        //     }
        //     })
        // )
    
    }

    const criarNovoCiclo = (data: CriarNovoCiclo) => {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.amount,
            startDate: new Date(),
        }
    
        setAmountSecondsPassed(0);

        dispatch(criarNovoCicloAction(newCycle))

        // setCycles((previousCycles) => [...previousCycles, newCycle]);
    
    }

    const interromperCiclo = () => {

        dispatch(interromperCicloAction())

        // setCycles((state) => 
        //     state.map((cycle) => {
        //         if(cycle.id == activeCycleId) {
        //             return {...cycle, interruptDate: new Date()}
        //         } else {
        //             return cycle;
        //         }
        //     })
        // )
        
    }

    return(
        <CyclesContext.Provider value={{ cycles, activeCycle, activeCycleId, amountSecondsPassed, marcarCicloAtivoComoConcluido, setSecondsPassed, criarNovoCiclo, interromperCiclo }}>
            {children}
        </CyclesContext.Provider>
    )
}