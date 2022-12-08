import { api, LightningElement, track, wire } from 'lwc';
import getFullRRFDetailsByID1 from '@salesforce/apex/RRF_Controller.getFullRRFDetailsByID1';
import getRrfSegmentByRrfID from '@salesforce/apex/RRF_Controller.getRrfSegmentByRrfID';
import { updateRecord} from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
export default class Rrf_pageView extends LightningElement {
    //@track rrfid='a0B2w0000037aK9EAI';
    timeoutId;
    @api rrfid;
    @api isviewmode;
    @track iscache = false;
    @track progressBar=false;
    @api iswizardflow;
    //@wire(getRrfSegmentByRrfID, { rrfID: '$rrfid'}) rrfSegments;
    @wire(getFullRRFDetailsByID1, { rrfID: '$rrfid' }) newRrfDetails;
    renderedCallback() {
        //clearTimeout(this.timeoutId); // no-op if invalid id
        console.log(this.rrfid);
        //alert(this.rrfid)
        console.log("RRF page view Details Data iscache>>" + JSON.stringify(this.newRrfDetails));
        //console.log("RRF page view rrfSegments>>" + JSON.stringify(this.rrfSegments));
    }
    handleButtonClick(event){
        this.progressBar=true;
        const buttonLable=event.target.label;
        const dataId=event.target.dataset.id;
        console.log("Label>>"+buttonLable+' id>>'+dataId)
        const recordInput = {
            fields: {
                Id: dataId,
                Status__c:buttonLable

            }
        };
        this.updateHandler(recordInput);
    }
    updateHandler(record) {
        console.log("Update record Data" + JSON.stringify(record));
         updateRecord(record).then(() => {
            console.log("updated successfully");
            refreshApex(this.newRrfDetails);
            this.progressBar=false;
         }).catch(error => {
            console.error('Error '+error);
            this.progressBar=false;
        });
    }
    refreshData() {
        //clearTimeout(this.timeoutId);
        this.iscache = true;
        //refreshApex(this.rrfDetails);
    }
    handleUpdateHandlerCallback(event) {
        console.log("Handled Callback" + event.detail);
        //clearTimeout(this.timeoutId);
        this.iscache = true;
        refreshApex(this.newRrfDetails);
    }
}