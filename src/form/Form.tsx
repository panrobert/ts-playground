import React from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {TextField, Checkbox, FormControlLabel, FormGroup, Button} from "@mui/material";

interface IFormInputs {
    name: string
    mail: string
    check: boolean
}

const schema = yup.object({
    name: yup.string().required("Vyplň jméno"),
    mail: yup.string().email('Špatný formát mailu').max(255).required('Vyplň mail'),
    check: yup.boolean().oneOf([true],'Musíš souhlasit')
}).required();


function Form() {
    const {handleSubmit, control, reset, formState: {errors}} = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });
    const onSubmit: SubmitHandler<IFormInputs> = data => {
        alert("Díky za vyplnění formuláře :-)   "+JSON.stringify(data));
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Controller
                    name="name"
                    control={control}
                    rules={{required: true, pattern: /^[A-Za-z]+$/i}}
                    render={({field}) => <TextField {...field} variant="outlined" color="primary"/>}
                />
                {errors.name?.message}
            </FormGroup>
            <FormGroup>
                <Controller
                    name="mail"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => <TextField {...field} variant="outlined"/>}
                />
                {errors.mail?.message}
            </FormGroup>
            <FormGroup>
                <Controller
                    name="check"
                    control={control}
                    defaultValue={false}
                    rules={{required: true}}
                    render={({field}) => <FormControlLabel control={<Checkbox {...field} />} label="Podmínky"/>}
                />
                {errors.check?.message}
            </FormGroup>
            <Button variant="outlined" size="large" type="submit">Odeslat</Button>
        </form>
    );
}

export default Form;
