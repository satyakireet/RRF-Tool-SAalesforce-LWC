public class RRF_TriggerHelper {
    
/*RRF_SheduleJob sc=new RRF_SheduleJob();
string cronExp = '0 55 23 * * ? *';
string JobId = system.schedule('RRF Status Update', cronExp, sc);*/
    
    
    public static Boolean updateRrfStatus(String rrfId){
        List<RRF_Segment__c> rrfSegmentList=RRF_Controller.getRrfSegmentByRrfID(rrfId);
        Boolean isAllCompleated=true;
        for(RRF_Segment__c rrfSegmenttemp :rrfSegmentList){
            if(rrfSegmenttemp.Status__c != 'Complete'){
                isAllCompleated=false;
                break;
            }
        }
        RRF__c rrf= RRF_Controller.getRRFDetailsByID(rrfId);
        if(rrf != null){
          if(isAllCompleated){
            rrf.Status__c='Complete';
        }else{
            if(rrf.End_Date__c < Date.today()){
                rrf.Status__c='Hold'; 
            }
        }
        update rrf;    
       }
        return isAllCompleated;
    }
    public static Boolean createPositions(RRF_Segment__c rrfSegment){
        RRF__c rrf= RRF_Controller.getRRFDetailsByID(rrfSegment.RRF__c);
        if(rrf != null){
            Position__c newPosition=new Position__c();
            newPosition.RRF_Segment__c=rrfSegment.Id;
            newPosition.Name=rrf.Name+'-'+rrfSegment.Name__c;
            newPosition.Open_Date__c=rrf.Start_Date__c;
            newPosition.Close_Date__c=rrf.End_Date__c;
            insert newPosition;
        }
        return true;
    }
}