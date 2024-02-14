import Image from "next/image";
import { useState } from "react";
import Modal from './modal'
import styles from "../../styles/Home.module.scss";

export interface card {
    id: string,
    name: string,
    cardNumber: number,
    expiryDate: Date,
    cvc: number,
    type?: string
}

export interface ListItemsProps<T> {
    data: Array<T>;
}

const ListItems = ({ data }: ListItemsProps<any>) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState<card | {}>({});
    const [mothod, setMethod] = useState("")

    { [styles.App, styles.bold, styles['d-flex-c']].join(' ') }

    return (
        <>
            {data[0].id &&
                <div>
                    {data.map(item => {
                        return (
                            <div className={`${styles['credit-card']} ${styles[item.type]}`} key={item.id}>

                                <div>
                                    <div className={styles['card-header']}>
                                        <Image
                                            src={`/${item.type}.svg`}
                                            alt="mastercard logo"
                                            className={styles['card-logo']}
                                            width={50}
                                            height={20}
                                            priority
                                        />
                                        <div className={styles['card-cvc']}>
                                            <div className={styles['cvc-item']}>
                                                <span>cvc</span>
                                                <p>{item.cvc}</p>
                                            </div>
                                            <div className={styles['expiry-item']}>
                                                <span>expiry date</span>
                                                <p>{item.expiryDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['card-name']}>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className={styles['card-number']}>
                                        <p>{item.cardNumber.match(/.{1,4}/g).join('\xa0\xa0\xa0\xa0\xa0\xa0\xa0')}</p>
                                        <div className={styles['edit-icon']}>
                                            <Image
                                                src="/edit-icon.svg"
                                                alt="edit icon"
                                                width={18}
                                                height={18}
                                                onClick={() => {
                                                    setShowModal(true)
                                                    setSelectedCard(item)
                                                    setMethod('edit')
                                                }}
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}
                    <div className={styles['create-div']}>
                        <button className={styles['create-button']}
                            onClick={() => {
                                setShowModal(true)
                                setSelectedCard({})
                                setMethod('create')
                            }}
                        >
                            <span>Add new card</span>
                        </button>
                    </div>
                    {showModal &&
                        <Modal
                            card={selectedCard}
                            onClose={() => setShowModal(false)}
                            title={mothod}
                        />
                    }

                </div>
            }
        </>
    )
}

export default ListItems