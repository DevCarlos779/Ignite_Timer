import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em:</label>
            <TaskInput 
                type="text" 
                list="task-suggestions" 
                id="task" 
                disabled={!!activeCycle}
                placeholder="Dê um nome ao seu projeto" 
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1" />
                <option value="Projeto 2" />
                <option value="Projeto 3" />
            </datalist>

            <label htmlFor="minutesAmount">durante:</label>
            <MinutesAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00" 
                step={5}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('amount', {valueAsNumber: true})}
            />

            <span>minutos</span>
        </FormContainer>
    )
}