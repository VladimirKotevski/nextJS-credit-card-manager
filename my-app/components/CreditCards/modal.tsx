import ListItems from "./ListItems";
import { CardEditor } from "./CardEditor"
import styles from "../../styles/Home.module.scss";

type props = {
    onClose: () => void;
    title: string,
    card?: {
        id: string,
        name: string,
        cardNumber: number,
        expiryDate: Date,
        cvc: number
    } | {}
}

const Modal = ({ onClose, card, title }: props) => {
    const handleCloseClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onClose();
    };

    return (
        <>
            <div className={styles['modal-overlay']}>
                <div className={styles['modal-wrapper']}>
                    <div className={styles['modal']}>
                        <div className={styles['modal-header']}>
                            <a href="#" onClick={handleCloseClick}>
                                x
                            </a>
                            {title === 'create' ?
                                <h4>Add your card details</h4>
                                :
                                <h4>Edit your card</h4>

                            }
                        </div>
                        <div className={styles['modal-body']}>
                            <ListItems data={[card]} />
                            <CardEditor initialValues={card} mode={title} onClose={onClose} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Modal