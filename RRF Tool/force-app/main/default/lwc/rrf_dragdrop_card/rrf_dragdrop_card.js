import { LightningElement, api, track } from 'lwc';
// import { NavigationMixin } from 'lightning/navigation';
// import { refreshApex } from '@salesforce/apex';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Rrf_dragdrop_card extends LightningElement {
    @api skill;
    @api libraryskill;

    renderedCallback() {
        console.log("skill " + JSON.stringify(this.skill));

    }
    // get isClosedConvertedLead() {
    //     if (this.lead.Lead_Stage__c === "Stage - 2" && this.lead.Status === "Closed - Converted" && (!this.lead.Is_Converted__c)) {
    //         return true;
    //     }
    //     return false;
    // }
    // handleOnselect(event) {
    //     this.selectedItemValue = event.detail.value;
    //     this.isView = false;
    //     this.isEdit = false;
    //     if (this.selectedItemValue === "View") {
    //         this.isView = true;
    //         this.openModal();
    //     } else if (this.selectedItemValue == "Edit") {
    //         this.isEdit = true;
    //         this.openModal();
    //     } else if (this.selectedItemValue == "ConvertLead") {
    //         const customeEvent = new CustomEvent('converteventfromcart', {
    //             detail: this.lead
    //         });
    //         this.dispatchEvent(customeEvent);
    //     }else if(this.selectedItemValue =="AssignRoles"){

    //     }
    // }
    // // closing modal box
    // closeModal() {
    //     this.userModalPopup = false;
    // }
    // // closing modal box
    // openModal() {
    //     this.userModalPopup = true;
    // }
    // handleSuccess() {
    //     this.dispatchEvent(new ShowToastEvent({
    //         title: 'Success!!',
    //         message: 'Record updated Successfully!!.',
    //         variant: 'success'
    //     }));
    //     const customeEvent = new CustomEvent('refreshapexevent', {
    //         detail: this.lead
    //     });
    //     this.dispatchEvent(customeEvent);
    // }

    // // handleing record edit form submit
    // handleSubmit(event) {
    //     // prevending default type sumbit of record edit form
    //     event.preventDefault();

    //     // querying the record edit form and submiting fields to form
    //     this.template.querySelector('lightning-record-edit-form').submit();

    //     // closing modal
    //     this.closeModal();

    //     // showing success message
    // }
    // get isSameProject() {
    //     return false;

    // }

    onDragStartFunction(event) {
        //console.log("skill drag" + JSON.stringify(this.skill));
        //console.log("in darg" + JSON.stringify(this.libraryskill));
        const customeEvent = new CustomEvent('carddragevent', {
            detail: this.skill
        });
        this.dispatchEvent(customeEvent);
    }
}