import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Rrf_createWizard extends LightningElement {

    @track isModalShown = false;
    @track iswizardflow=false;
    @track rrfId;
    @track isSegmentSaved = false
    @track isDataLoading = false;

    startDataLoading() {
        this.isDataLoading = true;
    }
    stopDataLoading() {
        this.isDataLoading = false;
    }

    saveRRF(event) {
        this.startDataLoading();
        var isValidData = true;
        this.template.querySelectorAll('lightning-input-field.rrfFormField').forEach(element => {
            isValidData = isValidData && element.reportValidity();
        });
        if (isValidData && this.template.querySelector('c-wizard').currentStep == 'step-1') {
            this.template.querySelector('lightning-record-edit-form.rrfForm').submit();
        }
    }
    saveLibrarySkills(event) {
        this.template.querySelector('c-wizard').currentStep = 'step-3';
    }

    saveSegment(event) {
        //this.startDataLoading();
        this.template.querySelector('c-rrf_create-Segment').saveSegements();
        
    }
    handlesavesegmentreturn(event) {
        console.log("handlesavesegmentreturn" + JSON.stringify(event.detail))
        if (event.detail) {
            this.isSegmentSaved = event.detail;
            //this.rrfId=this.rrfId;
            this.template.querySelector('c-wizard').currentStep = 'step-4';
            this.stopDataLoading();
        }else{
            this.stopDataLoading();
        }
        
    }
    saveSegregation(event) {
        this.closeModal();
        this.rrfId = '';
        const customeEvent = new CustomEvent('savesegregation', {
            detail: 'final'
        });
        this.dispatchEvent(customeEvent);
    }
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm', event.detail.id);
        this.rrfId = event.detail.id;
        this.template.querySelector('c-wizard').currentStep = 'step-2'
        this.stopDataLoading();
    }



    openModal() {
        this.isModalShown = true;
    }


    closeModal() {
        this.isModalShown = false;
    }


    // validate() {
    //     // 1 - Takes all the inputs from the step - "this" is bind to wizard-step component
    //     const allValid = [...this.querySelectorAll('lightning-input')]
    //         .reduce((validSoFar, inputCmp) => {
    //             inputCmp.reportValidity();
    //             return validSoFar && inputCmp.checkValidity();
    //         }, true);

    //     // 2 - Returns true/false; if the validation were asynchronous, it should return a Promise instead
    //     return allValid;
    // }
}