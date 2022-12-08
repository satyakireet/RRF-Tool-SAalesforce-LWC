global class RRF_SheduleJob implements Schedulable{
	global void execute(SchedulableContext ctx) {
       List<RRF__c> rrfList = [Select Id,Name,Client_Name__c,Description__c,Open_Positions__c,End_Date__c,Start_Date__c,Status__c
                                   From RRF__c
            					   WHERE End_Date__c = TODAY];
        for(RRF__c rrf:rrfList){
            RRF_TriggerHelper.updateRrfStatus(rrf.Id);
        }
    }
}