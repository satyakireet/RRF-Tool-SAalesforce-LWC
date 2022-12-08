import { api, LightningElement, track, wire } from 'lwc';
//import { getRecordNotifyChange} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getFullRRFDetailsByID from '@salesforce/apex/RRF_Controller.getFullRRFDetailsByID';
import createSkillSegmentation from '@salesforce/apex/RRF_Controller.createSkillSegmentation';
//import { refreshApex } from '@salesforce/apex';

//import RRF_Segment__c_OBJECT from '@salesforce/schema/RRF_Segment__c';
export default class Rrf_createSegment extends LightningElement {
    @api rrfid;
    @track keyIndex = 0;
    @wire(getFullRRFDetailsByID, { rrfID: '$rrfid' }) rrfDetails;
    @track usedNoOfPosition = 0;
    @track totalNoOfPosition = 0;
    @track avilableNoOfPosition = 0;
    @track isError = false;
    @track isConfirmationBox = false;
    @track isDataLoading = false;
    @track segmentList = [
        { id: 0 }
    ];

    openConfirm() {
        this.isConfirmationBox = true;
    }
    closeConfirm() {
        this.isConfirmationBox = false;
    }
    handleConfirmDialogAction(event) {
        const action = event.target.label;
        if (action == "Yes") {
            this.validateAndSubmitForm();
        } else if (action == "No") {
            const customeEvent = new CustomEvent('savesegmentreturn', {
                detail: false
            });
            this.dispatchEvent(customeEvent);
        }
        this.closeConfirm();
    }
    get totalNoOfPos() {
        return this.rrfDetails.data.rrf.Open_Positions__c;
    }
    addRow() {
        this.usedNoOfPosition = 0;
        this.template.querySelectorAll('lightning-input-field.noOfPosition').forEach(element => {
            if (element.value != '') {
                this.usedNoOfPosition = this.usedNoOfPosition + Number(element.value);
            }
        });

        if (this.usedNoOfPosition < this.totalNoOfPos) {
            this.isError = false;
            ++this.keyIndex;
            var newItem = [{ id: this.keyIndex }];
            this.segmentList = this.segmentList.concat(newItem);
        } else {
            this.isError = true;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please enter no of position in to limit',
                    variant: 'error',
                }),
            );
        }

    }

    removeRow(event) {
        if (this.segmentList.length >= 2) {
            this.segmentList = this.segmentList.filter(function (element) {
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
        }
    }

    @api saveSegements(event) {

        console.log("Save Segment is Called");
        let tempCount = 0;
        this.template.querySelectorAll('lightning-input-field.noOfPosition').forEach(element => {
            if (element.value != '') {
                tempCount = tempCount + Number(element.value);
            }
        });

        if (tempCount < this.totalNoOfPos) {
            this.avilableNoOfPosition=this.totalNoOfPos - tempCount;
            this.openConfirm();
        } else if (tempCount == this.totalNoOfPos) {
            this.validateAndSubmitForm();
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please enter no of position in to limit',
                    variant: 'error',
                }),
            );
            const customeEvent = new CustomEvent('savesegmentreturn', {
                detail: false
            });
            this.dispatchEvent(customeEvent);
        }
    }
    validateAndSubmitForm() {
        this.isDataLoading=true;
        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) {
            this.submitForm().then(result => {
                console.log('This promise is resolved');
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success!!',
                        message: 'Hurray !! Record created successfully.',
                        variant: 'success',
                    }),
                );
                const customeEvent = new CustomEvent('savesegmentreturn', {
                    detail: isVal
                });
                this.dispatchEvent(customeEvent);
                this.isDataLoading=false;
            }).catch(error => {
                console.log('This promise has failed')
            });

        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'Please enter all the required fields',
                    variant: 'error',
                }),
            );
            const customeEvent = new CustomEvent('savesegmentreturn', {
                detail: isVal
            });
            this.dispatchEvent(customeEvent);
            this.isDataLoading=false;
        }
    }
    submitForm() {
        return new Promise((resolve, reject) => {
            this.template.querySelectorAll('lightning-record-edit-form.segmentForm').forEach(element => {
                element.submit();
            });
            setTimeout(() => {
                resolve('foo');
            }, 3000);
        })
    }
}