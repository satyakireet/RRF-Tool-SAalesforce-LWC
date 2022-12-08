public class RRF_ResponseHelper {
 	
    @AuraEnabled
    public RRF__c rrf;
    @AuraEnabled
 	public list<RRF_Library_Skill_ResponseHelper> librarySkills;
    @AuraEnabled
 	public list<RRF_Segment__c> rrfSegments;
}