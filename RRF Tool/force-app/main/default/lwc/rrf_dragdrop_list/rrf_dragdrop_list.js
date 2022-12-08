import { LightningElement, api, track } from 'lwc';
export default class Rrf_dragdrop_list extends LightningElement {
    @api skills;
    @api libraryskill;
    // @track draggedLead;
    renderedCallback() {
        console.log("skills " + JSON.stringify(this.skills));

    }
    handleconverteventfromcart(event) {

        // const customeEvent = new CustomEvent('converteventfromcart', {
        //     detail: event.detail
        // });
        // this.dispatchEvent(customeEvent);
    }
    handleRefreshApexEvent(event) {
        // const customeEvent = new CustomEvent('refreshapexevent', {
        //     detail: event.detail
        // });
        // this.dispatchEvent(customeEvent);
    }
    handleDragEvent(event) {
        console.log("in Drag" + JSON.stringify(event.detail));
        const customeEvent = new CustomEvent('listitemdragevent', {
            detail: event.detail
        });
        this.dispatchEvent(customeEvent);
        //this.recordId = evt.dataTransfer.getData('itemdrag');
    }
    handleDropEvent(event) {
        console.log("in drop" + JSON.stringify(this.libraryskill));
        const customeEvent = new CustomEvent('listitemdropevent', {
            detail: this.libraryskill
        });
        this.dispatchEvent(customeEvent);
    }
    handleDragOver(evt) {
         evt.preventDefault();
    }
}