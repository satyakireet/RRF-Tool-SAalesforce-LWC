import { LightningElement, wire, track, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRRFDetails from '@salesforce/apex/RRF_Controller.getRRFDetails';
import { refreshApex } from '@salesforce/apex';
const actions = [
    { label: 'View Details', name: 'View' },
    { label: 'Edit Details', name: 'Edit' },
    { label: 'Delete', name: 'Delete' },
];
const Allcolumns = [
    { label: 'RRF Name', fieldName: 'Name', sortable: true },
    { label: 'Client Name', fieldName: 'Client_Name__c', sortable: true },
    { label: 'Status', fieldName: 'Status__c', sortable: true },
    { label: 'Open Positions', fieldName: 'Open_Positions__c', sortable: true },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];
export default class Rrf_listView extends LightningElement {
    @track currentRecordId;
    @track sortBy;
    @track sortDirection;
    @track AlltableColumns = Allcolumns;

    @track editViewModal = false;
    @track isEdit = false;
    @track isView = false;
    @track iswizardflow=true;
    @track isConfirmationBox = false;
    @wire(getRRFDetails) rrfDetails;

    // printContent(event){
    //     console.log('print contents'+JSON.stringify(this.template.querySelector('.slds-modal__container')))
    // let divContents = this.template.querySelector('section').innerHTML; 
    // let printWindow = window.open('', 'Test', 'height=200,width=400'); 
    // setTimeout(()=>{
    //     printWindow.opener.document.open()
    //     printWindow.opener.document.write('<html><head><title>Print DIV Content</title>');  
    //     printWindow.opener.document.write('</head><body>');  
    //     printWindow.opener.document.write(divContents);  
    //     printWindow.opener.document.write('</body></html>'); 
    //     printWindow.print();
    // }, 5000 ); 

    //printWindow.document.close();  

    // }
    openConfirm() {
        this.isConfirmationBox = true;
    }
    closeConfirm() {
        this.isConfirmationBox = false;
    }
    closeModal() {
        this.editViewModal = false;
    }
    openModal() {
        this.editViewModal = true;
    }
    handleSaveSegregation(event) {
        refreshApex(this.rrfDetails);
    }
    handleSuccess(event) {
        /*
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: 'Record updated Successfully!!.',
            variant: 'success'
        }));*/
    }

    // handleing record edit form submit
    handleSubmit(event) {
        event.preventDefault();
        this.template.querySelector('lightning-record-edit-form').submit();
        this.closeModal();
    }

    handleRowAction(event) {
        let actionName = event.detail.action.name;
        const row = event.detail.row;
        this.currentRecordId = row.Id;
        this.isView = false;
        this.isEdit = false;
        console.log("Row Data >>" + JSON.stringify(row));
        switch (actionName) {
            case 'View':
                this.isView = true;
                this.openModal();
                break;
            case 'Edit':
                this.isEdit = true;
                this.openModal();
                break;
            case 'Delete':
                this.openConfirm();
                break;
            default:
        }
    }
    handleConfirmDialogAction(event) {
        const action = event.target.label;
        if (action == "Yes") {
            this.deleteHandler(this.currentRecordId);
        } else if (action == "No") {

        }
        this.closeConfirm();
    }
    deleteHandler(recordId) {
        console.log("delete record Data" + JSON.stringify(recordId));
        deleteRecord(recordId).then(() => {
            console.log("Delete successfully")
            this.ShowToastMessage('Success!!', 'Hurray !! Record deleted successfully.', 'success')
            refreshApex(this.rrfDetails);
        }).catch(error => {
            console.error(error);
        });
    }
    ShowToastMessage(title, message, varient) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: varient
            })
        );
    }
    handleSortData(event) {
        let fieldName = event.detail.fieldName;
        let sortDirection = event.detail.sortDirection;
        //assign the values
        this.sortBy = fieldName;
        this.sortDirection = sortDirection;
        //call the custom sort method.
        this.sortData(fieldName, sortDirection);
    }
    sortData(fieldname, direction) {
        // serialize the data before calling sort function
        //console.log('DAtA RAVISH DATA DATA =========' + JSON.parse(JSON.stringify(this.taskList)));
        let parseData = JSON.parse(JSON.stringify(this.rrfDetails.data));

        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1 : -1;
        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        // set the sorted data to data table data
        this.rrfDetails.data = parseData;
    }
}