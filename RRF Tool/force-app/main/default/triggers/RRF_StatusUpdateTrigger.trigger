trigger RRF_StatusUpdateTrigger on RRF_Segment__c (after insert,after update) {
    if(Trigger.isAfter && Trigger.isUpdate){
        for(RRF_Segment__c rrfSegment:Trigger.new){
            RRF_TriggerHelper.updateRrfStatus(rrfSegment.RRF__c);
        }
    }
    if(Trigger.isAfter && Trigger.isInsert){
        for(RRF_Segment__c rrfSegment:Trigger.new){
            RRF_TriggerHelper.createPositions(rrfSegment);
        }
    }
}