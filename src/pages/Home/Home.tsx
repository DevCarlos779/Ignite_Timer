import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, PauseCountdownButton, StartCountdownButton } from "./styles";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";


interface NewCycleFomrData {
    task: string
    amount: number
}



export function Home() {

    //usando Contexto

    const { activeCycle, criarNovoCiclo, interromperCiclo } = useContext(CyclesContext)

    //useForm

    const NewCycleFormFunctions = useForm({
        defaultValues: {
            task: '',
            amount: 0
        }
    });

    const { handleSubmit, watch, reset } = NewCycleFormFunctions;


    //variaveis de controle

    const task = watch('task');
    const isSubmitDisable = !task;

    const handleCreateNewCycle = (data: NewCycleFomrData) => {
        criarNovoCiclo(data)
        reset()
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                
                <FormProvider {...NewCycleFormFunctions} >
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {
                    activeCycle ? (
                        <PauseCountdownButton onClick={interromperCiclo} type="button">
                            <HandPalm size={24} />
                            Interromper
                        </PauseCountdownButton>
                    ) : (
                        <StartCountdownButton type="submit" disabled={isSubmitDisable}>
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    )
                } 
                
                
            </form>
        </HomeContainer>
    )
}