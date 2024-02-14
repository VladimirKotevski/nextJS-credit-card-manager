import { useEffect, useState } from "react";
import { Form, Field } from 'react-final-form';
import { CardCreatePayload } from '../../types/card.type'
import useRequest from "@/hooks/use-request";
import Router from 'next/router'
import styles from "../../styles/Home.module.scss";

interface CardEditorProps<T extends CardCreatePayload> {
    initialValues?: Record<string, any>;
    mode: any;
    onClose: () => void;
}


export function CardEditor<T extends CardCreatePayload>({ initialValues, mode, onClose }: CardEditorProps<T>) {
    const [cardValues, setCardValues] = useState<Record<string, any>>({ initialData: {} });

    useEffect(() => {
        if (!initialValues) return;
        const initialData: Record<string, any> = {
            name: initialValues.name,
            cardNumber: initialValues.cardNumber,
            expiryDate: initialValues.expirydate,
            cvc: initialValues.cvc,
            type: initialValues.type
        }
        setCardValues(initialData)
    }, []);


    const { doRequest, errors } = useRequest({
        url: mode === 'create' ? '/cards' : `/cards/${initialValues?.id}`,
        method: mode === 'create' ? 'post' : 'put',
        body: {
            name: cardValues.name,
            cardNumber: cardValues.cardNumber,
            expiryDate: cardValues.expiryDate,
            cvc: cardValues.cvc,
            type: cardValues.type
        },
        onSuccess: () => Router.push('/'),
        onClose: () => onClose(),
    });

    const onSubmit = async () => {
        event?.preventDefault();
        doRequest()

    }

    const regex = /^\d{1,2}\/\d{1,2}$/;
    const errorIcon = <img className="asc" src='/form-error.svg' />
    const successIcon = <img className="asc" src='/form-success.svg' />


    const required = (value: any) => value ? successIcon : errorIcon
    const dateValidate = (value: string) => {
        if (!value) {
            return (
                errorIcon
            )
        }

        if (value.match(regex) && value.length === 5) {
            return (
                successIcon
            )
        } else {
            return (
                errorIcon
            )
        }

    }

    const allowedCharacters = (min: number) => (value: number) =>
        value && value.toString().length === min ? successIcon : errorIcon
    const composeValidators = (...validators: any[]) => (value: any) =>
        validators.reduce((error, validator) => error || validator(value), undefined)


    return (
        <div className={styles['card-editor']}>
            <Form
                onSubmit={onSubmit}
                initialValues={cardValues}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={onSubmit}>
                        <Field name="name" validate={required}>
                            {({ input, meta }) => (
                                <div className={styles['field-wraper']}>
                                    <label>Name in card</label>
                                    <div>
                                        <input {...input} className={styles['form-input-filed']} onChange={(e) => setCardValues(prevState => ({ ...prevState, name: e.target.value }))} type="text" placeholder="John Doe" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                            )}
                        </Field>
                        <Field name="cardNumber" validate={allowedCharacters(16)}>
                            {({ input, meta }) => (
                                <div className={styles['field-wraper']}>
                                    <label>Card number</label>
                                    <div>
                                        <input {...input} className={styles['form-input-filed']} onChange={(e) => setCardValues(prevState => ({ ...prevState, cardNumber: e.target.value }))} type="number" placeholder="0000 0000 0000 0000" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                            )}
                        </Field>
                        <Field name="expiryDate" validate={dateValidate}>
                            {({ input, meta }) => (
                                <div className={styles['field-wraper']}>
                                    <label>Expiry Date</label>
                                    <div>
                                        <input {...input} className={styles['form-input-filed']} onChange={(e) => setCardValues(prevState => ({ ...prevState, expiryDate: e.target.value }))} type="text" placeholder="00/00" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                            )}
                        </Field>
                        <Field name="cvc" validate={allowedCharacters(3)}>
                            {({ input, meta }) => (
                                <div className={styles['field-wraper']}>
                                    <label>CVC (Security code)</label>
                                    <div>
                                        <input {...input} className={styles['form-input-filed']} onChange={(e) => setCardValues(prevState => ({ ...prevState, cvc: e.target.value }))} type="text" placeholder="000" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                            )}
                        </Field>
                        <div className={styles['form-buttons']}>
                            <button className={styles['submit-button']} type="submit" disabled={submitting}>
                                <span>Confirm</span>
                            </button>
                        </div>
                        {errors}
                    </form>
                )}
            />
        </div>
    )

}
