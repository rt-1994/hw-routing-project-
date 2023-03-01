import React from "react";
import Modal from "react-modal";
import cn from 'classnames';

export default function ModalComponent({isOpen, children, style, className, overlayClassName}) {

    return (
        <Modal
            isOpen={isOpen}
            style={style}
            className={className}
            overlayClassName={overlayClassName}
        >
            {/*<div className={cn(styles.modal, className)}>*/}
                {children}
            {/*</div>*/}
        </Modal>
    );
}