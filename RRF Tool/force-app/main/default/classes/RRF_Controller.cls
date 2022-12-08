public class RRF_Controller {

    @AuraEnabled(cacheable=true)
    public static List<Skill__c> getAllSkills(){
        return [Select Id,Name From Skill__c];
    }
    @AuraEnabled(cacheable=true)
    public static list<RRF__c> getRRFDetails(){
        return [Select Id,Name,Client_Name__c,Description__c,Open_Positions__c,End_Date__c,Start_Date__c,Status__c From RRF__c];
    }
    @AuraEnabled(cacheable=true)
    public static RRF__c getRRFDetailsByID(String rrfID){
        return [Select Id,Name,Client_Name__c,Description__c,Open_Positions__c,End_Date__c,Start_Date__c,Status__c,(Select Id,Name from Library_Skills__r),(Select Id,Name from RRF_Segments__r) From RRF__c where Id=:rrfID];
    }
     @AuraEnabled(cacheable=true)
    public static list<Skills_Junction__c> getSkillJunctionByLibraryId(String librarID,String rrfID){
        return [Select Id,Name,Library_Skill__r.Id,Library_Skill__r.Name,Skill__r.Id,Skill__r.Name From Skills_Junction__c where Library_Skill__c=:librarID and RRF__c=:rrfID];
    }
    @AuraEnabled(cacheable=true)
    public static String cacheRefreshMethod(String rrfID){
        return 'cacheRefreshMethod From Apex'; 
    }
    @AuraEnabled(cacheable=true)
    public static list<RRF_Segment__c> getRrfSegmentByRrfID(String rrfID){
        return [Select Id,Name__c,No_of_Position__c,Role__c,Status__c,(Select Id,Name,Is_Required__c,Skills_Junction__r.Id,Skills_Junction__r.Name From Segment_Skill_Segregations__r) From RRF_Segment__c where RRF__c=:rrfID order by CreatedDate desc];
    }
    @AuraEnabled(cacheable=true)
    public static RRF_ResponseHelper getFullRRFDetailsByID(String rrfID){
    	//Map<String, Object> finalResult= new Map<String, Object>();
        RRF_ResponseHelper rrfResponseHelper;
        RRF__c rrf=getRRFDetailsByID(rrfID);
        if(rrf !=null){
            list<Library_Skill__c> librarySkills=rrf.Library_Skills__r;
            list<RRF_Library_Skill_ResponseHelper> rrfLbsHelperList=new list<RRF_Library_Skill_ResponseHelper>();
            for(Library_Skill__c lbs:librarySkills){
                RRF_Library_Skill_ResponseHelper rrfLbsHelper=new RRF_Library_Skill_ResponseHelper();
                rrfLbsHelper.librarySkill=lbs;
                rrfLbsHelper.skills=getSkillJunctionByLibraryId(lbs.Id,rrf.Id);
                rrfLbsHelperList.add(rrfLbsHelper);
            }
            rrfResponseHelper=new RRF_ResponseHelper();
            rrfResponseHelper.rrf=rrf;
            rrfResponseHelper.librarySkills=rrfLbsHelperList;
            System.debug('rrfLbsHelperList'+rrfLbsHelperList);
            rrfResponseHelper.rrfSegments=getRrfSegmentByRrfID(rrf.Id);
            System.debug('Final'+rrfResponseHelper);
        }
        return rrfResponseHelper;
    }
    @AuraEnabled(cacheable=true)
    public static RRF_ResponseHelper getFullRRFDetailsByID1(String rrfID,String cache){
    	//Map<String, Object> finalResult= new Map<String, Object>();
        //return getFullRRFDetailsByID(rrfID);
        RRF_ResponseHelper rrfResponseHelper;
        RRF__c rrf=getRRFDetailsByID(rrfID);
        if(rrf !=null){
            list<Library_Skill__c> librarySkills=rrf.Library_Skills__r;
            list<RRF_Library_Skill_ResponseHelper> rrfLbsHelperList=new list<RRF_Library_Skill_ResponseHelper>();
            for(Library_Skill__c lbs:librarySkills){
                RRF_Library_Skill_ResponseHelper rrfLbsHelper=new RRF_Library_Skill_ResponseHelper();
                rrfLbsHelper.librarySkill=lbs;
                rrfLbsHelper.skills=getSkillJunctionByLibraryId(lbs.Id,rrf.Id);
                rrfLbsHelperList.add(rrfLbsHelper);
            }
            rrfResponseHelper=new RRF_ResponseHelper();
            rrfResponseHelper.rrf=rrf;
            rrfResponseHelper.librarySkills=rrfLbsHelperList;
            System.debug('rrfLbsHelperList'+rrfLbsHelperList);
            rrfResponseHelper.rrfSegments=getRrfSegmentByRrfID(rrf.Id);
            System.debug('Final'+rrfResponseHelper);
        }
        return rrfResponseHelper;
    }
    
    public static list<Skills_Junction__c> getAllSkillJunctionByRRFId(String rrfIf){
        return [Select Id,Name From Skills_Junction__c where RRF__c=:rrfIf];
    }
    @AuraEnabled(cacheable=true)
    public static RRF_ResponseHelper createSkillSegmentation(String rrfID,String jsonString){
        Map<String, Object> parsedData = (Map<String, Object>)JSON.deserializeUntyped(jsonString);
        System.debug('Dataaa>>'+parsedData);
       /* list<Segment_Skill_Segregation__c> sksList=new list<Segment_Skill_Segregation__c>();
        list<RRF_Segment__c> segmentList=[Select Id,Name,No_of_Position__c From RRF_Segment__c where RRF__c=:rrfID];
        System.debug('Segment List'+segmentList);
        for (RRF_Segment__c rrfSegment: segmentList) {
            if (rrfSegment !=null) {
                System.debug('Segment'+rrfSegment);
                list<Skills_Junction__c> sjsList= getAllSkillJunctionByRRFId(rrfID);
                 System.debug('skill junction list'+sjsList);
                for(Skills_Junction__c sj:sjsList){
                    System.debug('skill junction '+sj);
                    Segment_Skill_Segregation__c sks=new Segment_Skill_Segregation__c();
                    sks.Name=rrfSegment.Name+'-'+sj.Name;
                    sks.RRF_Segment__c=rrfSegment.Id;
                    sks.Skills_Junction__c=sj.Id;
                    sksList.add(sks);
                }
            }
        }
        System.debug('Save List '+sksList);
        insert sksList;*/
        return getFullRRFDetailsByID(rrfID);
    }
}