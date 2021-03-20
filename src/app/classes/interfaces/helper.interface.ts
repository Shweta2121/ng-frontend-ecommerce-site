import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface KnxModal {
    /**
     * @Output
     * A callback method that performs emits event immediately
     * after a directive, pipe, or service instance to destroyed.
     */
    onClose: EventEmitter<any>;
    /**
     * @Input
     * A id variable that send certain set of data.
     */
    entityId: string;
    /**
     * @Input
     * A data variable that send certain set of data.
     */
    entityData: any;
    /**
     * A callback method that performs custom clean-up, invoked immediately
     * after a directive, pipe, or service instance is asked to destroyed.
     */
    close(): void;
}

export interface KnxForm {
    form: FormGroup;
    isSubmitted: boolean;
    isSubmitting: boolean;
    isEdited: boolean;
    beforeEditData: any;
    isEditForm: boolean;
    onResetClick(event: any): void;
}

