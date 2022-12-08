import { api, LightningElement } from 'lwc';
import { updateRecord} from 'lightning/uiRecordApi';
export default class Rrf_pageViewChiled extends LightningElement {
    @api skslist;
    @api skill;
    @api isviewmode;
    get requiredSkill() {
        var temp = this.skslist.filter(employee => employee.Skills_Junction__c == this.skill.Id);
        console.log("temp return chiled>>" + JSON.stringify(temp[0]));
        return temp[0];
    }
    renderedCallback() {
        console.log("sksList chiled" + JSON.stringify(this.skslist));
        console.log("skill chiled" + JSON.stringify(this.skill));
    }
    handleChange(event) {
         const recordInput = {
            fields: {
                Id: event.target.value,
                Is_Required__c:event.target.checked

            }
        };
        this.updateHandler(recordInput);
    }
    updateHandler(record) {
        console.log("Update record Data" + JSON.stringify(record));
         updateRecord(record).then(() => {
            console.log("updated successfully");
            const customeEvent = new CustomEvent('updatehandlercallback', {
                detail: record
            });
            this.dispatchEvent(customeEvent);
         }).catch(error => {
            console.error(error);
        });
    }
}