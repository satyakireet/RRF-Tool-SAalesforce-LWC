import { LightningElement, wire, track, api } from 'lwc';
import { updateRecord,createRecord,deleteRecord} from 'lightning/uiRecordApi';
import getAllSkills from '@salesforce/apex/RRF_Controller.getAllSkills';
import getFullRRFDetailsByID from '@salesforce/apex/RRF_Controller.getFullRRFDetailsByID';
import Skills_Junction__c_OBJECT from '@salesforce/schema/Skills_Junction__c';
// import updateLeadStatus from '@salesforce/apex/LeadToCloserToolController.updateLeadStatus';
// import updateConvertedLeadStatus from '@salesforce/apex/LeadToCloserToolController.updateConvertedLeadStatus';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Rrf_dragdrop extends LightningElement {
    @api rrfid;
    @track dragedSkill;
    @track dropedSkillLibrary;
    @track leadCloseModal = false;
    @track availableSkillLibrary={"RRF__c":"","Id":"","Name":"Available Options"};
    @wire(getAllSkills) allAvailableSkills;
    @wire(getFullRRFDetailsByID,{rrfID:'$rrfid'}) rrfDetails;
    get calcWidth() {
        //let len = this.allAvailableSkills.data.length;
        let len =10;
        return 'width:' + 100 / len + 'vw;';
    }
    // openModal() {
    //     this.leadCloseModal = true;
    // }
    // closeModal() {
    //     this.leadCloseModal = false;
    // }
    renderedCallback() {

        console.log("ALL Skills Data >>" + JSON.stringify(this.allAvailableSkills.data));
        console.log("RRF Details Data >>" + JSON.stringify(this.rrfDetails));
        //alert(this.rrfid);
        //console.log("sk >>" + JSON.stringify(this.rrfDetails.data.librarySkills[0].skills));
    }
    
    handleListItemDragEvent(event) {
        console.log("handleListItemDrag in Parent" + JSON.stringify(event.detail));
        // var recordId = event.detail.Id;
        this.dragedSkill = event.detail;
        //this.currentActionLead=event.detail;
    }
    handleListItemDropEvent(event) {
        console.log("handleItemDrop parent" + JSON.stringify(event.detail));
        this.dropedSkillLibrary = event.detail;
        let record = {
            fields: {
                'RRF__c': this.rrfid,
                'Library_Skill__c': this.dropedSkillLibrary.Id,
                'Skill__c':this.dragedSkill.Id,
                'Name':this.dragedSkill.Name
            }
        };
        this.createHandler(Skills_Junction__c_OBJECT.objectApiName,record);

    }


    
    updateHandler(record) {
        console.log("Update record Data" + JSON.stringify(record));
         updateRecord(record).then(() => {
            console.log("updated successfully")
            this.ShowToastMessage('Success!!', 'Hurray !! Record updated successfully.', 'success')
            refreshApex(this.rrfDetails);
         }).catch(error => {
            console.error(error);
        });
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
    

    createHandler(apiName,record) {
        const recordInput = { apiName: apiName, fields:record.fields};
        console.log("create record Data" + JSON.stringify(recordInput));
         createRecord(recordInput).then(() => {
            console.log("Created successfully")
            refreshApex(this.rrfDetails);
            //this.ShowToastMessage('Success!!', 'Hurray !! Record created successfully.', 'success');
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
   
    onDragStartFunction(event) {
    
        console.log("in drag" + JSON.stringify(event.target.dataset.skillid)+'--'+event.target.dataset.skillname);
        this.dragedSkill={
            Id:event.target.dataset.skillid,
            Name:event.target.dataset.skillname
        };
    
    }

    handleDropEvent(event) {
        console.log("in drop" + JSON.stringify(event.currentTarget.dataset.lbsid));
        this.dropedSkillLibrary={
            Id:event.currentTarget.dataset.lbsid,
            Name:event.currentTarget.dataset.lbsname
        }
        let record = {
            fields: {
                'RRF__c': this.rrfid,
                'Library_Skill__c': this.dropedSkillLibrary.Id,
                'Skill__c':this.dragedSkill.Id,
                'Name':this.dragedSkill.Name
            }
        };
        this.createHandler(Skills_Junction__c_OBJECT.objectApiName,record);
       
    }
    handleDragOver(evt) {
         evt.preventDefault();
    }
    
    handleRemoveSkills(event){
        const recordId=event.target.dataset.skillid;
        this.deleteHandler(recordId);
    }
}